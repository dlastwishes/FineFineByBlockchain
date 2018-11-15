var urlParams = new URLSearchParams(window.location.search);
var trafficno = urlParams.get('id');
var fine = urlParams.get('fine');
var personno = urlParams.get('personalno');
var unitno = urlParams.get('unitno');

web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9462109ce6cf4f48ad46671ce04f461f"));
// web3 = new Web3(new Web3.providers.HttpProvider("http://10.4.56.21:8545"));
console.log("new provider " + typeof web3);
// web3.eth.defaultAccount = web3.eth.accounts[0];

console.log(web3.isConnected());
if (web3.isConnected()) {

      var TrafficConstract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "id", "type": "string" }, { "name": "new_re_name", "type": "string" }, { "name": "new_re_unit", "type": "string" }], "name": "editReporter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }], "name": "getReportcasePoint", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "pointer", "type": "uint256" }], "name": "getMapReporter", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }], "name": "getReporterPoint", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitno", "type": "string" }, { "name": "ticketno", "type": "string" }], "name": "searchPersonByTicket", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "id", "type": "string" }, { "name": "_personalid", "type": "string" }], "name": "getReportCase", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "id", "type": "string" }, { "name": "new_conv_personNo", "type": "string" }, { "name": "new_plate", "type": "string" }, { "name": "new_conv_na", "type": "string" }, { "name": "new_conv_tel", "type": "string" }, { "name": "new_conv_addr", "type": "string" }], "name": "editConvey", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalTicket", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "re_name", "type": "string" }, { "name": "re_unit", "type": "string" }], "name": "setReporter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "pointer", "type": "uint8" }], "name": "getMapConvey", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "ticketNo", "type": "string" }], "name": "getTicket", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "id", "type": "string" }, { "name": "new_charge", "type": "string" }, { "name": "new_placeOfIncident", "type": "string" }, { "name": "new_speedDetection", "type": "string" }, { "name": "new_amountOfFine", "type": "uint256" }, { "name": "new_description", "type": "string" }], "name": "editReportCase", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "id", "type": "string" }, { "name": "_personalid", "type": "string" }], "name": "getReporter", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "conv_persNo", "type": "string" }, { "name": "_plate", "type": "string" }, { "name": "conv_na", "type": "string" }, { "name": "conv_tel", "type": "string" }, { "name": "conv_addr", "type": "string" }], "name": "setConveyanceOwner", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "num", "type": "uint256" }], "name": "getTicketNo", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "report_unit", "type": "string" }], "name": "getTotalTicketByUnit", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "reporterPoint", "type": "uint256" }, { "name": "reportcasePoint", "type": "uint256" }, { "name": "conveyPoint", "type": "uint256" }, { "name": "expired", "type": "string" }, { "name": "trafficID", "type": "string" }], "name": "newTrafficTicket", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }], "name": "getConveyancePoint", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "id", "type": "string" }, { "name": "_personalid", "type": "string" }], "name": "getConveyance", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "charge", "type": "string" }, { "name": "placeOfIncident", "type": "string" }, { "name": "speedDetection", "type": "string" }, { "name": "amountOfFine", "type": "uint256" }, { "name": "description", "type": "string" }], "name": "setReport_case", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitno", "type": "string" }, { "name": "id", "type": "string" }, { "name": "personalid", "type": "string" }], "name": "getExpired", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "pointer", "type": "uint8" }], "name": "getMapReportcase", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitno", "type": "string" }, { "name": "personid", "type": "string" }], "name": "searchTicketByPerson", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]);
    //ของ rinkeby
    var ticketAddr = "0x0394345777fd5d42a8e9b86258e5eb2eadf14610"; 
    // ของ private
    // var ticketAddr = "0x73e894a13e656f665d0999ff5a038d5af7547671";
    var traffic = TrafficConstract.at(ticketAddr);

    var payTrafficTicket = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "_trafficNo", "type": "string" }], "name": "getPayerTraffic", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTargetAccount", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "_trafficNo", "type": "string" }], "name": "payFine", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }], "name": "getTotalPayedTicketByUnit", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalPayTicket", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "addr", "type": "address" }], "name": "setTargetAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "checkBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_trafficNo", "type": "string" }], "name": "isPay", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }]);
    var payTicketAddr = "0xf6fdaba62d65d708acea0453a22a1787c8b44910";
    var payTicket = payTrafficTicket.at(payTicketAddr);

    var officerContract = web3.eth.contract([{ "constant": false, "inputs": [{ "name": "_usr", "type": "string" }, { "name": "_pass", "type": "string" }, { "name": "_name", "type": "string" }], "name": "newOfficer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "username", "type": "string" }], "name": "getOfficerInfo", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }], "name": "getUnitInfo", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "index", "type": "uint256" }], "name": "getUnitByIndex", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_usr", "type": "string" }], "name": "newPermission", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_user", "type": "string" }, { "name": "_pass", "type": "string" }], "name": "login", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "destroyOfficer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "username", "type": "string" }], "name": "disPermission", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "setSuperAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_usr", "type": "string" }, { "name": "_name", "type": "string" }], "name": "editOfficer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getNumberStation", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "username", "type": "string" }], "name": "getPermission", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "unitName", "type": "string" }, { "name": "unitAddr", "type": "string" }, { "name": "unitTel", "type": "string" }, { "name": "unitZipcode", "type": "string" }], "name": "addUnit", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "user", "type": "string" }], "name": "checkIn", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }]);
    // ของ rinkeby
    var officerAddr = "0x97a02fcbf0812e638237db629af08a6a4d4e3896"; 
    //ของ private
    // var officerAddr = "0xc7537446b9b93affd8c1d4681ba7f2c039139d53";
    var officer = officerContract.at(officerAddr);

} else {
    console.log('not connect');
}

