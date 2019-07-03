const express = require('express');
const router = express.Router();
const account = require('../controllers/account/lib');
/* GET home page. */



module.exports = function(io){

  router.get('/', (req, res, next) => {
    io.on('connectionIndex', function (socket){
      console.log('Connected to Index')
      socket.on('admin', function(){
        console.log('success');
      })
    });
    req.io.emit('index');
  });

  return router
};
