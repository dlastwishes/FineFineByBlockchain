var TrafficConstract = web3.eth.contract();
var contractAddr = "";


var traffic = TrafficConstract.at(contractAddr);

traffic.getTotalTicket( (error, result)
   => {
        if(!error) {
            for( let i =0 ; i < result[0] ; i++){
                
            }
        }
            
        else {
            
            alert ("ไม่พบข้อมูลใบสั่งในระบบ");
         
            console.error(error);
        }
            
            
    }).then( () => {

    })