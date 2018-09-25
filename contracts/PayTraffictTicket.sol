pragma solidity ^0.4.22;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract payTrafficTicket{
    using strings for *;
    address private  payOwner = msg.sender;
    
    string[] allTrafficListPay;
    mapping ( string => uint) totalTicketByUnit;
    mapping ( string => string) ticketPayedToUnit;
    
    // this is sample eoa account police holding money for testing 
    address addressToPolice = 0x81cC78719f42b0239Bc9D8067a19b1Bc56c19ddD;
    mapping(string => address) ownerPayTraffic;
    uint private maxHolding = 50 ether;
    
    modifier onlyOwner(){
        require(msg.sender == payOwner);
        _;
    }
    
    modifier checkDuplicateTransaction(string trafficno) {
        require(ownerPayTraffic[trafficno] == address(0));
        _;
    }
    
    function getPayerTraffic(string _trafficNo) public view returns (address){
        return ownerPayTraffic[_trafficNo];
    }
    
    function isPay(string _trafficNo) public view returns (bool){
        require(_trafficNo.toSlice().len() >= 0);
        bool status = false;
        for (uint i = 0; i < allTrafficListPay.length ; i++){
            if(_trafficNo.toSlice().equals(allTrafficListPay[i].toSlice())){
                status = true;
            }
        }
        return status;
    }
    
    function checkBalance() public onlyOwner view returns (uint){
        return this.balance;
    }
    
    function getTotalPayTicket() public view returns (uint) {
        return (allTrafficListPay.length);
    }
    
    function withdraw() public onlyOwner payable returns (bool){
        require(this.balance >= maxHolding);
        addressToPolice.transfer(this.balance);
        
        return true;
    }
    
    function getTotalPayedTicketByUnit(string unitNo) public view returns (uint){
        
        return (totalTicketByUnit[unitNo]);
    }
    
    function payFine(string unitNo , string _trafficNo) public payable checkDuplicateTransaction(_trafficNo) returns (bool) {
        require(unitNo.toSlice().len() > 0);
        
        ticketPayedToUnit[_trafficNo] = unitNo;
        
        if(totalTicketByUnit[unitNo] == uint(0)){
            uint init = 0;
            totalTicketByUnit[unitNo] = init;
        }
        uint numTicketInUnit = totalTicketByUnit[unitNo];
         if(ownerPayTraffic[_trafficNo] == address(0)){
             allTrafficListPay.push(_trafficNo);
             totalTicketByUnit[unitNo] = numTicketInUnit+1;
             ownerPayTraffic[_trafficNo] = msg.sender;
         }
        }
}