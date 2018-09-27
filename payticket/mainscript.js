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

goBackFromPolicy = () => {
    window.location.replace("./info.html?id=" + trafficno + "&personalno=" + personno + "&unitno=" + unitno);
}

goToPolicy = () => {
    window.location.replace("./policy.html?id=" + trafficno + "&personalno=" + personno + "&unitno=" + unitno);
}

myether = () => {
    let data = setDataForPayFine();
    window.location.replace("https://www.myetherwallet.com/?to=" + payTicketAddr + "&value=" + fine + "&gasLimit=150000&data=" + data + "#send-transaction");
}