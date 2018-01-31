const request=require('request');

var payload={
	"device_ID":"11",
    "device_Type":"raspberry",
    "owners":["hii","hello"]
    
}
var connOpt={
	url: "http://localhost:4000/anjali",
	method:'GET'
}
request(connOpt,(err,res,body)=>{

	console.log(JSON.parse(body));
	 rec=JSON.parse(body);
	 if(rec.success)
		console.log(rec.devices);
	 else {
	 	console.log(rec.msg);		
	 }			
});