const express = require('express');
const bodyParser = require('body-parser');
const jobsMonitor = require("./routes/jobsMonitor");


const app = express();
const port = 3000;

// Configuring body parser middleware
app.use(bodyParser.json());

app.use("/jobsMonitor", jobsMonitor);

app.listen(port, () => console.log(`Process Monitor listen port ${port}!`));
