// if (typeof web3 !== 'undefined') {

//     web3 = new Web3(web3.currentProvider);
//     console.log("existing web3: provider " + web3);
//     web3.eth.defaultAccount = web3.eth.accounts[0];
// }

// else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/g5rWkSjjhx1LPmDch30E"));
    console.log("new provider " + typeof web3);
    web3.eth.defaultAccount = web3.eth.coinbase;
// }

console.log("connected to rinkeby : "+web3.isConnected());

if (web3.isConnected()) {

    var payTrafficTicket = web3.eth.contract([{ "constant": true, "inputs": [{ "name": "_trafficNo", "type": "string" }], "name": "getPayerTraffic", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getTargetAccount", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "unitNo", "type": "string" }, { "name": "_trafficNo", "type": "string" }], "name": "payFine", "outputs": [{ "name": "", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "unitNo", "type": "string" }], "name": "getTotalPayedTicketByUnit", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalPayTicket", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "addr", "type": "address" }], "name": "setTargetAccount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "checkBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_trafficNo", "type": "string" }], "name": "isPay", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }]);
    var payTicketAddr = "0x3ae2525e70f5eaba2949d25f31cdd914498dadc0";
    var payTicket = payTrafficTicket.at(payTicketAddr);

} else {
    console.log('not connect');
}

getTotalPayed = () => {
    payTicket.getTotalPayedTicketByUnit(uno, (error, result2) => {
        let pay = result2.c[0];
        $("#totalTicket").html(totalTicket);
        $("#totalPay").html(pay);
        let notpay = total - pay;
        if (notpay > 0) {
          $("#totalNotPay").html(notpay);
        }
        else {
          $("#totalNotPay").html("0");
        }
      });
}

