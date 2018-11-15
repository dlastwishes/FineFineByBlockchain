const trafficTicket = artifacts.require("trafficTicket");
const officer = artifacts.require("Officer");

function ether(n) {
    return new web3.BigNumber(web3.toWei(n, 'ether'));
}

module.exports = function (deployer, network, accounts) {
    const wallet = accounts[0];

	
	let ticket , officer;
	 deployer.then( () => {
        return trafficTicket.new({from: wallet});
    }).then( (instance) => {
        vault = instance;
        return officer.new({from: wallet});
    }).then((instance) => {
        crowdsale = instance;
        token.transferOwnership(crowdsale.address);
        vault.transferOwnership(crowdsale.address);
        console.log('Token address: ', token.address);
        console.log('Crowdsale address: ', crowdsale.address);
        return true;
    });
	

	};	
	
	