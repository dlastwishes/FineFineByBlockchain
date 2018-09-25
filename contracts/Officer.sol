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
    
    function addUnit(string unitNo , string unitName , string unitAddr , string unitTel , string unitZipcode) public onlyOwner returns (bool) {
        unitList.push(unitNo);
        unitNoToInfo[unitNo].unitName = unitName;
        unitNoToInfo[unitNo].unitAddr = unitAddr;
        unitNoToInfo[unitNo].unitTel = unitTel;
        unitNoToInfo[unitNo].unitZipcode = unitZipcode;
        
        return (true);
    }
    
       modifier checkPermission(string _usr){
        if(!(msg.sender == addrSAdmin)) {
               require(permissionUser[_usr]);
        }
        _;
    } 
    
    modifier checkOffice(string _usr) {
        if(msg.sender == addrSAdmin){
            
        }else {
        string memory pass = userandpass[_usr];
        require(pass.toSlice().len() > 0);
        }
        _;
    }
    
    function setSuperAdmin() public {
        addrSAdmin = msg.sender;
    }
    
    function loginToAddAdmin(string username , string password) public view returns (bool){
        string memory pass = userandpass[username];
        if(pass.toSlice().equals(password.toSlice())){
            if(permissionUser[username]){
                return (true);
            }
        }
        else {
            return (false ) ;
        }
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
    , string _name) public checkPermission(_usr) checkOffice(_usr) {
        officerUser[unitNo][_usr].name = _name;
        
    }
        
    function recoverUsr(string _usr , string _pass,string _repass) public checkOffice(_usr) returns (bool,string){
        string memory prvUsr = prevLogin[msg.sender];
        require(prvUsr.toSlice().equals(_usr.toSlice()));
        require(_pass.toSlice().equals(_repass.toSlice()));
        userandpass[_usr] = _pass;
        return (true , _pass);
    }
    
    function newPermission(string _usr) public checkPermission(_usr) returns (bool){
        permissionUser[_usr] = true;
    }
    
    function newOfficer
    (string _officerCreateID
    , string unitNo
    , string _usr 
    ,string _pass
    , string _name) public checkPermission(_officerCreateID) checkOffice(_officerCreateID) returns (bool) {
        userandpass[_usr] = _pass;
        officerUser[unitNo][_usr].username = _usr;
        officerUser[unitNo][_usr].name = _name;
        permissionUser[_usr] = false;
        officerUsernameList.push(_usr);
        mapOfficerToUnit[_usr] = unitNo;
        return true;
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
    
    function destroyOfficer(string unitNo) public onlyOwner returns (bool) {
                uint i = 0;
        officerInfo memory officerNull;
        for (i ; i<officerUsernameList.length;i++){
            officerUser[unitNo][officerUsernameList[i]] = officerNull;
        }
    }
}