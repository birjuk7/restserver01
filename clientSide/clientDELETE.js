const request =require('request');
var payload={
    device_ID:"17",
    device_Type:"Hiiii"
}

var connOpt={
    url:"http://192.168.77.88:3000/device",
    method:'DELETE',
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
