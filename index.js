require('dotenv').config();
const os = require('os');
const osFreeMem = os.freemem();
const osTotalMem = os.totalmem();
// const allFreeMem = (osFreeMem / (1024 * 1024))
// console.log(`Total free memory: ${allFreeMem}`)


// const avbMem = (osTotalMem / (1024 * 1024))

const express = require('express');
const mongoose = require('mongoose');
const userAgent = require('express-useragent');
const app = express();
const port = process.env.PORT_APP || 3000;

app.use(userAgent.express());

const {CpuData} = require('./model/cpuData');

app.get('/',(req, res) =>{
    res.send('Hello World');
});

app.get('/data',async (req, res)=>{
    const data = await CpuData.find();
    return res.status(200).json(data);
});

app.post('/data', async(req,res)=>{
    const ua = req.useragent;
    const hostname = req.hostname;
    const memory = process.memoryUsage();
    const data = {
        cpu_name : hostname,
        type: ua.os,
        platform : ua.platform,
        release: ua.version,
        remaining_ram: osFreeMem / (1024 * 1024),
        total_ram: osTotalMem / (1024 * 1024),
    }
    const store = await CpuData.create(data);
    
    return res.status(200).json(data);
});


app.listen(port,async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Listen Port ${port}`);    
    } catch (error) {
        console.log(error);
    }
    
})