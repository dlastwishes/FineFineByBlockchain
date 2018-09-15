pragma solidity^0.4.17;

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
        string unit;
        string office_address;
        string tel;
        string zipcode;
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
    
    modifier checkOffice(string _usr) {
        string memory pass = userandpass[_usr];
        require(pass.toSlice().len() > 0);
        _;
    }
    
    function officer() public {
        addrSAdmin = msg.sender;
    }
    
    function login(string _user , string _pass) public returns (bool , string){
        string memory pass = userandpass[_user];
        if(pass.toSlice().equals(_pass.toSlice())){
            prevLogin[msg.sender] = _user;
            return (true , mapOfficerToUnit[_user]);
        }
        else {
            return (false , "Not found" ) ;
        }
    }
    
    modifier checkPermission(string _usr){
        require(permissionUser[_usr]);
        _;
    } 
    
    function editOfficer (string unitNo , string _usr 
    , string _name 
    , string _unit 
    , string _office_address 
    , string _tel
    , string _zipcode) public onlyOwner checkOffice(_usr) returns (bool) {
        officerUser[unitNo][_usr].name = _name;
        officerUser[unitNo][_usr].unit = _unit;
        officerUser[unitNo][_usr].office_address = _office_address;
        officerUser[unitNo][_usr].tel = _tel;
        officerUser[unitNo][_usr].zipcode = _zipcode;
        return true;
    }
        
    function recoverUsr(string _usr , string _pass,string _repass) public checkOffice(_usr) returns (bool,string){
        string memory prvUsr = prevLogin[msg.sender];
        require(prvUsr.toSlice().equals(_usr.toSlice()));
        require(_pass.toSlice().equals(_repass.toSlice()));
        userandpass[_usr] = _pass;
        return (true , _pass);
    }
    
    function newPermission(string _usr) public onlyOwner returns (bool){
        permissionUser[_usr] = true;
    }
    
    function newOfficer
    (string _officerCreateID
    , string unitNo
    , string _usr 
    ,string _pass
    , string _name 
    , string _unit 
    , string _office_address 
    , string _tel
    , string _zipcode) public checkPermission(_officerCreateID) checkOffice(_officerCreateID) returns (bool) {
        userandpass[_usr] = _pass;
        officerUser[unitNo][_usr].username = _usr;
        officerUser[unitNo][_usr].name = _name;
        officerUser[unitNo][_usr].unit = _unit;
        officerUser[unitNo][_usr].office_address = _office_address;
        officerUser[unitNo][_usr].tel = _tel;
        officerUser[unitNo][_usr].zipcode = _zipcode;
        permissionUser[_usr] = false;
        officerUsernameList.push(_usr);
        mapOfficerToUnit[_usr] = unitNo;
        return true;
        
    }
    
        function getOfficerInfo(string unitNo , string username) public view returns ( string ,string , string ,string){
        return 
        (officerUser[unitNo][username].name
         , officerUser[unitNo][username].office_address 
         , officerUser[unitNo][username].tel
         , officerUser[unitNo][username].zipcode);
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