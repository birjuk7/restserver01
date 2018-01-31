const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const mongoose = require('mongoose');
const db = mongoose.connection
mongoose.connect('mongodb://localhost/iotServer');

const Devices = require('./devices');

client.on('connect',function(){
    client.subscribe('getReq');
    client.subscribe('postReq');
    client.subscribe('delReq');
    client.subscribe('putReq');
    // client.subscribe('resFRomServer');
});

client.on('message',function(topic,message){
    
    if(topic=="getReq"){
        console.log("Topic: "+topic+" Message: "+message);
        Devices.getDevice((err,devices)=>{
            console.log("in db function");
            if(err){
                console(err);
                client.publish("resFromServer",JSON.stringify({
                    success:false,
                    type:'GET',
                    msg:"Some Error"
                }));
            }else
            client.publish("resFromServer",JSON.stringify({
                success:true,
                type:'GET',
                devices:devices
            }));
        });
    }
    if(topic=="postReq"){
        console.log("Topic: "+topic+" Message: "+message);
        var Id = message.device_ID;
        Devices.getDevicebyDeviceID(Id,(err,device)=>{
            if (device.length != 0){                
                client.publish("resFromServer",JSON.stringify({
                    success:false,
                    type:'POST',
                    msg:"Device already Present"
                }));
            }else{
                var newDevice = JSON.parse(message);
                Devices.addDevice(newDevice,(err,device)=>{
                    if (err){
                        console.error(err);                        
                        client.publish("resFromServer",JSON.stringify({
                            success:false,
                            type:'POST',
                            msg:"Some Error"
                        }));
                    } else {  
                        console.log("******************************8")
                        console.log(newDevice)                      
                        console.log("******************************8")
                        client.publish("resFromServer",JSON.stringify({
                            success:true,
                            type:'POST',
                            msg:"Device added successfully"
                        })); 
                    }
                });
            }
        })
    }
})