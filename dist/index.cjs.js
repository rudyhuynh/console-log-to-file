'use strict';

var fs = require('fs');
var util = require('util');

function defaultFormatter(level, args) {
  return `${new Date().toISOString()} [${level}] ` + [...args].map((item) => util.inspect(item)).join(" ") + "\n";
}

/**
 *
 * @param {*} param0
 */
function consoleLogToFile({ logFilePath, formatter = defaultFormatter, includes = [], flags = "a" }) {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  if (!logFilePath) {
    throw new Error('"logFilePath" is required');
  }

  const logFileStream = fs.createWriteStream(logFilePath, { flags });

  console.log = function (...args) {
    originalLog.apply(console, args);
    logToFile("log", args);
  };

  console.warn = function (...args) {
    originalWarn.apply(console, args);
    logToFile("warn", args);
  };

  console.error = function (...args) {
    originalError.apply(console, args);
    logToFile("error", args);
  };

  console.info = function (...args) {
    originalInfo.apply(console, args);
    logToFile("info", args);
  };

  function logToFile(level, args) {
    if (Array.isArray(includes) && includes.length) {
      if (!includes.includes(level)) return;
    }

    logFileStream.write(formatter(level, args));
  }
}

exports.consoleLogToFile = consoleLogToFile;
