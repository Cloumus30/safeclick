const mongoose = require('mongoose');

const cpuDataSchema = new mongoose.Schema({
    cpu_name: {
        type: String,
        required:true,
    },
    type: {
        type: String,
        required:true,
    },
    platform: {
        type: String,
        required:true,
    },
    release: {
        type: String,
        required:true,
    },
    remaining_ram: {
        type: Number,
        required:true,
    },
    total_ram: {
        type: Number,
        required:true,
    },
})

const CpuData = mongoose.model('CpuData',cpuDataSchema);

module.exports={CpuData};