This is a solution fot TGI sport job monitor home test.
the solution is based on 3 job characteristics that may affect jobs success or falure during runtime:
1. debug mode
2. multi-thread job
3. job with database connection.

in order to specify the job characteritics for the metric, we check if the name of the job and/or job arguments contain one or more of the 3 keywords: thread, db, debug
if yes then the relevant metric will include the job in calculations
I used this approach, since we are using batch files to simulate c++ programs.

to run the application:
1. run npm install
2. run node app.js

   the system exposes 3 rest api's
   post request http://localhost:3000/jobsMonitor/jobs
     request body example
     {
	    "jobName": "task_with_multi_thread.bat",
      "mode":"debug"
     }
   where jobName options can be one of the 3 batch files under resource folder
   other args are optional
   
   get request http://localhost:3000/jobsMonitor/jobs
   get request http://localhost:3000/jobsMonitor/stats
