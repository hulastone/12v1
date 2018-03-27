"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var Service = require('node-linux').Service;
const path = __importStar(require("path"));
// Create a new service object 
var svc = new Service({
    name: 'go3',
    description: 'The server.',
    script: path.join(__dirname, 'index.js')
});
// Listen for the "install" event, which indicates the 
// process is available as a service. 
svc.on('install', function () {
    svc.start();
});
svc.install();
//# sourceMappingURL=app.js.map