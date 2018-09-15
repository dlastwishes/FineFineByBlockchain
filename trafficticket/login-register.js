

function login(){
	 shakeModal();
    var Web3 = require('web3');

    if (typeof web3 !== 'undefined') {

      web3 = new Web3(web3.currentProvider);
      console.log("existing web3: provider " + web3);
      web3.eth.defaultAccount = web3.eth.accounts[0];
    }

    else {

      web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/g5rWkSjjhx1LPmDch30E"));
      console.log("new provider " + typeof web3);

    }

    console.log(web3.isConnected());

    if (web3.isConnected()) {

      var officerContract = web3.eth.contract();
      var officerAddr = "";
      var officer = officerContract.at(officerAddr);

    } else {
      console.log('not connect');
    }
	
    
}

function shakeModal(){
    $('#loginModal .modal-dialog').addClass('shake');
             $('.error').addClass('alert alert-danger').html("Invalid email/password combination");
             $('input[type="password"]').val('');
             setTimeout( function(){ 
                $('#loginModal .modal-dialog').removeClass('shake'); 
    }, 1000 ); 
}

   