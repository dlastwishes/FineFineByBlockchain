pragma solidity^0.4.22;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract trafficTicketInterface {
    using strings for *;
    
    modifier checkShowTicket(string unitNo , string _trafficticket , string personid ) {
		require(_trafficticket.toSlice().len() > 0);
		require(personid.toSlice().len() >0);
	_;
	}
	
	function getTicket(string unitNo , string ticketNo) public view returns (string ,string);
	
	function getTicketNo(string unitNo,uint8 num) external view returns (string);
	
	function getConveyancePoint(string unitNo) public view returns (uint8);
	
	 function getReporter(string unitNo , string id , string _personalid) 
	 public checkShowTicket(unitNo ,id , _personalid) view returns (string , string , string );
   
   function getMapConvey(string unitNo , uint8 pointer) external view returns (string , string ,string ,string ,string);
   
}

contract functionTicket {
    using strings for *;
    
    event log_size(uint8 size);
    event log_ticket(string ticketno);
    
    address ticketAddress = 0x2cecff2e911037319a2624589bb012bdc4d11a33;
    trafficTicketInterface ticketContract = trafficTicketInterface(ticketAddress);
    
    function searchPersonByTicket(string unitno , string ticketno) public view returns (string) {
        string memory personid;
        (,personid) = ticketContract.getTicket(unitno , ticketno);
        return personid;
    }
    
    function getExpired(string unitno , string id , string personalid) view returns (string) {
        string memory expire;
        (,,expire) = ticketContract.getReporter(unitno , id , personalid);
        return expire;
    }
    
    function searchTicketByPerson(string unitno ,string personid) public view returns (string){
        string memory ticketNo;
        uint8 size = ticketContract.getConveyancePoint(unitno);
        string memory person;
        for (uint8 i = 0 ; i<=size ; i++){
        (person,,,,) = ticketContract.getMapConvey(unitno , i);
              if(person.toSlice().equals(personid.toSlice())){
                  ticketNo = ticketContract.getTicketNo(unitno , i);
              }
        }
        return ticketNo;
    }
}