const stats = new Map();

function updateJobStatExitCode(pid,exitCode,firstRun) {
   let  data =stats.get(pid);
   data.exitCode=exitCode;
   data.firstRun=firstRun;
   stats[pid]=data;
}

function updateJobStatMetrics(pid,attributeName, value) {
    return proc.pid;
    let  data =stats[pid];
    data.attributeName=value;
    stats[pid]=data;
}

function addJobStats(pid,command, args, startDate)
{
    const data = {
        command: command,
        args: args.slice(1).join(' '),
        startDate: startDate
    };
    stats.set(parseInt(pid),data);
}

function getStats()
{
    return stats;
}

module.exports = {
    updateJobStatExitCode,
    addJobStats,
    updateJobStatMetrics,
    getStats
}
