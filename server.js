//import express
const express = require('express');

//setting up express to create an app
const app = express();
//configure to parse requests with JSON payloads
app.use(express.json());

//datastorage in memory
let jobPosting = [];
let jobId = 1; //initialize to generate unique ID

//Create a job posting
app.post('/jobs', (req, res ) => {
    const newJob = {id: jobId++, ...req.body };
    jobPosting.push(newJob);
    res.json(newJob);
});

//Read all job postings
app.get('/jobs', (req,res) => {
    res.json(jobPosting);
});

//get a single job posting by ID
app.get('/jobs/:id', (req,res) => {
    const jobs = jobPosting.find((j) => j.id === parseInt(req.params.id));
    if(!jobPosting) {
        res.status(404).json({ error: 'Job not found' });
    } else {
        res.json(jobs);
    }
});

//update job by ID
app.put('/jobs/:id', (req, res) => {
    const updateJob = req.body;
    const index = jobPosting.findIndex((j) => j.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ error: 'job not found' });
    } else {
        jobPosting[index] = {...jobPosting[index], ...updateJob };
        res.json(jobPosting[index]);
    }
});

//Delete a job by ID
app.delete('/jobs/:id', (req, res) => {
    const index = jobPosting.findIndex((j) => j.id === parseInt(req.params.id));
    if (index === -1) { 
    res.status(404).json({ error: 'Job not found!'});
    } else {
        const deleteJob = jobPosting.splice(index, 1)[0];
        res.json(deleteJob);
    }
});

//sets initial port
const PORT = process.env.PORT || 3000;
//starts server to begin listening
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});