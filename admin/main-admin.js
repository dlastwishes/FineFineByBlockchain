var urlParams = new URLSearchParams(window.location.search);
var username = urlParams.get('username');
var user = web3.toUtf8(username);
var unitNo = urlParams.get('unitno');
var uno = web3.toUtf8(unitNo);

goToStation = () => { window.location.replace("./admincreate-new-station.html?username=" + username + "&unitno=" + unitNo); }
goToOfficer = () => { window.location.replace("./adminmanage.html?username=" + username + "&unitno=" + unitNo); }
logout = () => { window.location.replace("./index.html"); }

searchUnit = () => {
    officer.getUnitInfo($("#unitno").val() , (error , result ) => {
        if(!error){
            if(!result[0] == ""){
                if(!$("#unitno").val() == ""){
                    window.location.replace("./view-station.html?username=" + username + "&unitno=" + unitNo+"&searchUnit="+$("#unitno").val());
                }
                else{
                    alert("ไม่พบข้อมูลสถานีตำรวจ");
                }
            }
            else {
                alert("กรุณากรอกรหัสสถานี");
            }
        }
    });
}

showOfficer = () => {
    officer.getUnitByOfficer($("#username").val(), (error, res) => {
        if (!error) {
            if (res != "") {
                if ($("#username").val() == user) {
                    alert('ไม่สามารถแก้สิทธิ์ของตัวเองได้');
                }
                else {
                    let stationid = res;
                    officer.getUnitInfo(stationid , (error , result ) => {
                        if(!error){
                            let station = result[0];
                            officer.getOfficerInfo(stationid, $("#username").val(), (error, result1) => {
                                if (!error) {
                                    let name = result1;
                                    officer.getPermission($("#username").val(), (error, res) => {
                                        if (!error) {
                                            let show = "";
                                            show += "<div class='col-md-12'><div class='card'><div class='card-header card-header-info'><h4 class='card-title'>ข้อมูลเจ้าหน้าที่</h4></div><div class='card-body'><form><div class='row'><div class='col-md-2'><div class='form-group'><label class='bmd-label-floating'><font size='4'>ชื่อผู้ใช้ : </font></label></div></div><div class='col-md-9'><div class='form-group'><input type='text' class='form-control' value='" + $("#username").val() + "' disabled></div></div></div><div class='row'><div class='col-md-2'><div class='form-group'><label class='bmd-label-floating'><font size='4'>ชื่อ-นามสกุล : </font></label></div> </div><div class='col-md-9'><div class='form-group'><input type='text' class='form-control' id='name' value='" + name + "' disabled></div></div></div><div class='row'><div class='col-md-2'><div class='form-group'><label class='bmd-label-floating'><font size='3'>ชื่อสถานีตำรวจ : </font></label></div></div><div class='col-md-9'><div class='form-group'><input type='text' id='station' value='" + station + "' class='form-control' disabled></div></div></div>"
                                            if (res) {
                                                show += "<button type='button' onclick='disPermis()' class='btn btn-danger pull-right'>ยกเลิกสิทธิ์เจ้าหน้าที่</button><div class='clearfix'></div></form></div></div></div>"
                                            }
                                            else {
                                                show += "<button type='button' onclick='setPermis()' class='btn btn-info pull-right'>ให้สิทธิ์เจ้าหน้าที่</button><div class='clearfix'></div></form></div></div></div>"
                                            }
                                            $("#officer-info").html(show);
                                        }
                                    })
                                }
        
                            });
                        }
                    });
              
                }
            }
            else {
                alert('ไม่พบข้อมูล');
            }
        }
    });
}

setPermis = () => {
    officer.newPermission($("#username").val(), (error, res) => {
        if (!error) {
            alert('ได้รับสิทธิ์แล้ว');
        }
        else {
            alert('เกิดข้อผิดพลาด');
        }
    })
}

disPermis = () => {
    officer.disPermission($("#username").val(), (error, result) => {
        if (!error) {
            alert('ยกเลิกสิทธิ์แล้ว');
        }
        else {
            alert('เกิดข้อผิดพลาด');
        }
    })
}

newUnit = () => {

    officer.addUnit($("#stationid").val(), $("#stationname").val(), $("#stationaddr").val()
        , $("#stationtel").val(), $("#stationzipcode").val(), (error, result) => {
            if (!error) {
                let username = Math.random().toString(36).substring(7);
                let passtemp = Math.random().toString(36).substring(7);

                officer.newOfficer.sendTransaction(
                    $("#stationid").val()
                    , username
                    , passtemp
                    , "user temp"
                    , function (error, result) {
                        if (!error) {
                            $("#usertemp").html(" <div class='card'> <div class='card-header card-header-warning'><h4 class='card-title'>ข้อมูลชั่วคราวสำหรับเข้าใช้งานสถาน</h4></div> <div class='card-body'><form> <div class='row'> <div class='col-md-2'><div class='form-group'><label class='bmd-label-floating'><font size='3'>ชื่อผู้ใช้ชั่วคราว  : </font></label></div></div><div class='col-md-4'><div class='form-group'><input type='text' class='form-control' id='usernametemp' value='"+username+"' disabled></div></div><div class='col-md-1.5'><div class='form-group'><label class='bmd-label-floating'><font size='3'>รหัสผ่านชั่วคราว  : </font></label></div></div><div class='col-md-4'><div class='form-group'><input type='text' class='form-control' id='passtemp' value='"+passtemp+"' disabled></div></div></div></form></div></div>");
                        }
                        else {
                            alert("การสร้างใบสั่งผิดพลาด");
                            console.log(result + error)
                        }
                    });

                alert('เพิ่มสถานีตำรวจใหม่เสร็จสมบูรณ์');
            }
        });
}
