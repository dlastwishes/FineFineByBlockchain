pragma solidity^0.4.22;

import "github.com/Arachnid/solidity-stringutils/strings.sol";

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
    mapping(string => officerInfo) officerUser;
    
    modifier onlyOwner(){
        require(msg.sender == addrSAdmin);
        _;
    }
    
    function addUnit(string unitNo , string unitName , string unitAddr , string unitTel , string unitZipcode) public{
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

    function login(string _user , string _pass) public view returns (bool){
        string memory pass = userandpass[_user];
        if(pass.toSlice().equals(_pass.toSlice())){
            return (true );
        }
        else {
            return (false) ;
        }
    }
    
    function getNumberStation() public view returns (uint) {
        return (unitList.length);
    }
    
      function checkIn(string user) public checkPermission(user) returns (bool){
          require(user.toSlice().len() >0 );
            prevLogin[msg.sender] = user;
    } 
    
    function editOfficer (
    string _usr 
    , string _name) public {
        officerUser[_usr].name = _name;
    }
    
    function newPermission(string _usr) public returns (bool){
        permissionUser[_usr] = true;
    }
    
    function getPermission(string username) public view returns (bool){
     return (permissionUser[username]);
    }
    
    function disPermission(string username) public {
        permissionUser[username] = false;
    }
    
    function newOfficer
    (string _usr 
    ,string _pass
    , string _name) public {
        userandpass[_usr] = _pass;
        officerUser[_usr].username = _usr;
        officerUser[_usr].name = _name;
        permissionUser[_usr] = false;
        officerUsernameList.push(_usr);
    }
    
    function getOfficerInfo(string username) public view returns (string){
        return 
        (officerUser[username].name);
    }
    
    function getUnitInfo (string unitNo) public view returns (string , string ,string ,string ){
     return (unitNoToInfo[unitNo].unitName
         ,unitNoToInfo[unitNo].unitAddr
         ,unitNoToInfo[unitNo].unitTel
         ,unitNoToInfo[unitNo].unitZipcode); 
    }
    
    function getUnitByIndex(uint index) public view returns (string){
        return unitList[index];
    }
    
    function destroyOfficer() public onlyOwner returns (bool) {
                uint i = 0;
        officerInfo memory officerNull;
        for (i ; i<officerUsernameList.length;i++){
            officerUser[officerUsernameList[i]] = officerNull;
        }
    }
}