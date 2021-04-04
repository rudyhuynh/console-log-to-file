import { consoleLogToFile } from "../index.js";

consoleLogToFile({
  logFilePath: "./default.log",
});

console.log("Element", "Paracetamol", new Date());
console.info("Information", 123, { name: "abc" });
console.warn(new Error("this is an expected warning"), { debugObj: true });
console.error(new Error("this is an expected error"));
