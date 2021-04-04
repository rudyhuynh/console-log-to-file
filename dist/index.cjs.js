'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var util = require('util');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util);

function defaultFormatter(level, args) {
  return `${new Date().toISOString()} [${level}] ` + [...args].map((item) => util__default['default'].inspect(item)).join(" ") + "\n";
}

/**
 *
 * @param {*} param0
 */
function consoleLogToFile({ logFilePath, formatter = defaultFormatter, includes = [] }) {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  if (!logFilePath) {
    throw new Error('"logFilePath" is required');
  }

  const logFileStream = fs__default['default'].createWriteStream(logFilePath, { flags: "a" });

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
