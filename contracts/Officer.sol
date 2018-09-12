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
    
    string[] private officerUsernameList;
    
    officerInfo private officerList;
    mapping(string => officerInfo) officerUser;
    
    
        modifier onlyOwner(){
        require(msg.sender == addrSAdmin);
        _;
    }
    
    modifier checkOffice(string _usr) {
        string memory pass = userandpass[_usr];
        require(pass.toSlice().len() > 0);
        _;
    }
    
    function officer() public {
        addrSAdmin = msg.sender;
    }
    
    function login(string _user , string _pass) public returns (bool){
        string memory pass = userandpass[_user];
        if(pass.toSlice().equals(_pass.toSlice())){
            prevLogin[msg.sender] = _user;
            return true;
        }
        else {
            return false;
        }
    }
    
    modifier checkPermission(string _usr){
        require(permissionUser[_usr]);
        _;
    } 
    
    function editOfficer (string _usr 
    , string _name 
    , string _unit 
    , string _office_address 
    , string _tel
    , string _zipcode) public onlyOwner checkOffice(_usr) returns (bool) {
        officerUser[_usr].name = _name;
        officerUser[_usr].unit = _unit;
        officerUser[_usr].office_address = _office_address;
        officerUser[_usr].tel = _tel;
        officerUser[_usr].zipcode = _zipcode;
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
    , string _usr 
    ,string _pass
    , string _name 
    , string _unit 
    , string _office_address 
    , string _tel
    , string _zipcode) public checkPermission(_officerCreateID) checkOffice(_officerCreateID) returns (bool) {
        userandpass[_usr] = _pass;
        officerUser[_usr].username = _usr;
        officerUser[_usr].name = _name;
        officerUser[_usr].unit = _unit;
        officerUser[_usr].office_address = _office_address;
        officerUser[_usr].tel = _tel;
        officerUser[_usr].zipcode = _zipcode;
        permissionUser[_usr] = false;
        officerUsernameList.push(_usr);
        return true;
        
    }
    
        function getOfficerInfo(string username) public constant returns (string , string , string , string , string){
        return 
        (officerUser[username].name
         , officerUser[username].unit
         , officerUser[username].office_address 
         , officerUser[username].tel
         , officerUser[username].zipcode);
    }
    
    function destroyOfficer() public onlyOwner returns (bool) {
                uint i = 0;
        officerInfo memory officerNull;
        for (i ; i<officerUsernameList.length;i++){
            officerUser[officerUsernameList[i]] = officerNull;
        }
    }
}