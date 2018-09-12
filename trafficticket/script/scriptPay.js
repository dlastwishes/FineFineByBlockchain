
var urlParams = new URLSearchParams(window.location.search);
var trafficno = urlParams.get("id");
var fineno = urlParams.get("fine");

$("#trafficNo").html(trafficno);
$("#fine").html(fineno);
 
 
       if (typeof web3 !== 'undefined') {

         web3 = new Web3(web3.currentProvider);
		 console.log("existing web3: provider " + web3);
		 
      }
	  
	  else {
            web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/g5rWkSjjhx1LPmDch30E"));
			console.log("new provider " + typeof web3);
        }


		web3.eth.defaultAccount = web3.eth.accounts[0];
		
		if(web3.isConnected()){
			
	var payTrafficContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_trafficNo","type":"string"}],"name":"getPayerTraffic","outputs":[{"name":"","type":"address"}]
	,"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[]
	,"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"}
	,{"constant":true,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}]
	,"payable":false,"stateMutability":"view","type":"function"},{"constant":true
	,"inputs":[{"name":"_trafficNo","type":"string"}],"name":"isPay","outputs":[{"name":"","type":"bool"}]
	,"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_trafficNo"
	,"type":"string"}],"name":"payFine","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"}]);
	
	var payTraffctAddr = "0x853Fda2672bdC1722e269614a07698732F56b0A7";

var payticket = payTrafficContract.at(payTraffctAddr);


				function pay() {
					payticket.payFine.sendTransaction(  
					trafficno
					, { from: web3.eth.accounts[0] , value : web3.toWei(fineno, "ether")} 
					, function(error, result){
					 if(!error)
						 console.log(result)
					 else
						 console.error(error);
				 });
					
		}
		
		}
		
	
		
		else {
					console.log('not connect');
					$("#trafficNo").html("it error");
		}
		
		