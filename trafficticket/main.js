var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
var user = web3.toUtf8(username);
var unitNo = urlParams.get('unitno');
var uno = web3.toUtf8(unitNo);
var tableCode = "";
var index = 0;
var page = 30;
var key = 0;
var totalTicket = 0;
var persno = urlParams.get('persno');
var ticketno = urlParams.get('ticketno');

goToDashboard = () => { window.location.replace("./dashboard.html?username=" + username + "&unitno=" + unitNo); }
goToCreateTicket = () => { window.location.replace("./create-tf-office-info.html?username=" + username + "&unitno=" + unitNo); }
goToUserProfile = () => { window.location.replace("./user.html?username=" + username + "&unitno=" + unitNo); }
logout = () => { window.location.replace("./index.html"); }

JSalert = (textshow, choice) => {
    swal({
        title: textshow,
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                if (choice == 1) {
                    submitReporter();
                }
                else if (choice == 2) {
                    submitOffender();
                }
                else if (choice == 3) {
                    submitConveyance();
                }
                else if (choice == 4) {
                    newTicket();
                }
                else if (choice == 5) {
                    editReportcase()
                }
                else if (choice == 6) {
                    editConvey()
                }
                else if (choice == 7) {
                    deleteTicket();
                }
                else if (choice == 8) {
                    if ($("#pass").val() == $("#repass").val()) {
                        newOfficer();

                    }
                    else {
                        swal("รหัสผ่านไม่ตรงกัน", "", "error");
                    }
                }
            }
            else {
                swal("ยกเลิกเรียบร้อย", "", "error");
            }
        });
}

editUser = () => {
    officer.editOfficer.sendTransaction(user, $("#officername").val(), (error, result) => {
        if (!error) {
            alert('แก้ไขข้อมูลเสร็จสิ้น');
            location.reload();
        }
        else {
            alert("การแก้ไขผิดพลาด");
            console.log(error);
        }
    });
}

editReportcase = () => {
    traffic.editReportCase.sendTransaction(
        uno
        , ticketno
        , $("#charge").val()
        , $("#place").val()
        , $("#speed").val()
        , $("#fine").val()
        , $("#description").val()
        // , {gas : 30000000}
        , function (error, result) {
            if (!error) {
                location.reload();
            }
            else {
                alert("การแก้ไขผิดพลาด");
                console.log(error);
            }
        });
}

editConvey = () => {
    traffic.editConvey.sendTransaction(
        uno
        , ticketno
        , $("#persno").val()
        , $("#plate").val()
        , $("#conveyname").val()
        , $("#conveytel").val()
        , $("#conveyaddr").val()
        // , {gas : 30000000}
        , function (error, result) {
            if (!error) {
                location.reload();
            }
            else {
                alert("การแก้ไขผิดพลาด");
                console.log(error);
            }
        });
}

submitReporter = () => {
    traffic.setReporter(
        document.getElementById("nameOfficer").textContent
        , uno
        // , {gas : 30000000}
        , function (error, result) {
            if (!error) {

                traffic.getReporterPoint(unitNo, (error, res) => {
                    if (!error) {
                        let reporter = parseInt(res.c[0]) + 1;
                        window.location.replace("./create-tf-offender-info.html?username=" + username + "&unitno=" + unitNo + "&reporter=" + reporter);
                    }
                })
            }
            else {
                alert("เพิ่มข้อมูลผิดพลาด");
                console.log(error);
            }
        });
}

submitConveyance = () => {
    traffic.setConveyanceOwner(
        uno
        , $("#personalNo").val()
        , $("#plateNo").val()
        , $("#conv_name").val()
        , $("#conv_tel").val()
        , $("#conv_addr").val()
        // , {gas : 300000000}
        , function (error, result) {
            if (!error) {
                traffic.getConveyancePoint(uno, (error, res) => {
                    if (!error) {
                        let conveyNo = parseInt(res.c[0]) + 1;
                        window.location.replace("./confirm-to-createtf.html?username=" + username + "&unitno=" + unitNo + "&reporter=" + reporter + "&offenderNo=" + offenderNo + "&convNo=" + conveyNo);
                    }
                })
            }
            else {
                alert("เพิ่มข้อมูลผิดพลาด");
                console.log(error);
            }
        });
}

getRightnowDate = () => {
    return (getDateData(0));
}

getDateData = (delayTimeMonth) => {
    var date = new Date();
    var month = new Array(12);
    month[0] = "มกราคม";
    month[1] = "กุมภาพันธ์";
    month[2] = "มีนาคม";
    month[3] = "เมษายน";
    month[4] = "พฤษภาคม";
    month[5] = "มิถุนายน";
    month[6] = "กรกฎาคม";
    month[7] = "สิงหาคม";
    month[8] = "กันยายน";
    month[9] = "ตุลาคม";
    month[10] = "พฤศจิกายน";
    month[11] = "ธันวาคม";
    var day = date.getDate();
    var year = date.getFullYear() + 543;
    return (day + " " + month[date.getMonth() + delayTimeMonth] + " " + year);
}

getExpired = () => {
    //ค่าที่ระบุตอนเรียกฟังก์ชั่น เป็นค่าในหน่วยเดือน เช่น ค่าปรับหมดอายุใน 1 เดือน ก็จะระบุเป็น 1
    return (getDateData(1));
}

