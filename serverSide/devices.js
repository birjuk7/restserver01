const mongoose = require('mongoose');

const devicesSchema = mongoose.Schema({
    device_ID:{
        type:String,
        required:true
    },
    device_Type:{
        type:String,
        required:true
    },
    create_date:{
        type:Date,
        default:Date.now
    },
    owners:{
        type:Array,
        required:true
    }
});

const Device = module.exports = mongoose.model('Devices', devicesSchema);

module.exports.addDevice = (device, callback) => {
    Device.create(device, callback);
}
module.exports.getDevice = (callback) => {
    Device.find(callback);
}
module.exports.getDeviceById = (id, callback) => {
    Device.findById(id, callback);
}

module.exports.getDevicebyDeviceID = (deviceid, callback) => {
    query={
        device_ID:deviceid
    }

    Device.find(query,callback);
}

module.exports.updateDevice = (device,options,callback)=>{
    query = {
        device_ID: device.device_ID
    }

    var update = {
        device_Type : device.device_Type,
        owners : device.owners
    }

    Device.findOneAndUpdate(query,update,options,callback);
}
module.exports.removeDevice=(deviceId,callback)=> {
    query={
        device_ID: deviceId
    };
    Device.remove(query,callback);
}