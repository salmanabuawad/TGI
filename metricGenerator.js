function analyzeData(stats) {
     
  
    let totalJobs=0;
    let totalSuccess=0;
    let totalFailure=0;
    stats.forEach((job) => {
		totalJobs++;
        if(job.exitCode == "0")
            totalSuccess++;
        else
            totalFailure++;
    });
  
    let data= new Map();
    data.set("totalJobs",totalJobs);
    let overalSuccessRate=totalSuccess/totalJobs;
    data.set("overallSuccessRate",overalSuccessRate.toFixed(2)+"%");
    let debugMetric =calcluateJobsbyType(stats,"debug",overalSuccessRate);
    let threadMetric =calcluateJobsbyType(stats,"thread",overalSuccessRate);
    let databaseMetric=calcluateJobsbyType(stats,"db",overalSuccessRate);
    let patterns = [];
    patterns.push(debugMetric);
    patterns.push(threadMetric);
    patterns.push(databaseMetric);
    data.set("patterns",patterns)
    
    return map_to_object(data);
}

function calcluateJobsbyType(stats,type,overalSuccessRate)
{
    let successCount=0;
    let failCount=0;
     stats.forEach((job) => {
		if (job.command.indexOf(type) !== -1 || job.args.indexOf(type) !== -1) {
           if(job.exitCode == "0")
                successCount++;
            else
                failCount++;
        }
    });
    let data =new Map();
    data.set("pattern","Jobs with "+type+" characteristics");
    data.set("matchCount",successCount+failCount);
    let successRate=successCount/(successCount+failCount);
    successRate=successRate.toFixed(2);
    data.set("successRate",successRate+"%");
    let differenceFromAverage = successRate-overalSuccessRate;
    differenceFromAverage=differenceFromAverage.toFixed(2);
    let formatedDifference= differenceFromAverage >0? "+"+differenceFromAverage:differenceFromAverage;
    data.set("differenceFromAverage", formatedDifference+"%")
    return map_to_object(data);

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

module.exports = {
  analyzeData
}

