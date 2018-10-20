pragma solidity ^0.4.22;

import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract trafficTicket {
    using strings for *;
    string[] trafficTicketNo;
    struct reporter {
        string  rep_name;
        string rep_unit;
    }
    struct report_case {
        string  _charge;
        string  _placeOfIncident;
        string _speedDetection;
        uint  _amountOfFine;
        string _description;
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
        string expire;
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
	function getTicket(string unitNo , string ticketNo) public view returns (string ,string){
	    return (trafficList[unitNo][ticketNo].conveyList.conv_name , trafficList[unitNo][ticketNo].conveyList.conv_personalNo);
	}
	function getTicketNo(string unitNo,uint num) public view returns (string) {
	    return (mapTargetPointToTicket[unitNo][num]);
	}
	function getReporterPoint(string unitNo) public view returns (uint) {
	    return (numReporter[unitNo]);
	}
	
	function getMapReporter(string unitNo , uint pointer) public view returns (string , string) {
	    return(mapReporter[unitNo][pointer].rep_name , mapReporter[unitNo][pointer].rep_unit);
	}
	 
	function getReportcasePoint(string unitNo) public view returns (uint){
	    return (numReportCase[unitNo]);
	}
	
	function getMapReportcase(string unitNo , uint8 pointer) public view returns (string , string , string ,uint,string) {
	    return
	       (mapReportCase[unitNo][pointer]._charge 
	    , mapReportCase[unitNo][pointer]._placeOfIncident
        , mapReportCase[unitNo][pointer]._speedDetection 
        , mapReportCase[unitNo][pointer]._amountOfFine
        , mapReportCase[unitNo][pointer]._description);
	}
	
	function getConveyancePoint(string unitNo) public view returns (uint){
	    return (numConvey[unitNo]);
	}
	
	function getMapConvey(string unitNo , uint8 pointer) public view returns (string , string ,string ,string ,string){
	    return(mapConvey[unitNo][pointer].conv_personalNo,
          mapConvey[unitNo][pointer].conv_plateNo,
          mapConvey[unitNo][pointer].conv_name,
        mapConvey[unitNo][pointer].conv_tele,
        mapConvey[unitNo][pointer].conv_address);
	}
    function getConveyance(string unitNo , string id , string _personalid) public checkShowTicket( unitNo , id , _personalid) view returns (string , string , string , string , string)  {
        return (trafficList[unitNo][id].conveyList.conv_personalNo
        , trafficList[unitNo][id].conveyList.conv_plateNo
        , trafficList[unitNo][id].conveyList.conv_name
        , trafficList[unitNo][id].conveyList.conv_tele 
        , trafficList[unitNo][id].conveyList.conv_address);
    }
    
    function getReporter(string unitNo , string id , string _personalid) public checkShowTicket(unitNo ,id , _personalid) view returns (string , string , string ){
        return (trafficList[unitNo][id].reporterList.rep_name
         , trafficList[unitNo][id].reporterList.rep_unit
         , trafficList[unitNo][id].expire);
    }
    
    function getReportCase( string unitNo , string id , string _personalid) public checkShowTicket( unitNo , id , _personalid) view returns ( string ,string ,string , uint ,string){
        
        return (trafficList[unitNo][id].reportList._charge , 
        trafficList[unitNo][id].reportList._placeOfIncident
        , trafficList[unitNo][id].reportList._speedDetection
        , trafficList[unitNo][id].reportList._amountOfFine
        , trafficList[unitNo][id].reportList._description);
    }

    function newTrafficTicket( string unitNo , uint reporterPoint 
    , uint reportcasePoint , uint conveyPoint 
    ,string expired ,string trafficID) public{
	    require(unitNo.toSlice().len() > 0);
         trafficList[unitNo][trafficID].conveyList =  mapConvey[unitNo][conveyPoint];
         trafficList[unitNo][trafficID].reporterList = mapReporter[unitNo][reporterPoint];
        trafficList[unitNo][trafficID].reportList = mapReportCase[unitNo][reportcasePoint];
        trafficList[unitNo][trafficID].expire = expired;
        uint totalTicketUnitIns = totalTicketInUnit[unitNo];
        if( totalTicketUnitIns == uint(0) ) {
            totalTicketUnitIns = 0;
        }
        totalTicketInUnit[unitNo] = totalTicketUnitIns+1;
        trafficTicketNo.push(trafficID);
        mapTargetPointToTicket[unitNo][conveyPoint] = trafficID;
    }
    
       function setReport_case(string unitNo , string charge , string placeOfIncident , string speedDetection , uint amountOfFine , string description) public {
	    require(unitNo.toSlice().len() > 0);
	    require(amountOfFine > 0);
	    if( numReportCase[unitNo] == uint(0) ) {
              uint init = 0;	
	    	numReportCase[unitNo] = init;
        }
        uint reportcasePoint = numReportCase[unitNo];
         uint lastPoint = reportcasePoint+1;
        mapReportCase[unitNo][lastPoint]._charge = charge;
        mapReportCase[unitNo][lastPoint]._placeOfIncident = placeOfIncident;
        mapReportCase[unitNo][lastPoint]._speedDetection = speedDetection;
        mapReportCase[unitNo][lastPoint]._amountOfFine = amountOfFine;
        mapReportCase[unitNo][lastPoint]._description = description;
       
        numReportCase[unitNo] = lastPoint;
        
    }
   
    function setReporter(string re_name , string re_unit) public {
        require(re_unit.toSlice().len() > 0);
        require(re_name.toSlice().len() > 0);
	    if( numReporter[re_unit] == uint(0) ) {
              uint init = 0;	
	         numReporter[re_unit] = init;
        }
        uint reporterPoint = numReporter[re_unit];
         uint lastPoint =reporterPoint +1;
         mapReporter[re_unit][lastPoint].rep_name = re_name;
         mapReporter[re_unit][lastPoint].rep_unit = re_unit;
       
        numReporter[re_unit] = lastPoint;
      
    }
 
    function setConveyanceOwner(string unitNo , string conv_persNo , string _plate , string conv_na,string conv_tel,string conv_addr) public{
		require(unitNo.toSlice().len() > 0);
	    if(numConvey[unitNo] == uint(0) ) {
              uint init = 0;	
	         numConvey[unitNo] = init;
        }
         uint conveyPoint = numConvey[unitNo];
          uint lastPoint = conveyPoint+1;
         mapConvey[unitNo][lastPoint].conv_personalNo = conv_persNo;
         mapConvey[unitNo][lastPoint].conv_plateNo = _plate;
        mapConvey[unitNo][lastPoint].conv_name=conv_na;
        mapConvey[unitNo][lastPoint].conv_tele=conv_tel;
        mapConvey[unitNo][lastPoint].conv_address=conv_addr;
        numConvey[unitNo] = lastPoint;
    }
    
      function editReportCase( string unitNo , string id , string new_charge , string new_placeOfIncident , string new_speedDetection , uint new_amountOfFine , string new_description) public{
        trafficList[unitNo][id].reportList._charge = new_charge;
        trafficList[unitNo][id].reportList._placeOfIncident = new_placeOfIncident;
        trafficList[unitNo][id].reportList._speedDetection = new_speedDetection;
        trafficList[unitNo][id].reportList._amountOfFine = new_amountOfFine;
        trafficList[unitNo][id].reportList._description = new_description;
    }
    
          function editReporter( string unitNo , string id , string new_re_name, string new_re_unit) public{
        trafficList[unitNo][id].reporterList.rep_name = new_re_name;
        trafficList[unitNo][id].reporterList.rep_unit = new_re_unit;
    }
    
    function editConvey(string unitNo , string id ,string new_conv_personNo , string new_plate, string new_conv_na,string new_conv_tel,string new_conv_addr) public {
	trafficList[unitNo][id].conveyList.conv_personalNo = new_conv_personNo;
	trafficList[unitNo][id].conveyList.conv_plateNo = new_plate;
         trafficList[unitNo][id].conveyList.conv_name = new_conv_na;
        trafficList[unitNo][id].conveyList.conv_tele = new_conv_tel;
        trafficList[unitNo][id].conveyList.conv_address = new_conv_addr;
    }
    
}