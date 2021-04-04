import { consoleLogToFile } from "../index.js";

consoleLogToFile({
  logFilePath: "./default.log",
  includes: ["log", "warn"],
});

console.log("includes");
console.info("includes");
console.warn("includes");
console.error("includes");
