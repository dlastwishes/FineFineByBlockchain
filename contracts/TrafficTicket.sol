pragma solidity ^0.4.17;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract trafficTicket {
    using strings for *;
    string[] trafficTicketNo;
    
    address owner = msg.sender;
	
    struct reporter {
        string  rep_name;
        string rep_unit;
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
    mapping ( string => mapping(uint => string)) mapTargetPointToTicket;
    
    conveyanceOwner private convey;
    reporter private reportInfo;
    report_case private report;
    
    mapping(string => uint) numConvey;
    mapping(string => uint) numReportCase;
    mapping(string => uint) numReporter;
    
    mapping( string => mapping (uint => conveyanceOwner)) mapConvey;
   mapping( string =>  mapping (uint => reporter)) mapReporter;
    mapping(string => mapping (uint => report_case)) mapReportCase;
    
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
	
	function getTicketNo(string unitNo,uint num) public view returns (string) {
	    return (mapTargetPointToTicket[unitNo][num]);
	}
	
	//get point of data in map of ticket data
	
	function getReporterPoint(string unitNo) public view returns (uint) {
	    return (numReporter[unitNo]);
	}
	
	function getMapReporter(string unitNo , uint pointer) public view returns (string , string) {
	    return(mapReporter[unitNo][pointer].rep_name , mapReporter[unitNo][pointer].rep_unit);
	}
	 
	function getReportcasePoint(string unitNo) public view returns (uint){
	    return (numReportCase[unitNo]);
	}
	
	function getMapReportcase(string unitNo , uint pointer) public view returns (string , string , string ,uint) {
	    return
	       (mapReportCase[unitNo][pointer]._charge 
	    , mapReportCase[unitNo][pointer]._placeOfIncident
        , mapReportCase[unitNo][pointer]._speedDetection 
        , mapReportCase[unitNo][pointer]._amountOfFine);
	}
	
	function getConveyancePoint(string unitNo) public view returns (uint){
	    return (numConvey[unitNo]);
	}
	
	function getMapConvey(string unitNo , uint pointer) public view returns (string , string ,string ,string ,string){
	    return(mapConvey[unitNo][pointer].conv_personalNo,
          mapConvey[unitNo][pointer].conv_plateNo,
          mapConvey[unitNo][pointer].conv_name,
        mapConvey[unitNo][pointer].conv_tele,
        mapConvey[unitNo][pointer].conv_address);
	}
    
    function getConveyance(string unitNo , string id , string _personalid) public checkShowTicket( unitNo , id , _personalid) constant returns (string , string , string , string , string)  {
        
        return (trafficList[unitNo][id].conveyList.conv_personalNo
        , trafficList[unitNo][id].conveyList.conv_plateNo
        , trafficList[unitNo][id].conveyList.conv_name
        , trafficList[unitNo][id].conveyList.conv_tele 
        , trafficList[unitNo][id].conveyList.conv_address);
    }
    
    function getReporter(string unitNo , string id , string _personalid) public checkShowTicket(unitNo ,id , _personalid) constant returns (string , string){
        return (trafficList[unitNo][id].reporterList.rep_name
         , trafficList[unitNo][id].reporterList.rep_unit);
    }
    
    function getReportCase( string unitNo , string id , string _personalid) public checkShowTicket( unitNo , id , _personalid) constant returns ( string ,string ,string , uint){
        
        return (trafficList[unitNo][id].reportList._charge , 
        trafficList[unitNo][id].reportList._placeOfIncident
        , trafficList[unitNo][id].reportList._speedDetection
        , trafficList[unitNo][id].reportList._amountOfFine);
    
    }

    function newTrafficTicket( string unitNo , uint reporterPoint , uint reportcasePoint , uint conveyPoint ,string trafficID) public{
	
	    require(unitNo.toSlice().len() > 0);

        report_case memory  reportSingletron;
         reporter memory reporterSingletron;
         conveyanceOwner memory conveySingletron;
         reportSingletron._charge = mapReportCase[unitNo][reportcasePoint]._charge;
         reportSingletron._placeOfIncident = mapReportCase[unitNo][reportcasePoint]._placeOfIncident;
         reportSingletron._speedDetection = mapReportCase[unitNo][reportcasePoint]._speedDetection;
         reportSingletron._amountOfFine = mapReportCase[unitNo][reportcasePoint]._amountOfFine;
         reporterSingletron.rep_name = mapReporter[unitNo][reporterPoint].rep_name;
         reporterSingletron.rep_unit = mapReporter[unitNo][reporterPoint].rep_unit;
          conveySingletron.conv_personalNo = mapConvey[unitNo][conveyPoint].conv_personalNo;
          conveySingletron.conv_plateNo = mapConvey[unitNo][conveyPoint].conv_plateNo;
           conveySingletron.conv_name = mapConvey[unitNo][conveyPoint].conv_name;
            conveySingletron.conv_tele= mapConvey[unitNo][conveyPoint].conv_tele;
            conveySingletron.conv_address= mapConvey[unitNo][conveyPoint].conv_address;
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
        mapTargetPointToTicket[unitNo][conveyPoint] = trafficID;
    }
    
       function setReport_case(string unitNo , string charge , string placeOfIncident , string speedDetection , uint amountOfFine) public {
	    require(unitNo.toSlice().len() > 0);
	    require(amountOfFine > 0);
	    uint None = uint(0); 
	    if( numReportCase[unitNo] == None ) {
              uint init = 0;	
	    	numReportCase[unitNo] = init;
        }
        uint reportcasePoint = numReportCase[unitNo];
        report_case memory reportObject;
        reportObject._charge = charge;
        reportObject._placeOfIncident = placeOfIncident;
        reportObject._speedDetection = speedDetection;
        reportObject._amountOfFine = amountOfFine;
        uint lastPoint = reportcasePoint+1;
        numReportCase[unitNo] = lastPoint;
        mapReportCase[unitNo][lastPoint] = reportObject;
        
    }
   
    
    function setReporter(string re_name , string re_unit) public {
        require(re_unit.toSlice().len() > 0);
        require(re_name.toSlice().len() > 0);
        uint None = uint(0); 
	    if( numReporter[re_unit] == None ) {
              uint init = 0;	
	         numReporter[re_unit] = init;
        }
        uint reporterPoint = numReporter[re_unit];
        reporter memory reportObject;
        reportObject.rep_name = re_name;
        reportObject.rep_unit = re_unit;
        uint lastPoint =reporterPoint +1;
        numReporter[re_unit] = lastPoint;
       mapReporter[re_unit][lastPoint] = reportObject;
      
    }
 
    function setConveyanceOwner(string unitNo , string conv_persNo , string _plate , string conv_na,string conv_tel,string conv_addr) public{
		require(unitNo.toSlice().len() > 0);
		 uint None = uint(0); 
	    if( numConvey[unitNo] == None ) {
              uint init = 0;	
	         numConvey[unitNo] = init;
        }
         uint conveyPoint = numConvey[unitNo];
        conveyanceOwner memory conveyIns;
         conveyIns.conv_personalNo = conv_persNo;
         conveyIns.conv_plateNo = _plate;
        conveyIns.conv_name=conv_na;
        conveyIns.conv_tele=conv_tel;
        conveyIns.conv_address=conv_addr;
       uint lastPoint = conveyPoint+1;
        numConvey[unitNo] = lastPoint;
        mapConvey[unitNo][lastPoint] = conveyIns;
   
    }
    
      function editReportCase(string unitNo , string id , string new_charge , string new_placeOfIncident , string new_speedDetection , uint new_amountOfFine) public{
        trafficList[unitNo][id].reportList._charge = new_charge;
        trafficList[unitNo][id].reportList._placeOfIncident = new_placeOfIncident;
        trafficList[unitNo][id].reportList._speedDetection = new_speedDetection;
        trafficList[unitNo][id].reportList._amountOfFine = new_amountOfFine;
        
    }
    
          function editReporter( string unitNo , string id , string new_re_name, string new_re_unit) public{
        trafficList[unitNo][id].reporterList.rep_name = new_re_name;
        trafficList[unitNo][id].reporterList.rep_unit = new_re_unit;
    }
    
    function editConvey(string unitNo , string id ,string new_conv_personNo , string new_conv_na,string new_conv_tel,string new_conv_addr) public {
	trafficList[unitNo][id].conveyList.conv_personalNo = new_conv_personNo;
         trafficList[unitNo][id].conveyList.conv_name = new_conv_na;
        trafficList[unitNo][id].conveyList.conv_tele = new_conv_tel;
        trafficList[unitNo][id].conveyList.conv_address = new_conv_addr;
    }
    
    function destroyTrafficTicket(string unitNo) public onlyOwner{
        uint i = 0;
        TrafficTicket memory ticketNull;
        for (i ; i<trafficTicketNo.length;i++){
            trafficList[unitNo][trafficTicketNo[i]] = ticketNull;
        }
    }
    
}