setData = (init, desti) => {

                traffic.getTotalTicketByUnit(uno, (error, result) => {
                    for (let i = init; i < desti; i++) {
                        traffic.getTicketNo(uno, i, (error, result) => {
                            if (!error) {
                                if (result !== "") {
                                    let ticketNo, conveyName;
                                    ticketNo = result;
                                    $("#reportcase_trafficNo" + i).html(ticketNo);
                                    traffic.getTicket(uno, ticketNo, (error, res) => {
                                        if (!error) {
                                            $("#convey_name" + i).html(res[0]);
                                            traffic.getExpired(uno, ticketNo, res[1], (error, result) => {
                                                if (!error) {
                                                    $("#expired" + i).html(result);
                                                }
                                            });
        
                                                payTicket.isPay(ticketNo, (error, result) => {
                                                    if (!error) {
                                                        let status = "";
                                                        if (result) {
                                                            status = "จ่ายแล้ว";
                                                        }
                                                        else {
                                                            status = "ยังไม่จ่าย";
                                                        }
                                                        $("#status" + i).html(status);
                                                    }
                                                });
            
                                            } else {
                                                console.log('not connect');
                                            }
            
                                    });
                                }
                            }
                        });
                    }
                })

}

createDataTable = (init, desti) => {

                traffic.getTotalTicketByUnit(uno, (error, result1) => {
                    if (!error) {
                        totalTicket = result1.c[0];
                        page += 5;
                
                        for (let i = init; i < desti; i++) {
                            traffic.getTicketNo(uno, i, (error, res) => {
                                if (!error) {
                                    if (res !== "") {

                                            payTicket.isPay(res, (error, result12) => {
                                                if (!error) {

                                                    traffic.getTicket(uno, res, (error, result) => {
                                                        if (!error) {
                                                            console.log("person " + result);
                                                            tableCode += "<tr style='text-align: center'>"
                                                            tableCode += " <td> <label>" + res + "</label>  </td> <td> <label id='convey_name" + i + "'> </label> </td> <td> <label id='status" + i + "'> </label> </td> <td> <label id='expired" + i + "'> </label> </td>"
                                                            tableCode += "<td><a href='view-tf.html?username=" + username + "&unitno=" + unitNo + "&ticketno=" + res + "&persno=" + result[1] + "'> <button type='button' rel='tooltip' title='ดูใบสั่ง' class='btn btn-danger btn-link btn-sm'> <i class='fa fa-eye'></i></button> </a>"
                                                            if (!result12) {
                                                                tableCode += "<a href='edit-tf.html?username=" + username + "&unitno=" + unitNo + "&ticketno=" + res + "&persno=" + result[1] + "'><button type='button' rel='tooltip' title='แก้ไข' class='btn btn-danger btn-link btn-sm'><i class='material-icons'>edit</i></button></a> </td>"
                                                            }
                                                            tableCode += "</tr>"
                                                            $("#trafficList").html(tableCode);
                                                            key++;
                                                        }
                                                    });
                                                }
                                            });
                
                                        
                
                                    }
                                }
                                index++;
                            });
                        }
                        setData(init, desti);
                    }
                });
}

submitOffender = () => {
    traffic.setReport_case(
        uno
        , $("#chargeInfo").val()
        , $("#placeOfIncident").val()
        , $("#speedDetection").val()
        , $("#fineTotal").val()
        , $("#description").val()
        // , {gas : 300000000}
        , function (error, result) {
            if (!error) {
                traffic.getReportcasePoint(uno, (error, res) => {
                    if (!error) {
                        let offenderNo = parseInt(res.c[0]) + 1;
                        window.location.replace("./create-tf-carnumref-info.html?username=" + username + "&unitno=" + unitNo + "&reporter=" + reporter + "&offenderNo=" + offenderNo);
                    }
                });
            }
            else {
                alert("เพิ่มข้อมูลผิดพลาด");
                console.log(error);
            }
        });
}

checkID = (id) => {
    if (id.length != 13) {
        return false;
    }
    for (i = 0, sum = 0; i < 12; i++)
        sum += parseFloat(id.charAt(i)) * (13 - i); if ((11 - sum % 11) % 10 != parseFloat(id.charAt(12)))
        return false; return true;
}

checkForm = () => {
    if (!checkID(document.getdataform.pers_No.value)) {
        $("#error").html("รหัสบัตรประชาชนไม่ถูกต้อง");
        return false;
    }
    else {
        JSalert()
    }
}

newTicket = () => {
    traffic.getTotalTicketByUnit(uno, (error, res) => {
        if (!error) {
            secondParam = res.c[0] + 1;
            ticketNo = firstParam + secondParam;
            traffic.newTrafficTicket(
                uno
                , parseInt(reporter)
                , parseInt(offender)
                , parseInt(convey)
                , document.getElementById("expiredDate").textContent
                , ticketNo
                // , {gas : 300000000}
                , function (error, result) {
                    if (!error) {
                        window.location.replace("./dashboard.html?username=" + username + "&unitno=" + unitNo);
                    }
                    else {
                        alert("การสร้างใบสั่งผิดพลาด");
                        console.log(error);
                    }
                });

        }
    });

}

generateQR = () => {
    jQuery('#qrcode').qrcode("http://finefine.tk/info.html?id=" + ticketno + "&personalno=" + personalno + "&unitno=" + uno);
}

searchPersonByTicket = () => {
    traffic.searchPersonByTicket(uno, $("#search_ticketinput").val(), (error, res) => {
        if (!error) {
            if (res !== "")
                window.location.replace("./view-tf.html?username=" + username + "&unitno=" + unitNo + "&ticketno=" + $("#search_ticketinput").val() + "&persno=" + res);
            else
                alert("ไม่พบข้อมูลใบสั่ง");
        }
    });
}
