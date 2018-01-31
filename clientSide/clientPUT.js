const request =require('request');
var payload={
    device_ID:"IP302",
    device_Type:"Chinta ta chita chita..!!",
    owners:["chinta ta taa.."]
}

var connOpt={
    url:"http://192.168.77.88:3000/device",
    method:'PUT',
    headers:{
        'content-Type':'application/json'
    },
    json:payload

}

request(connOpt,(err,res,body)=>{
    
    if(body.success){        
        console.log(body.msg);
    }else{            
        console.log(body.msg);	
    }	
});