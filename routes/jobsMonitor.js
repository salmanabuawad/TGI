"use strict";
const express = require("express");
let router = express.Router();
const bodyParser = require('body-parser');
const urlencode = require('urlencode');
const jobExecuter = require('../jobExecuter');
const helpers = require('../helpers');
const metricGenerator = require('../metricGenerator');



router
    .route("/jobs")
    .get((req, res) => {
		res.setTimeout(800000);
        getJobList(req.query,res);
    });

router
	.route("/jobs")
    .post((req, res) => {
		res.setTimeout(120000);
		runJob(req.body,res);
    });

router
.route("/stats")
.get((req, res) => {
	res.setTimeout(120000);
	getStats(req.query,res);
});

async function runJob(params,res) {
	let myJobId = jobExecuter.launchJob(params,true); 
	let data ={
		meassge: "Job Submitted Successfully",
		JobId : myJobId
	}
	res.send(JSON.stringify(data));
}

async function getJobList(params,res)
{
	let jsonResult=[]; 
	let rawData =helpers.getStats();
	rawData.forEach((job) => {
		let raw =new Map();
		raw.set('jobCommand',job.command+ " "+job.args);
		let status="";
		if(job.exitCode == "0"){
			if(job.firstRun)
				status= "Completed";
			else
				status="Retried Successfully";
		}
		else if(job.exitCode == "1")
			status= "Crashed";
		else
			status="Running";

		raw.set('status', status);

		
		jsonResult.push(map_to_object(raw));

});

	let data =JSON.stringify(jsonResult);
	res.send(data);
}

async function getStats(params,res)
{
	let data =metricGenerator.analyzeData(helpers.getStats());
	res.send(JSON.stringify(data));
}

function map_to_object(map) {
    const out = Object.create(null)
    if(map)
	{
		map.forEach((value, key) => {
			if (value instanceof Map) {
				out[key] = map_to_object(value);
			}
			else {
				out[key] = value;
			}
		})
		return out;
	}
	return "{}";
}

module.exports = router;
