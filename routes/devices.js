var express = require('express');
var router = express.Router();
const Devices = require('../models/devices');
//to add new device if  it is not present 

router.post('/post', (req, res, next) => {      //checking for already existing device
    var newDevice = req.body;
    var Id = newDevice.device_ID;
    Devices.getDevicebyDeviceID(Id,(err,device)=>{
        if (device.length != 0){
            res.json({
                status:false,
                msg:"Device already Present"
            });
        }else{
            Devices.addDevice(newDevice,(err,device)=>{
                if (err){
                    console.error(err);
                    res.json({
                        success: false,
                        msg: "Some Error"
                    });
                } else {
                    res.json({
                        success:true,
                        msg:"Device registered successfully",
                        device:device
                    })
                }
            });
        }
    })
    
});

router.put('/update', (req, res, next) => {           //checking for existance
    var newDevice = req.body;
    console.log(newDevice)
    var Id = newDevice.device_ID;
    Devices.getDevicebyDeviceID(Id,(err,device)=>{
        if (device.length == 0){
            res.json({
                status:false,
                msg:"Device Does Not Exist"
            });
        }else{
            Devices.updateDevice(newDevice,{},(err,device)=>{
                if (err){
                    console.error(err);
                    res.json({
                        success: false,
                        msg: "Some Error"
                    });
                } else {
                    res.json({
                        success:true,
                        msg:"Device updated successfully....",
                        device:device
                    })
                }
            });
        }
});
});

router.delete('/del', (req, res, next) => {           //checking for existance
    var newDevice = req.body;
    var Id = newDevice.device_ID;
    Devices.getDevicebyDeviceID(Id,(err,device)=>{
        console.log(device);
        if (device.length == 0){
            res.json({
                status:false,
                msg:"Device Does Not Exist"
            });
        }else{
            Devices.removeDevice(Id, (err,device)=>{
                if (err){
                    console.error(err);
                    res.json({
                        success: false,
                        msg: "Some Error"
                    });
                } else {
                    res.json({
                        success:true,
                        msg:"Device removed successfully....",
                        device:device
                    })
                }
            });
        }
    });
});


router.get('/get',(req,res,next)=>{
    Devices.getDevice((err,devices)=>{
        console.log(devices);
        if (err){
            console.error(err);
            res.json({
                success:false,
                msg:"Some Error"
            })
        }else{
            res.json({
                success:true,
                devices:devices
            })
        }
    });
});


router.get('/:_id', (req, res) => {
    Devices.getDeviceById(req.params._id, (err, device) => {
      if (err) {
        console.log("Some Error");
        res.send(
          '<h1>Device Not found</h1><h2>Id not registered</h2>'
        );
      } else res.json(device);
    });
  });

router.get('/byDevId/:_id', (req, res,next) => {
    var Id = req.params._id
    Devices.getDevicebyDeviceID(Id, (err, device) => {
        if (err){
            console.error(err);
            res.json({
                success:false,
                msg:"Some Error"
            });
        }else{
            res.json({
                success:true,
                device:device
            });
        }
    })
});
  

module.exports = router;
