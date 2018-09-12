pragma solidity ^0.4.17;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract payTrafficTicket{
    using strings for *;
    address private  payOwner = msg.sender;
    string trafficTicketNo;
    string[] trafficListPay;
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
        if(_trafficNo.toSlice().len() >= 0){
        
        for (uint i = 0; i <= trafficListPay.length ; i++){
           
            if(_trafficNo.toSlice().equals(trafficListPay[i].toSlice())){
                return true;
                      }
                }
        }
            else {
                return false;
            }
        }
    
    
    function checkBalance() public onlyOwner constant returns (uint){
        return this.balance;
    }
    
    function withdraw() public onlyOwner payable returns (bool){
        require(this.balance >= maxHolding);
        addressToPolice.transfer(this.balance);
        
        return true;
        
    }
    
    function payFine(string _trafficNo) public payable returns (bool) {
        ownerPayTraffic[_trafficNo] = msg.sender;
        trafficListPay.push(_trafficNo);
        
        }
    
}