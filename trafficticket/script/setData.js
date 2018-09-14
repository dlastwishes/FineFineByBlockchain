
if (typeof web3 !== 'undefined') {

         web3 = new Web3(web3.currentProvider);
		 console.log("existing web3: provider " + web3);
		 web3.eth.defaultAccount = web3.eth.accounts[0];
      }
	  
	  else {
	  
            web3 = new Web3(new Web3.providers.HttpProvider("http://54.169.141.255:8545"));
			console.log("new provider " + typeof web3);

        }
	

		
		console.log(web3.isConnected());
		
		if(web3.isConnected()){
			
		var TrafficConstract = web3.eth.contract([{"constant":false,"inputs":[{"name":"charge","type":"string"},{"name":"placeOfIncident","type":"string"},{"name":"speedDetection","type":"string"},{"name":"amountOfFine","type":"uint256"}],"name":"setReport_case","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"new_conv_personNo","type":"string"},{"name":"new_conv_na","type":"string"},{"name":"new_conv_tel","type":"string"},{"name":"new_conv_addr","type":"string"}],"name":"editConvey","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"new_charge","type":"string"},{"name":"new_placeOfIncident","type":"string"},{"name":"new_speedDetection","type":"string"},{"name":"new_amountOfFine","type":"uint256"}],"name":"editReportCase","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"conv_persNo","type":"string"},{"name":"_plate","type":"string"},{"name":"conv_na","type":"string"},{"name":"conv_tel","type":"string"},{"name":"conv_addr","type":"string"}],"name":"setConveyanceOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"destroyAllTrafficTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"},{"name":"_personalid","type":"string"}],"name":"getReporter","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"trafficID","type":"string"}],"name":"newTrafficTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"trafficNo","type":"string"},{"name":"officerNo","type":"string"}],"name":"destroyTrafficTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"},{"name":"_personalid","type":"string"}],"name":"getReportCase","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"string"},{"name":"new_re_name","type":"string"},{"name":"new_re_unit","type":"string"},{"name":"new_re_addr","type":"string"},{"name":"new_re_tel","type":"string"},{"name":"new_re_zipcode","type":"string"}],"name":"editReporter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"string"},{"name":"_personalid","type":"string"}],"name":"getConveyance","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"re_name","type":"string"},{"name":"re_unit","type":"string"},{"name":"re_addr","type":"string"},{"name":"re_tel","type":"string"},{"name":"re_zipcode","type":"string"}],"name":"setReporter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
		
		var contractAddr = "0xbE94b2c5D291674871e3864296248A03ec7680b5";
		
		
		 var traffic = TrafficConstract.at(contractAddr);
		
		 traffic.getConveyance( trafficNo , personno , function(error, result)
	{
            if(!error)
                {
					console.log(result);

					$("#data").html(result[0] + "/" + result[1] + "/" + result[2] + "/" +result[3] + "/" + result[4]);
                }
            else
			
                console.error(error);
				
        });

								$("#button").click(
								function() {
								
									 traffic.setReport_case.sendTransaction(  $("#charge").val()  ,  $("#placeofincident").val()  ,  $("#speeddetection").val()   , $("#amountfine").val() 
								  ,{from: web3.eth.accounts[0], gas: 3000000} , function(error, result){
							 if(!error)
								 console.log(result)
							 else
								 console.error(error);
						 });
								 
									traffic.setReporter.sendTransaction(  $("#rep_name").val()  ,  $("#rep_unit").val()  ,  $("#rep_address").val()  
									,  $("#rep_tel").val()  ,  $("#rep_zipcode").val() ,{from: web3.eth.accounts[0] , gas: 3000000} ,  function(error, result){
													if(!error)
														console.log(result)
														 else
															 console.error(error);
													 });
								
								traffic.setConveyanceOwner.sendTransaction( $("#conv_personid").val() 
								, $("#conv_plate").val() , $("#conv_name").val()  ,  $("#conv_tel").val() 
								,  $("#conv_addr").val() , {from: web3.eth.accounts[0], gas: 3000000} , function(error, result){
													 if(!error)
														 console.log(result);
													 else
														 console.error(error);
						 } );
							
								
								}
								);
								

								$("#newticket").click(
								function () {
								 
									traffic.newTrafficTicket.sendTransaction( $("#trafficTicketNo").val(), {from: web3.eth.accounts[0], gas: 3000000} 
									, function(error, result){
													 if(!error)
														 console.log(result);
													 else
														 console.error(error);
						 });
								}
								
								);
								
								$("deleteticket").click(
									function () {
									
									
									}
								
										);
								
		}
		
	
		
		else {
					console.log('not connect');
					$("#trafficNo").html("it error");
		}
   	