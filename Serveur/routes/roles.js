const express = require('express');
const router = express.Router();
const chatkit = require('../config');

router.get('/', (req, res, next) => {
    chatkit.getRoles()
        .then(roles => {
            return res.send(Object.values(roles));
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.get('/:roleId', (req, res, next)=>{
    chatkit.getPermissionsForRoomRole({
        name: req.params.roleId,
    })
        .then(roles => {
            return res.send(Object.values(roles));
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.get('/global/:roleId', (req, res, next)=>{
    chatkit.getPermissionsForGlobalRole({
        name: req.params.roleId,
    })
        .then(roles => {
            return res.send(Object.values(roles));
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.put('/:roleId', (req, res, next)=>{
    chatkit.updatePermissionsForRoomRole({
        name: req.params.roleId,
        permissionsToAdd: req.body.addedPermissions,
        permissionsToRemove: req.body.removedPermissions
    })
        .then(() => {
            return res.send(`Role ${req.params.roleId} updated`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.put('/global/:roleId', (req, res, next)=>{
    chatkit.updatePermissionsForGlobalRole({
        name: req.params.roleId,
        permissionsToAdd: req.body.addedPermissions,
        permissionsToRemove: req.body.removedPermissions
    })
        .then(() => {
            return res.send(`Global Role ${req.body.roleId} updated`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.get('/user/:userId', (req, res, next) => {
    chatkit.getUserRoles({
        userId: req.params.userId
    })
        .then(roles => {
            return res.send(Object.values(roles));
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.post('/create', (req, res, next) => {
    chatkit.createRoomRole({
        name: req.body.name,
        permissions: req.body.permissions,
    })
        .then(() => {
            return res.send(`Role ${req.body.name} created`).status(200)
        })
        .catch(err => {
            return res.send(`Error : ${err}`).status(500)
        })
});
router.post('/global/create', (req, res, next) => {
    chatkit.createGlobalRole({
        name: req.body.name,
        permissions: req.body.permissions,
    })
        .then(() => {
            return res.send(`Global Role ${req.body.name} created`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.delete('/:roleId', (req, res, next) => {
    chatkit.deleteRoomRole({
        name: req.params.roleId,
    })
        .then(() => {
            return res.send(`Role ${req.params.roleId} deleted`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.delete('/global/:roleId', (req, res, next) => {
    chatkit.deleteGlobalRole({
        name: req.params.roleId,
    })
        .then(() => {
            return res.send(`Global Role ${req.params.roleId} deleted`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.put('/add', (req, res, next) => {
    chatkit.assignRoomRoleToUser({
        userId: req.body.userId,
        name: req.body.name,
        roomId: req.body.roomId
    })

        .then(() => {
            return res.send(`Role ${req.params.name} added to user ${req.body.userId}`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.put('/global/add', (req, res, next) => {
    chatkit.assignGlobalRoleToUser({
        userId: req.body.userId,
        name: req.body.name,
    })

        .then(() => {
            return res.send(`Global Role ${req.params.name} added to user ${req.body.userId}`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.put('/remove', (req, res, next) => {
    chatkit.removeRoomRoleforUser({
        userId: req.body.userId,
        name: req.body.name,
        roomId: req.body.roomId
    })

        .then(() => {
            return res.send(`Role ${req.params.name} removed for user ${req.body.userId}`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

router.put('/global/remove', (req, res, next) => {
    chatkit.removeGlobalRoleForUser({
        userId: req.body.userId,
        name: req.body.name,
    })

        .then(() => {
            return res.send(`Global Role ${req.params.name} remove for user ${req.body.userId}`)
        })
        .catch(err => {
            return res.send(`Error : ${err}`)
        })
});

module.exports = router;
