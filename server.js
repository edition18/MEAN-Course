const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => { //this makes the port set up is valid num
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // if not a number
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false; // all other error return false
};

const onError = error => { //output error onError
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => { //log that we are listen
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError); //listen for error
server.on("listening", onListening); // listen
server.listen(port);
