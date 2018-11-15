if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("existing web3: provider " + web3);
    web3.eth.defaultAccount = web3.eth.accounts[0];
}

else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9462109ce6cf4f48ad46671ce04f461f"));
    console.log("new provider " + typeof web3);
    // web3.eth.defaultAccount = web3.eth.accounts[0];
}

console.log(web3.isConnected());

if (web3.isConnected()) {

    web3.version.getNetwork((err, netId) => {
        // เป็นส่วนเวลาใช้งานจริงบน Mainnet จะต้องเปิดคอมเม้น ด้านล่างนี้แทน
        // if (netId != "1") {
        //     alert("กรุณาเชื่อมต่อไปยัง Mainnet Ethereum");
        // }
        // เป็นส่วนสำหรับตอนทดสอบบน Rinkeby Testnet
        if (netId != "4") {
            alert("กรุณาเชื่อมต่อไปยัง Rinkeby Testnet");
        }
    });

    var payTrafficTicket = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "_trafficNo", "type": "string" }], "name": "getPayerTraffic", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTargetAccount", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "_trafficNo", "type": "string" }], "name": "payFine", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }], "name": "getTotalPayedTicketByUnit", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalPayTicket", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "addr", "type": "address" }], "name": "setTargetAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "checkBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_trafficNo", "type": "string" }], "name": "isPay", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }]);
    var payTicketAddr = "0xf6fdaba62d65d708acea0453a22a1787c8b44910";
    var payTicket = payTrafficTicket.at(payTicketAddr);

} else {
    console.log('not connect');
}

var urlParams = new URLSearchParams(window.location.search);
var trafficno = urlParams.get('id');
var fine = urlParams.get('fine');
var personno = urlParams.get('personalno');
var unitno = urlParams.get('unitno');

insertZeroFromFront = (sizeHex) => {
    let enc = "";
    for (let i = 0; i < 64 - sizeHex; i++) {
        enc += "0"
    }
    return (enc);
}

insertZeroFromBack = (init) => {
    inputZero = "";
    for (let i = init; i < 64; i++) {
        inputZero += "0";
    }
    return inputZero;
}

setDataForPayFine = () => {
    let sizeParam = 2;
    let sizeHex = web3.fromDecimal(sizeParam * 32).substring(2);
    let callFunction = (web3.sha3("payFine(string,string)") + " ").substring(0, 10);
    let ticketHex = (web3.toHex(trafficno) + "").substring(2);
    let unitHex = (web3.toHex(unitno) + "").substring(2);
    // splitString1 ส่วนนี้ เป็น hex ของ size ของ parameter ทั้งหมด
    let splitString1 = insertZeroFromFront(sizeHex.length);
    splitString1 += sizeHex;
    // splitString1 ส่วนนี้ เป็น hex ของ size ของ parameter แรก
    unitSizeHex = web3.fromDecimal(unitno.length * 32).substring(2)
    splitString1 += insertZeroFromFront(unitSizeHex.length);
    splitString1 += unitSizeHex;
    // splitString1 ส่วนนี้ เป็น ความยาวของ parameter แรก 
    sizeUnit = (unitno.length).toString();
    splitString1 += insertZeroFromFront(sizeUnit.length);
    splitString1 += unitno.length;
    // splitString2 ส่วนนี้เป็น ความยาวของ parameter ตัวที่สอง
    sizetraffic = (trafficno.length).toString();
    let splitString2 = "";
    splitString2 += insertZeroFromFront(sizetraffic.length);
    splitString2 += trafficno.length;
    // เพิ่มค่า hex ของ traffic ticket no. และ unit no.
    let ticket = ticketHex + "";
    let unit = unitHex + "";
    ticket += insertZeroFromBack(ticketHex.length);
    unit += insertZeroFromBack(unitHex.length);
    // รวม bytecode ทั้งหมดด้วยกัน เพื่อเป็น Data value dlast
    let payFineData = callFunction + splitString1 + unit + splitString2 + ticket;
    return (payFineData);
}

metamask = () => {
    payTicket.payFine.sendTransaction(
        unitno,
        trafficno
        , { from: web3.eth.accounts[0], value: web3.toWei(fine, "ether") }
        , function (error, result) {
            if (!error)
                window.location.replace("./success.html");
            else
                console.error(error);
        });
}

myether = () => {
    let data = setDataForPayFine();
    window.location.replace("https://www.myetherwallet.com/?to=" + payTicketAddr + "&value=" + fine + "&gasLimit=150000&data=" + data + "#send-transaction");
}