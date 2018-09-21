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
      var unitno = (document.getdataform.id.value).substring(0, 5);
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
                console.log(result)
            else
                console.error(error);
        });

}