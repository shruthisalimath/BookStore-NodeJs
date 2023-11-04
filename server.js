//import express
const express = require('express');
const cors = require('cors');//imported CORS middleware to enable CORS for API routes

//setting up express to create an app
const app = express();

//enabling CORS for all routes 
app.use(cors());

//configure to parse requests with JSON payloads
app.use(express.json());

//datastorage in memory
let jobPosting = [];
let jobId = 1; //initialize to generate unique ID
const users =[
    { username: "John" , password:"John123" },
    { username: "Scott" , password:"Scott123"},
    { username: "Kevin" , password:"Kevin123"}
]


//creat a post for login
app.post('/auth',(req,res) => {
    const { username, password } = req.body;

    //check if username and password match
    const user = users.find(user => user.username === username && user.password === password);

    if(!user) {
        res.status(401).json({message: "Invalid Username and Password please try again!!"});
    } else {
        res.status(200).json({ message:"Successful Login!!", username});
    }
});

//get login 
app.get('/login', (req,res) => {
    res.json(users);
});

//get specific username
app.get('/login/:username', (req,res) => {
    const loggedInUser = users.find(loggedInUser => loggedInUser.username === req.params.username);
    if(!loggedInUser){
        res.status(404).json({ error: 'User not found!!'});
    } else {
        res.status(200).json(loggedInUser);
    }
});

//Create a job posting
app.post('/jobs', (req, res ) => {
    // let foundMatch = false;
    // for (let i = 0; i < jobPosting.length ; i++) {
    //     if (jobPosting[i].Title == req.body.Title 
    //         && jobPosting[i].Description == req.body.Description) {
    //         foundMatch = true;
    //         break;
    //     }
    // }
    // if (foundMatch) {
    //     res.status(400).json({ error: 'Job already exist with same title and description' }); 
    // }
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
    if(!jobs) {
        res.status(404).json({ error: 'Job not found' });
    } else {
        res.json(jobs);
    }
});

// //get a single job posting by ID
// app.get('/v2/jobs/:id', (req,res) => {
//     const job = jobPosting.find((j) => j.id === parseInt(req.params.id));
//     if(!job) {
//         res.status(404).json({ error: 'Job not found' });
//     } else {
//         const jobV2 = { "id": job.id, "Title": job.Title};
//         res.json(jobV2);
//     }
// });

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
const PORT = process.env.PORT || 5001;
//starts server to begin listening
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});
