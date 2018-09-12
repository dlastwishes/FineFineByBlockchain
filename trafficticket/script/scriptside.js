

       if (typeof web3 !== 'undefined') {

      }
		
            web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/g5rWkSjjhx1LPmDch30E"));
			console.log("new provider " + typeof web3);
        
	
		if(web3.isConnected()){
			
					var payTrafficContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_trafficNo","type":"string"}],"name":"payFine","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_trafficNo","type":"string"}],"name":"getPayerTraffic","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_trafficNo","type":"string"}],"name":"isPay","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]);	var payTraffctAddr = "0xcc2a5be3E61e8a6D24B4947Fc67C825dCc7a37A9";
					var payTraffctAddr = "0x853Fda2672bdC1722e269614a07698732F56b0A7";
					
					var payticket = payTrafficContract.at(payTraffctAddr);
					
					console.log(payticket);
					console.log(trafficNo);
					
					payticket.isPay(trafficNo , function (error , result3)
							{
								if(!error){	
								console.log(result3);
									if(result3){
										$("#status").html('Paid');
										document.getElementById("bt-pay").disabled = true;
									}
									else {
										$("#status").html('Not Pay');
									}
								}
								else {
									console.log(error);
								}
							});
	
	
		}
		
	
		
		else {
					console.log('not connect');
					$("#trafficNo").html("it error");
		}
		
		