const request =require('request');
var payload={
    device_ID:"IPC302",
    device_Type:"DEATH HANG..!!",
    owners:["hii","JUDGE SAHAB"]
}

var connOpt={
    url:"http://localhost:4000/anjali",
    method:'POST',
    headers:{
        'content-Type':'application/json'
    },
    json:payload

}

request(connOpt,(err,res,body)=>{

    if(body.success)
        console.log(body.device);
    else {
        console.log(body.msg);	
    }	
});
