pragma solidity ^0.4.17;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract trafficTicket {
    using strings for *;
    string[] trafficTicketNo;
    
    address owner = msg.sender;
	
    struct reporter {
        string  rep_name;
        string rep_unit;
        string rep_address;
        string rep_tel;
        string rep_zipcode;
    }
	
    struct report_case {
        string  _charge;
        string  _placeOfIncident;
        string _speedDetection;
        uint  _amountOfFine;
    }
    
	   struct conveyanceOwner{
			string conv_personalNo;
			string conv_plateNo;
			string conv_name;
			string conv_tele;
			string conv_address;
		}
	
    struct TrafficTicket{
        conveyanceOwner conveyList;
        reporter reporterList;
        report_case reportList;
    }
    
     mapping (string => uint) totalTicketInUnit;
    
    mapping( string => mapping(string => TrafficTicket)) trafficList;
    mapping(uint => string) mapTicket;
    
    conveyanceOwner private convey;
    reporter private reportInfo;
    report_case private report;
    
    uint numConvey = 0;
    uint numReportCase = 0;
    uint numReporter = 0;
    
    mapping (uint => conveyanceOwner) mapConvey;
    mapping (uint => reporter) mapReporter;
    mapping (uint => report_case) mapReportCase;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
	
	modifier checkShowTicket(string unitNo , string _trafficticket , string personid ) {

		require(_trafficticket.toSlice().len() > 0);
		require(personid.toSlice().len() >0);
		require(personid.toSlice().equals(trafficList[unitNo][_trafficticket].conveyList.conv_personalNo.toSlice()));
	_;
	}
	
	function getTotalTicketByUnit(string report_unit) public view returns (uint) {
	    return (totalTicketInUnit[report_unit]);
	}
	
	function getTotalTicket() public view returns (uint) {
	    return (trafficTicketNo.length);
	}
	
	function getTicket(string unitNo , string ticketNo) public view returns (string){
	    return (trafficList[unitNo][ticketNo].conveyList.conv_name);
	}
	
	function getTicketNo(uint num) public view returns (string) {
	    return (mapTicket[num]);
	}
	
    
    function getConveyance(string unitNo , string id , string _personalid) public checkShowTicket( unitNo , id , _personalid) constant returns (string , string , string , string , string)  {
        
        return (trafficList[unitNo][id].conveyList.conv_personalNo
        , trafficList[unitNo][id].conveyList.conv_plateNo
        , trafficList[unitNo][id].conveyList.conv_name
        , trafficList[unitNo][id].conveyList.conv_tele 
        , trafficList[unitNo][id].conveyList.conv_address);
    }
    
    function getReporter(string unitNo , string id , string _personalid) public checkShowTicket(unitNo ,id , _personalid) constant returns (string , string , string , string , string){
        return (trafficList[unitNo][id].reporterList.rep_name
         , trafficList[unitNo][id].reporterList.rep_unit
         , trafficList[unitNo][id].reporterList.rep_address , trafficList[unitNo][id].reporterList.rep_tel
         , trafficList[unitNo][id].reporterList.rep_zipcode);
    }
    
    function getReportCase( string unitNo , string id , string _personalid) public checkShowTicket( unitNo , id , _personalid) constant returns ( string ,string ,string , uint){
        
        return (trafficList[unitNo][id].reportList._charge , 
        trafficList[unitNo][id].reportList._placeOfIncident
        , trafficList[unitNo][id].reportList._speedDetection
        , trafficList[unitNo][id].reportList._amountOfFine);
    
    }

    function newTrafficTicket( string unitNo ,uint targetPoint ,string trafficID) public{
	
        report_case memory  reportSingletron;
         reporter memory reporterSingletron;
         conveyanceOwner memory conveySingletron;
         
         reportSingletron._charge = mapReportCase[targetPoint]._charge;
         reportSingletron._placeOfIncident = mapReportCase[targetPoint]._placeOfIncident;
         reportSingletron._speedDetection = mapReportCase[targetPoint]._speedDetection;
         reportSingletron._amountOfFine = mapReportCase[targetPoint]._amountOfFine;
         
         reporterSingletron.rep_name = mapReporter[targetPoint].rep_name;
         reporterSingletron.rep_unit = mapReporter[targetPoint].rep_unit;
          reporterSingletron.rep_address = mapReporter[targetPoint].rep_address;
           reporterSingletron.rep_tel = mapReporter[targetPoint].rep_tel;
       reporterSingletron.rep_zipcode = mapReporter[targetPoint].rep_zipcode;
       
          conveySingletron.conv_personalNo = mapConvey[targetPoint].conv_personalNo;
          conveySingletron.conv_plateNo = mapConvey[targetPoint].conv_plateNo;
           conveySingletron.conv_name = mapConvey[targetPoint].conv_name;
            conveySingletron.conv_tele= mapConvey[targetPoint].conv_tele;
            conveySingletron.conv_address= mapConvey[targetPoint].conv_address;
            
            
        TrafficTicket memory TrafficTicketIns;
        TrafficTicketIns.conveyList = conveySingletron;
        TrafficTicketIns.reporterList = reporterSingletron;
        TrafficTicketIns.reportList = reportSingletron;
        
        
        trafficList[unitNo][trafficID] = TrafficTicketIns;
        uint totalTicketUnitIns = totalTicketInUnit[unitNo];
        uint None = uint(0); 
        if( totalTicketUnitIns == None ) {
            totalTicketUnitIns = 0;
        }
        totalTicketInUnit[unitNo] = totalTicketUnitIns+1;
        trafficTicketNo.push(trafficID);
        mapTicket[targetPoint] = trafficID;
        
    }
    
       function setReport_case(string charge , string placeOfIncident , string speedDetection , uint amountOfFine) public returns (uint) {
		
        report_case memory reportObject;
        reportObject._charge = charge;
        reportObject._placeOfIncident = placeOfIncident;
        reportObject._speedDetection = speedDetection;
        reportObject._amountOfFine = amountOfFine;
        
        mapReportCase[numReportCase] = reportObject;
         
         return (numReportCase++);
        
    }
   
    
    function setReporter(string re_name, string re_unit,string re_addr,string re_tel,string re_zipcode) public returns (uint) {
 
        reporter memory reportObject;
        
        reportObject.rep_name = re_name;
        reportObject.rep_unit = re_unit;
        reportObject.rep_address=re_addr;
        reportObject.rep_tel=re_tel;
        reportObject.rep_zipcode=re_zipcode;
        
       mapReporter[numReporter] = reportObject;
       
		
        return (numReporter++);
      
    }
 
    function setConveyanceOwner(string conv_persNo , string _plate , string conv_na,string conv_tel,string conv_addr) public returns (uint){
		
        conveyanceOwner memory conveyIns;
         conveyIns.conv_personalNo = conv_persNo;
         conveyIns.conv_plateNo = _plate;
        conveyIns.conv_name=conv_na;
        conveyIns.conv_tele=conv_tel;
        conveyIns.conv_address=conv_addr;
        
        mapConvey[numConvey] = conveyIns;
		
        return (numConvey++);
   
    }
    
      function editReportCase(string unitNo , string id , string new_charge , string new_placeOfIncident , string new_speedDetection , uint new_amountOfFine) public returns (bool){
        trafficList[unitNo][id].reportList._charge = new_charge;
        trafficList[unitNo][id].reportList._placeOfIncident = new_placeOfIncident;
        trafficList[unitNo][id].reportList._speedDetection = new_speedDetection;
        trafficList[unitNo][id].reportList._amountOfFine = new_amountOfFine;
        
        return true;
        
    }
    
          function editReporter( string unitNo , string id , string new_re_name, string new_re_unit,string new_re_addr, string new_re_tel, string new_re_zipcode) public returns (bool){
        trafficList[unitNo][id].reporterList.rep_name = new_re_name;
        trafficList[unitNo][id].reporterList.rep_unit = new_re_unit;
        trafficList[unitNo][id].reporterList.rep_address = new_re_addr;
        trafficList[unitNo][id].reporterList.rep_tel = new_re_tel;
         trafficList[unitNo][id].reporterList.rep_zipcode = new_re_zipcode;
         
         return true;
        
    }
    
    function editConvey(string unitNo , string id ,string new_conv_personNo , string new_conv_na,string new_conv_tel,string new_conv_addr) public returns (bool) {
	trafficList[unitNo][id].conveyList.conv_personalNo = new_conv_personNo;
         trafficList[unitNo][id].conveyList.conv_name = new_conv_na;
        trafficList[unitNo][id].conveyList.conv_tele = new_conv_tel;
        trafficList[unitNo][id].conveyList.conv_address = new_conv_addr;
        
        return true;
    }
    
    function destroyTrafficTicket(string unitNo) public onlyOwner returns (bool){
        uint i = 0;
        TrafficTicket memory ticketNull;
        for (i ; i<trafficTicketNo.length;i++){
            trafficList[unitNo][trafficTicketNo[i]] = ticketNull;
        }
    }
    
}