pragma solidity ^0.4.17;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract payTrafficTicket{
    using strings for *;
    address private  payOwner = msg.sender;
    
    string[] allTrafficListPay;
    mapping ( string => uint) totalTicketByUnit;
    mapping ( string => string) ticketPayedToUnit;
    
    // this is sample eoa account police holding money for testing 
    address addressToPolice = 0x11bE780D609D375eD5E094d73090380B3325efD8;
    mapping(string => address) ownerPayTraffic;
    uint private maxHolding = 50 ether;
    
    modifier onlyOwner(){
        require(msg.sender == payOwner);
        _;
    }
    
    function getPayerTraffic(string _trafficNo) public constant returns (address){
        return ownerPayTraffic[_trafficNo];
    }
    
    function isPay(string _trafficNo) public constant returns (bool){
        require(_trafficNo.toSlice().len() >= 0);
        
        for (uint i = 0; i <= allTrafficListPay.length ; i++){
           
            if(_trafficNo.toSlice().equals(allTrafficListPay[i].toSlice())){
                return true;
                      }
            else {
                return false;
            }
                }
        }
    
    function checkBalance() public onlyOwner constant returns (uint){
        return this.balance;
    }
    
    function getTotalPayTicket() public view returns (uint) {
        return (allTrafficListPay.length+1);
    }
    
    function withdraw() public onlyOwner payable returns (bool){
        require(this.balance >= maxHolding);
        addressToPolice.transfer(this.balance);
        
        return true;
        
    }
    
    function getTotalPayedTicketByUnit(string unitNo) public view returns (uint){
        
        return (totalTicketByUnit[unitNo]);
    }
    
    function payFine(string unitNo , string _trafficNo) public payable returns (bool) {
        require( msg.value > 0 );
        require(unitNo.toSlice().len() > 0);
        
        ticketPayedToUnit[_trafficNo] = unitNo;
        
        uint None = uint(0);
        
        if(totalTicketByUnit[unitNo] == None){
            uint init = 0;
            totalTicketByUnit[unitNo] = init;
        }
        
        uint numTicketInUnit = totalTicketByUnit[unitNo];
        totalTicketByUnit[unitNo] = numTicketInUnit+1;
        
        ownerPayTraffic[_trafficNo] = msg.sender;
        allTrafficListPay.push(_trafficNo);
        }
    
}