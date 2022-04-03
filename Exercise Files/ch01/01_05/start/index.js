const http = require("http");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log("this is the master process: ", process.pid);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`worker process ${process.pid} has died`);
    console.log((`only ${Object.keys(cluster.workers}).length`));
  });
} else {
  console.log(`started a worker at ${process.pid}`);
  http
    .createServer((req, res) => {
      const message = `worker ${process.pid}...`;
      console.log(message);
      res.end(message);
    })
    .listen(3000);
}
