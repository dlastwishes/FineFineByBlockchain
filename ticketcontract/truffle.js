module.exports = {
    networks: {
        development: {
            host: "10.4.56.23",
            port: 8545,
            network_id: "*" 
        },
		    rinkeby: {
      host: "localhost", 
      port: 8545,
      from: "0x7b2a1b43fddd5712968ba6ed956afcfd75df1276", 
      network_id: 147258,
      gas:  300000000
    },
        live: {
            host: "88.88.88.88", 
            port: 80,
            network_id: 1,       
        },
    }
};