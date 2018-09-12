

var urlParams = new URLSearchParams(window.location.search);
var trafficNo = urlParams.get('id');
var personno = urlParams.get('pers_No');
var input = urlParams.get('inputtext');
console.log(trafficNo);
console.log(personno);
console.log(input);

var urlParams = new URLSearchParams(window.location.search);
var trafficno = urlParams.get("id");
var fineno = urlParams.get("fine");

$("#trafficNo").html(trafficno);
$("#fine").html(fineno);

	
	if (typeof web3 !== 'undefined') {
					  web3 = new Web3(web3.currentProvider);
			console.log("existing web3: provider " + web3);
      }
		else{
			 web3 = new Web3(new Web3.providers.HttpProvider("http://52.77.251.182:8545"));
			console.log("new provider " + typeof web3);
		}
		

		
     
		web3.eth.defaultAccount = web3.eth.accounts[0];
		if(web3.isConnected()){
				document.writeln("<script type='text/javascript' src='getdatascript.js'></script>");
		}
		
	
		
		else {
					console.log('not connect');
					$("#trafficNo").html("it error");
		}
		
		document.writeln("<script type='text/javascript' src='scriptside.js'></script>");
		
		