const express = require('express');

const ErrorHandler = (error,req,res,next) => {
 
  const statusCode = error.status || 500;
  const errorMessage = statusCode === 500 ? 'Internal Server Error' : error.message;

  return res.status(statusCode).json({
    statusCode : statusCode,
    message : errorMessage
  });
}

module.exports = ErrorHandler;