function checkID(id) {
    if (id.length != 13) return false;

    for (i = 0, sum = 0; i < 12; i++)
        sum += parseFloat(id.charAt(i)) * (13 - i); if ((11 - sum % 11) % 10 != parseFloat(id.charAt(12)))

        return false; return true;
}

checkForm = () => {
    if (!checkID(document.getdataform.personalno.value)) {
        alert("ป้อนข้อมูลไม่ครบ หรือ รหัสบัตรประชาชนไม่ถูกต้อง");
        return false;
    }
    else {
        let personalno = document.getdataform.personalno.value;
        let ticketno = document.getdataform.id.value;
        var unitno = (document.getdataform.id.value).substring(0, 4);
        console.log(unitno);
        $("#unit").html(unitno);
        window.location.replace("./info.html?id=" + ticketno + "&personalno=" + personalno + "&unitno=" + unitno);
    }
}


gotoConfirm = () => {
    var fineTotal = document.getElementById("reportcase_fine").innerHTML;
    window.location.replace("./confirmPayment.html?id=" + trafficno + "&personalno=" + personno + "&unitno=" + unitno + "&fine=" + fineTotal);
}

goBackFromConfirm = () => {
    window.location.replace("./info.html?id=" + trafficno + "&personalno=" + personno + "&unitno=" + unitno);
}

goNextFromConfim = () => {
    let fineETH = document.getElementById("fineETH").innerHTML;
    window.location.replace("./payment.html?id=" + trafficno + "&personalno=" + personno + "&unitno=" + unitno + "&fine=" + fineETH);
}

compare = () => {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=THB')
        .then((result) => { return result.json() })
        .then((data) => {
            let res = data.THB;
            let fineETH = parseInt(fine) / res
            setPayData(fineETH);
        });
}

setPayData = (fineETH) => {
    $("#trafficno").html(trafficno);
    $("#fineTHB").html(fine);
    $("#fineETH").html(fineETH);
}

goBackFromPolicy = () => {
    window.location.replace("./info.html?id=" + trafficno + "&personalno=" + personno + "&unitno=" + unitno);
}

goToPolicy = () => {
    window.location.replace("./policy.html?id=" + trafficno + "&personalno=" + personno + "&unitno=" + unitno);
}

