const { consoleLogToFile } = require("../dist/index.cjs.js");

consoleLogToFile({
  logFilePath: "./default.log",
  includes: ["log", "warn"],
});

console.log("CSJ");
console.info("CJS");
console.warn("CJS");
console.error("CJS");
