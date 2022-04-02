const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log("This is the master process", process.pid);
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  console.log("this is the worker process", process.pid);
}
