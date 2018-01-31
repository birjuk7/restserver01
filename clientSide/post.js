const mqtt = require('mqtt');
// const client = mqtt.connect('mqtt://192.168.12.29');
const client = mqtt.connect('mqtt://localhost');

var payload = {
    device_ID: "hiiii",
    device_Type: "kkij",
    owners: ["Hingne","Dhanraj"]
}

client.on('connect',function(){
    client.subscribe('resFromServer');
    client.publish('postReq',JSON.stringify(payload));
});

client.on('message',function(topic,message){
    console.log("Topic: "+topic+" Message: ");
    if(topic == "resFromServer"){
        msg = JSON.parse(message);        
        if(msg.type == 'GET'){
            if(msg.success){
                console.log("Success");
                console.log(msg.devices);
            }else{
                console.log("FAILED");
                console.log(msg.msg);
            }
        }
        if(msg.type == 'POST'){
            if(msg.success){
                console.log("Success");
                console.log(msg);
            }else{
                console.log("FAILED");
                console.log(msg);
            }
        }
    }
});


// var timer = setInterval(function(){
    // var fs = require('fs');
    // var temp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
    // var temp_c = temp/1000;
    // var payload={
    //     name: "Harshayushi",
    //     temp: temp_c
    // }

    // client.on('connect',function(){    
    //     client.publish('/data',JSON.stringify(payload));
    // });
// },2000);
