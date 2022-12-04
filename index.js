require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userAgent = require('ua-parser-js');
const app = express();
const port = process.env.PORT_APP || 3000;

const {CpuData} = require('./model/cpuData');

app.get('/',(req, res) =>{
    res.send('Hello World');
});

app.get('/cpu-data',async (req, res)=>{
    const data = await CpuData.find();
   const ua = userAgent(req.headers['user-agent']);
    return res.status(200).json(ua);
});

app.post('/cpu-data', async(req,res)=>{
    var source = req.headers['user-agent'];
    const ua = userAgent.parse(source);
    
    const memory = process.memoryUsage();
    const cpu = process.cpuUsage();
    const data = {
        cpu_name : 'Dana Cpu',
        type: 'Windows',
        platform : 'WIndows 64 bit',
        release: 'kapan"',
        remaining_ram: cpu,
        total_ram:12312321,
    }
    // const store = await CpuData.create(data);
    
    return res.status(200).json(cpu);
});


app.listen(port,async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Listen Port ${port}`);    
    } catch (error) {
        console.log(error);
    }
    
})