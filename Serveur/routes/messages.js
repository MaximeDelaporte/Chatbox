const express = require('express');
const router = express.Router();
const chatkit = require('../config');

/* GET messages listing. */
router.get('/:roomId', async (req, res, next) => {
    const messages = await req.context.models.Message.findAllByRoom(req.params.roomId);
    if(messages){
        return res.status(200).send(messages);

    }
    else{
        chatkit.fetchMultipartMessages({
            roomId: req.params.roomId,
        })
            .then((messages)=>{
                return res.send(Object.values(messages));
            })
            .catch((err) =>{
                return res.send(`Error : ${err}`)
            })
    }

});

module.exports = (io)=>{
    router.post('/new', (req, res, next) => {
        chatkit.sendMultipartMessage({
            userId: req.body.author,
            roomId: req.body.roomId,
            parts: [
                {
                    "type": "text/plain",
                    "content": req.body.text,
                },
            ],
        })
            .then((data)=>{
                io.emit('receiveMessage', data);
                return res.status(200).send('Success')
            })
            .catch((err)=>{
                console.log(err);
                return res.status(500).send(`Error : ${err}`)
            })
    });
    router.delete('/:messageId', (req, res, next) => {
        chatkit.deleteMessage({
            id: req.params.messageId,
        })
            .then((data)=>{
                io.emit('deleteMessage', data);
                res.status(200).send(`Delete message ${req.params.messageId}`);

            })
            .catch((err)=>{
                return res.status(500).send(`Error : ${err}`)
            })
    });
    return router
};
