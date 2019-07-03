const express = require('express');
const router = express.Router();
const chatkit = require('../config');

/* GET rooms listing. */
router.get('/user/:userId', (req, res, next) => {
    chatkit.getUserRooms({
        userId: req.params.userId
    })
        .then(rooms =>{
            return res.send(Object.values(rooms));
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.get('/:roomId', (req, res, next)=>{
    chatkit.getRoom({
        roomId: req.params.roomId,
    })
        .then(room =>{
            return res.send(Object.values(room))
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});


router.post('/:roomId/add_users', (req, res, next) => {
    chatkit.addUsersToRoom({
        roomId: req.params.roomId,
        userIds: req.body.userIds,
    })
        .then(()=>{
                return res.send(`Users ${req.body.userIds.map(user =>{ console.log(user)})} added`)
        })
        .catch((err) =>{
            return res.send(`Error : ${err}`)
        })
});
router.post('/:roomId/remove_users', (req, res, next) => {
    chatkit.addUsersToRoom({
        roomId: req.params.roomId,
        userIds: req.body.userIds,
    })
        .then(()=>{
            return res.send(`Users ${req.body.userIds.map(user =>{ console.log(user)})} removed`)
        })
        .catch((err) =>{
            return res.send(`Error : ${err}`)
        })
});

router.post('/new', (req, res, next) =>{
    chatkit.createRoom({
        creatorId: req.body.userId,
        name: req.body.name,
        isPrivate: req.body.isPrivate ? req.body.isPrivate : false,
        userIds: req.body.userIds ? req.body.userIds : [],
        customData: req.body.customData ? req.body.customData : ''
    })
        .then((room) =>{
            console.log(room);
            return res.send(room)
        })
        .catch(err => {
            console.log(err);
            return res.send(`Error : ${err}`)
        })
});

router.put('/:roomId', (req, res, next) => {
    chatkit.updateRoom({
        id: req.params.roomId,
        name: req.body.name ? req.body.name : null,
        isPrivate: req.body.isPrivate ? req.body.isPrivate : null,
        customData: req.body.customData ? req.body.customData : ''
    })
        .then(() =>{
            return res.send(`Room ${req.body.roomId} updated`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.delete('/:roomId', (req, res, next) => {
    chatkit.deleteRoom({
        roomId: req.params.roomId
    })
        .then(() => {
            return res.send(`DELETE room ${req.params.roomId}`)
        })
        .catch((err) =>{
            return res.send(`Error : ${err}`)
        })
});

module.exports = router;
