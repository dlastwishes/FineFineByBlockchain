var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
var unitNo = urlParams.get('unitno');
var tableCode = "";
var index = 0;
var page = 30;
var key = 0;
var totalTicket = 0;
var persno = "";
var point = urlParams.get('point');

goToDashboard = () => {
    window.location.replace("./dashboard.html?username=" + username + "&unitno=" + unitNo);
}
goToCreateTicket = () => {
    window.location.replace("./create-tf-office-info.html?username=" + username + "&unitno=" + unitNo);
}
goToUserProfile = () => {
    window.location.replace("./user.html?username=" + username + "&unitno=" + unitNo);
}
logout = () => {
    window.location.replace("./index.html");
}

JSalert = (textshow , choice) => {
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
                if(choice == 1){
                    submitReporter();
                }
                else if (choice == 2){
                    submitOffender();
                }
                else if( choice == 3){
                    submitConveyance();
                }
                else if (choice == 4){
                    newTicket();
                }
                else if( choice == 5){
                    editReportcase()
                }
                else if(choice == 6){
                    editConvey()
                }
                else if(choice == 7){
                    deleteTicket();
                }
            }
            else {
                swal("ยกเลิกเรียบร้อย", "", "error");
            }
        });
}

editReportcase = () => {
    traffic.editReportCase.sendTransaction(
        unitNo
        , ticketno
        , $("#edit_charge").val()
        , $("#edit_place").val()
        , $("#edit_speed").val()
        , $("#edit_fine").val()
        , $("#edit_description").val()
        , function (error, result) {
            if (!error) {
                location.reload(); 
            }
            else {
                alert("การแก้ไขผิดพลาด");
            }
        });
}

editConvey = () => {
    traffic.editConvey.sendTransaction(
        unitNo
        , ticketno
        , $("#edit_persno").val()
        , $("#edit_plate").val()
        , $("#edit_conveyname").val()
        , $("#edit_conveytel").val()
        , $("#edit_conveyaddr").val()
        , function (error, result) {
            if (!error) {
                location.reload();
            }
            else {
                alert("การแก้ไขผิดพลาด");
            }
        });
}


submitReporter = () => {
    traffic.setReporter.sendTransaction(
        document.getElementById("nameOfficer").textContent
        , unitNo
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
            }
        });
}

submitConveyance = () => {
    traffic.setConveyanceOwner.sendTransaction(
      unitNo
      , $("#personalNo").val()
      ,  $("#plateNo").val()
      ,  $("#conv_name").val()
      , $("#conv_tel").val()
      , $("#conv_addr").val()
      , function (error, result) {
        if (!error) {

          traffic.getConveyancePoint(unitNo, (error, res) => {
            if (!error) {

              let conveyNo = parseInt(res.c[0]) + 1;
              window.location.replace("./confirm-to-createtf.html?username=" + username + "&unitno=" + unitNo + "&reporter=" + reporter+"&offenderNo="+offenderNo+"&convNo="+conveyNo);
            }
          })
            }
        else {
            alert("เพิ่มข้อมูลผิดพลาด");
        }
      });
  }

setData = (init, desti) => {

    traffic.getTotalTicketByUnit(unitNo, (error, result) => {

        for (let i = init; i < desti; i++) {

            traffic.getTicketNo(unitNo, i, (error, result) => {
                if (!error) {

                    if (result !== "") {
                        let ticketNo, conveyName;
                        ticketNo = result;
                        $("#reportcase_trafficNo" + i).html(ticketNo);
                        traffic.getTicket(unitNo, ticketNo, (error, res) => {
                            if (!error) {
                                $("#convey_name" + i).html(res[0]);
                                payTicket.isPay(ticketNo, (error, result) => {
                                    if (!error) {
                                        let status = "";

                                        if (result) {
                                            status = "จ่ายแล้ว";
                                        }
                                        else {
                                            status = "ยังไม่จ่าย";
                                        }
                                        console.log(status);
                                        $("#status" + i).html(status);
                                    }
                                })
                            }
                        });
                    }
                }
            });
        }
    })
}


 createDataTable = (init, desti) => {

    traffic.getTotalTicketByUnit(unitNo, (error, result1) => {

        if (!error) {
            totalTicket = result1.c[0];
            $("#totalTicket").html(totalTicket);
            page += 5;
            for (let i = init; i < desti; i++) {

                traffic.getTicketNo(unitNo, i, (error, res) => {

                    if (!error) {
                        if (res !== "") {
                          
                            traffic.getTicket(unitNo, res, (error, result) => {
                                console.log(result);
                                persno = result[1];
                                if (!error) {
                                    tableCode += "<tr style='text-align: center'>"
                                    tableCode += " <td> <label id='reportcase_trafficNo" + i + "'> </label> </td> <td> <label id='convey_name" + i + "'> </label> </td> <td> <label id='status" + i + "'> </label> </td> <td> <label id='ticketDate" + i + "'> Not Available </label> </td>"
                                    tableCode += "<td><a href='edit-tf.html?username=" + username + "&unitno=" + unitNo + "&ticketno=" + res + "&persno=" + persno + "'> <button type='button' rel='tooltip' title='ดูใบสั่ง' class='btn btn-danger btn-link btn-sm'> <i class='fa fa-eye'></i></button> </a></td>"
                                    tableCode += "</tr> "
                                    $("#trafficList").html(tableCode);
                                    key++;
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


login = () => {
    if ($("#username").val() == "" && $("#password").val() == "") {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
    else {
        officer.login($("#username").val(), $("#password").val(), (error, result) => {
            if (!error) {
                if (result[0]) {
                    window.location.replace("dashboard.html?username=" + $("#username").val() + "&unitno=" + result[1]);
                }
                else {
                    alert("เข้าสู่ระบบผิดพลาด");
                }
            }
        });
    }
}

submitOffender = () => {
    let fine = parseInt($("#fineTotal").val());
    traffic.setReport_case.sendTransaction(
        unitNo
        , $("#chargeInfo").val()
        , $("#placeOfIncident").val()
        , $("#speedDetection").val()
        , fine
        , $("#description").val()
        , function (error, result) {
            if (!error) {

                traffic.getReportcasePoint(unitNo, (error, res) => {
                    if (!error) {
                        let offenderNo = parseInt(res.c[0]) + 1;
                        window.location.replace("./create-tf-carnumref-info.html?username=" + username + "&unitno=" + unitNo + "&reporter=" + reporter + "&offenderNo=" + offenderNo);
                    }
                })
            }
            else {
                alert("เพิ่มข้อมูลผิดพลาด");
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

    traffic.getTotalTicketByUnit(unitNo, (error, res) => {
      if (!error) {
        secondParam = res.c[0] + 1;

        ticketNo = firstParam + secondParam;

        traffic.newTrafficTicket.sendTransaction(
            unitNo
          , parseInt(reporter)
          , parseInt(offender)
          , parseInt(convey)
          , ticketNo
          , function (error, result) {
            if (!error) {
              window.location.replace("./dashboard.html?username=" + username + "&unitno=" + unitNo);
            }
            else {
                alert("การสร้างใบสั่งผิดพลาด");
            }
          });

      }
    });

  }
