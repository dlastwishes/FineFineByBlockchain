const destiAcc = "";

var urlParams = new URLSearchParams(window.location.search);
var trafficno = urlParams.get('id');
var fine = urlParams.get('fine');
var personno = urlParams.get('personalno');
var unitno = urlParams.get('unitno');

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
      let inputtext = document.getdataform.inputtext.value;
      let personalno = document.getdataform.personalno.value;
      let ticketno = document.getdataform.id.value;
      var unitno = (document.getdataform.id.value).substring(0, 4);
     console.log(unitno);
     $("#unit").html(unitno);
     window.location.replace("./info.html?id="+ticketno + "&personalno=" +personalno+"&unitno="+ unitno);
    }
  }

gotoConfirm = () => {
    var fineTotal = document.getElementById("reportcase_fine").innerHTML;
    window.location.replace("./confirmPayment.html?id="+trafficno + "&personalno=" +personno+"&unitno="+ unitno + "&fine="+fineTotal);
}

goBackFromConfirm = () => {
    window.location.replace("./info.html?id="+trafficno + "&personalno=" +personno+"&unitno="+ unitno);
}

goNextFromConfim = () => {
    let fineETH = document.getElementById("fineETH").innerHTML;
    window.location.replace("./payment.html?id="+trafficno + "&personalno=" +personno+"&unitno="+ unitno+"&fine="+fineETH);
}

compare = () => {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=THB')
        .then((result) => { return result.json() })
        .then((data) => {
            let res = data.THB;
           let fineETH =  parseInt(fine) / res
            setPayData(fineETH);
        });
}

setPayData = (fineETH) => {
    $("#trafficno").html(trafficno);
    $("#fineTHB").html(fine);
    $("#fineETH").html(fineETH);
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

setDataForPayFine = () => { 
    let callFunction = (web3.sha3("payFine(string,string)")+" ").substring(0,10);
    let ticketHex = (web3.toHex(trafficno)+"").substring(2);
    let unitHex = (web3.toHex(unitno)+"").substring(2);
    let splitString1 = "000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000004";
    let splitString2 = "0000000000000000000000000000000000000000000000000000000000000005";
    let ticket = ticketHex + "";
    let unit = unitHex + "";
    for (let i = ticketHex.length; i <64 ; i ++){
        ticket += "0";
    }
    for (let i = unitHex.length; i < 64 ; i++){
        unit += "0";
    }
    let payFineData = callFunction+splitString1+unit+splitString2+ticket;
     return (payFineData);
}

goBackFromPolicy = () => {
    window.location.replace("./info.html?id="+trafficno + "&personalno=" +personno+"&unitno="+ unitno);
}

goToPolicy = () => {
    window.location.replace("./policy.html?id="+trafficno + "&personalno=" +personno+"&unitno="+ unitno);
}

myether = () => {
    let data = setDataForPayFine();
    window.location.replace("https://www.myetherwallet.com/?to="+payTicketAddr+"&value="+fine+"&gasLimit=150000&data="+data+"#send-transaction");
}