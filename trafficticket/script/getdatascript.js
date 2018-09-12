				
		var TrafficConstract = web3.eth.contract([{"constant":false,"inputs":[],"name":"destroyTrafficTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"new_conv_personNo","type":"string"},{"name":"new_conv_na","type":"string"},{"name":"new_conv_tel","type":"string"},{"name":"new_conv_addr","type":"string"}],"name":"editConvey","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"new_charge","type":"string"},{"name":"new_placeOfIncident","type":"string"},{"name":"new_speedDetection","type":"string"},{"name":"new_amountOfFine","type":"uint256"}],"name":"editReportCase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"new_re_name","type":"string"},{"name":"new_re_unit","type":"string"},{"name":"new_re_addr","type":"string"},{"name":"new_re_tel","type":"string"},{"name":"new_re_zipcode","type":"string"}],"name":"editReporter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trafficID","type":"string"}],"name":"newTrafficTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"name","type":"string"}],"name":"searchTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"conv_persNo","type":"string"},{"name":"_plate","type":"string"},{"name":"conv_na","type":"string"},{"name":"conv_tel","type":"string"},{"name":"conv_addr","type":"string"}],"name":"setConveyanceOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"charge","type":"string"},{"name":"placeOfIncident","type":"string"},{"name":"speedDetection","type":"string"},{"name":"amountOfFine","type":"uint256"}],"name":"setReport_case","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"re_name","type":"string"},{"name":"re_unit","type":"string"},{"name":"re_addr","type":"string"},{"name":"re_tel","type":"string"},{"name":"re_zipcode","type":"string"}],"name":"setReporter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"},{"name":"_personalid","type":"string"}],"name":"getConveyance","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"},{"name":"_personalid","type":"string"}],"name":"getReportCase","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"},{"name":"_personalid","type":"string"}],"name":"getReporter","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]);
		var contractAddr = "0xB2d35F1052EF8dD1e117f0fB50584D3251A4cae2";

 var traffic = TrafficConstract.at(contractAddr);

        console.log(traffic);
		
				 traffic.getConveyance( trafficNo , personno  , function(error, result)
	{
            if(!error)
                {
					console.log(result);

					$("#convey_personid").html(result[0]);
                    $("#convey_plate").html(result[1]);
					$("#convey_name").html (result[2]);
					$("#convey_tel").html (result[3]);
					$("#convey_addr").html(result[4]);
                }
            else {
				
				alert ("ไม่พบข้อมูลใบสั่ง หรือ QR Code ผิดพลาด");
				window.location.replace("index.html");
                console.error(error);
			}
				
				
        });
		
		traffic.getReporter( trafficNo , personno  , function(error, result1)
	{
            if(!error)
                {
					console.log(result1);
                    $("#reporter_name").html(result1[0]);
					$("#reporter_unit").html(result1[1]);
					$("#reporter_addr").html(result1[2]);
					$("#reporter_tel").html(result1[3]);
					$("#reporter_zipcode").html(result1[4]);
                }
            else
                console.error(error);
				
        });
		
		 traffic.getReportCase(trafficNo , personno   , function(error, result2)
	{
            if(!error)
                {
					console.log(result2);
					$("#reportcase_trafficNo").html(trafficNo);
                    $("#reportcase_charge").html(result2[0] );
					$("#reportcase_place").html(result2[1]);
					$("#reportcase_speed").html(result2[2]);
					$("#reportcase_fine").html(result2[3]+'');
					compare();
                }
            else
                console.error(error);
				
        });		
		
		function compare() {
		fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=THB')
		.then((result) => { return result.json() })
		.then((data) => {
				let res = data.THB;
				let fine = document.getElementById('reportcase_fine').innerHTML ;
				$("#fine").html(fine/res);
				setPayData();
		});
		
}

	function setPayData(){
					let ticketno = document.getElementById("reportcase_trafficNo").innerHTML;
			let fine = document.getElementById("fine").innerHTML;

			$("#traffic-no").val(ticketno);
			$("#fine-no").val(fine);


	}
	


		
		
		
			
	
		
	

			