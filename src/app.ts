var Service = require('node-linux').Service;
import * as path from 'path' ;

// Create a new service object 
var svc = new Service({
  name:'Hello World',
  description: 'The nodejs.org example web server.',
  script: path.join(__dirname, 'index.ts')
});

// Listen for the "install" event, which indicates the 
// process is available as a service. 
svc.on('install',function(){
  svc.start();
});

svc.install();
