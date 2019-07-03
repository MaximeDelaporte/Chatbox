const express = require('express');
const router = express.Router();
const chatkit = require('../config');

router.get('/:roomId/user/:userId',(req,res, next)=>{
   chatkit.getReadCursor({
       userId: req.params.userId,
       roomId: req.params.roomId
   })
       .then((cursor)=>{
           return res.send(Object.values(cursor));
       })
       .catch((err) =>{
           return res.send(`Error : ${err}`)
       })
});

router.get('/users/:userId', (req, res, next)=>{
    chatkit.getReadCursorsForUser({
        userId: req.params.userId,
    })
        .then((cursors)=>{
            return res.send(Object.values(cursors));
        })
        .catch((err) =>{
            return res.send(`Error : ${err}`)
        })
});

router.get('/rooms/:roomId', (req, res, next)=>{
    chatkit.getReadCursorsForRoom({
        roomId: req.params.roomId,
    })
        .then((cursors)=>{
            return res.send(Object.values(cursors));
        })
        .catch((err) =>{
            return res.send(`Error : ${err}`)
        })
});


router.post('/create', (req, res, next) =>{
    chatkit.setReadCursor({
        userId:req.body.userId,
        roomId: req.body.roomId,
        position: req.body.position
    })
        .then(()=>{
            return res.send('done', 200)
        })
        .catch((err) =>{
            return res.send(`Error : ${err}`, 500)
        })
});

module.exports = router;
