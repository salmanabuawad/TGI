const { spawn } = require('child_process');
const helpers = require('./helpers');

const tasks = new Map();

function launchJob(params,retryOnFailure) {
  const args=JSON.parse(JSON.stringify(params));
  const valuesArray = Object.values(args); 
  const proc = spawn(valuesArray[0], valuesArray.slice(1), {
    cwd: 'resources',
    detached: true,
    shell: true
  });

  proc.on('exit', (code, signal) => {
    helpers.updateJobStatExitCode(proc.pid,code,retryOnFailure);
    if(retryOnFailure && code==1)
    {
      launchJob(params,false);
    }
  });

  proc.on('close', (code, signal) => {
    helpers.updateJobStatExitCode(proc.pid,code,retryOnFailure);
  });
  
 
  proc.unref();

  tasks.set(proc.pid, {
    pid: proc.pid,
    command: `${valuesArray[0]} ${valuesArray.join(' ')}`,
    started: new Date(),
  });


  helpers.addJobStats(proc.pid, valuesArray[0], valuesArray, new Date());
  return proc.pid;

}


module.exports = {
  launchJob
}
