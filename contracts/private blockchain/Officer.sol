pragma solidity^0.4.22;
import "github.com/Arachnid/solidity-stringutils/src/strings.sol";

contract officer{
     using strings for *;
    address private addrSAdmin;
    mapping (string => string ) private userandpass;
    mapping ( address  => string)  prevLogin;
    mapping (string => bool) permissionUser;
    struct officerInfo {
        string username;
        string name;
    }
    mapping (string => string ) mapOfficerToUnit;
    struct unitInfo {
        string unitName;
        string unitAddr;
        string unitTel; 
        string unitZipcode;
    }
    string[] unitList;
    mapping (string => unitInfo) unitNoToInfo;
    string[] private officerUsernameList;
    officerInfo private officerList;
    mapping(string => mapping(string => officerInfo)) officerUser;
    
    modifier onlyOwner(){
        require(msg.sender == addrSAdmin);
        _;
    }
    
    function addUnit(string unitNo , string unitName , string unitAddr , string unitTel , string unitZipcode) public onlyOwner{
        unitList.push(unitNo);
        unitNoToInfo[unitNo].unitName = unitName;
        unitNoToInfo[unitNo].unitAddr = unitAddr;
        unitNoToInfo[unitNo].unitTel = unitTel;
        unitNoToInfo[unitNo].unitZipcode = unitZipcode;
    }
    
       modifier checkPermission(string _usr){
        if(!(msg.sender == addrSAdmin)) {
               require(permissionUser[_usr]);
        }
        _;
    } 
        
    function setSuperAdmin() public {
        addrSAdmin = msg.sender;
    }

    function login(string _user , string _pass) public view returns (bool , string){
        string memory pass = userandpass[_user];
        if(pass.toSlice().equals(_pass.toSlice())){
            return (true , mapOfficerToUnit[_user] );
        }
        else {
            return (false , "Not found" ) ;
        }
    }
    
      function checkIn(string user) public checkPermission(user) returns (bool){
          require(user.toSlice().len() >0 );
            prevLogin[msg.sender] = user;
    } 
    
    function editOfficer (
    string unitNo 
    , string _usr 
    , string _name) public {
        officerUser[unitNo][_usr].name = _name;
    }
    
    function newPermission(string _usr) public checkPermission(_usr) returns (bool){
        permissionUser[_usr] = true;
    }
    
    function getPermission(string username) public view returns (bool){
     return (permissionUser[username]);
    }
    
    function disPermission(string username) public {
        permissionUser[username] = false;
    }
    
    function newOfficer
    ( string unitNo
    , string _usr 
    ,string _pass
    , string _name) public {
        userandpass[_usr] = _pass;
        officerUser[unitNo][_usr].username = _usr;
        officerUser[unitNo][_usr].name = _name;
        permissionUser[_usr] = false;
        officerUsernameList.push(_usr);
        mapOfficerToUnit[_usr] = unitNo;
    }
    
        function getOfficerInfo(string unitNo , string username) public view returns (string){
        return 
        (officerUser[unitNo][username].name);
    }
    
    function getUnitInfo (string unitNo) public view returns (string , string ,string ,string ){
     return (unitNoToInfo[unitNo].unitName
         ,unitNoToInfo[unitNo].unitAddr
         ,unitNoToInfo[unitNo].unitTel
         ,unitNoToInfo[unitNo].unitZipcode); 
    }
    
    function getUnitByOfficer ( string username) public view returns (string){
        return (mapOfficerToUnit[username]);
    }
    
    function destroyOfficer(string unitNo) public onlyOwner returns (bool) {
                uint i = 0;
        officerInfo memory officerNull;
        for (i ; i<officerUsernameList.length;i++){
            officerUser[unitNo][officerUsernameList[i]] = officerNull;
        }
    }
}