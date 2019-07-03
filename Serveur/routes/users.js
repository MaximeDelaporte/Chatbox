const account = require("../controllers/account/lib");

const express = require('express');
const router = express.Router();
const chatkit = require('../config');

let users = {
    1: {
        id: "admin",
        name: "Test Web",
        created_at: "2019-02-07T21:43:41Z",
        updated_at: "2019-02-07T21:43:41Z"
    },
    2: {
        id: "user",
        name: "User Test",
        created_at: "2019-03-18T19:25:00Z",
        updated_at: "2019-03-18T19:25:00Z"
    }
};

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const users = req.context.models.User.findAll();
    if (users) {
        return res.status(200).send(users);
    } else {
        chatkit.getUsers()
            .then((users) => {
                return res.send(Object.values(users));
            })
            .catch(() => {
                return res.send('No users found', 400);
            })
    }

});

/* GET one user */
router.get('/:userId', (req, res, next) => {
    chatkit.getUser({
        id: req.params.userId,
    })
        .then(user => {
            return res.send(Object.values(user))
        })
        .catch(err => console.error(err))

});


router.post('/auth', async (req, res, next) => {
    const auth = await User.findByLogin(req);
    if (auth) {

    }
    const authData = chatkit.authenticate({
        userId: req.body.user_id
    });
    res.status(authData.status).send(authData.body);
});

router.post('/create', async (req, res, next) => {
    const user = await req.context.models.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    return res.status(200).send(true);
});

router.put('/:userId', async (req, res, next) => {
    const user = await req.context.models.User.findOne(
        {
            where: {id: req.params.userId}
        })
        .then((obj) => {
            if (!user) {
                return res.status(404).send({message: 'User not Found'})
            }
            return obj.update({
                username: req.body.username || user.username,
                email: req.body.email || user.email,
                password: req.body.password || user.password
            })
        })
        .catch(next)
});


router.delete('/:userId', (req, res, next) => {
    chatkit.deleteUser({
        userId: req.params.userId
    })
        .then(() => {
            return res.send(`DELETE user ${req.params.userId}`)
        })
        .catch((err) => {
            return res.send(`Error : ${err}`)
        })
});


router.get('/:userId/rooms', (req, res, next) => {
    chatkit.getUserRooms({
        userId: req.params.userId,
    })
        .then((rooms) => {
            return res.send(Object.values(rooms))
        })
        .catch((err) => {
            return res.send(`Error : ${err}`)
        })
});
router.get('/:userId/joinable-rooms', (req, res, next) => {
    chatkit.getUserJoinableRooms({
        userId: req.params.userId,
    })
        .then((rooms) => {
            return res.send(Object.values(rooms))
        })
        .catch((err) => {
            return res.send(`Error : ${err}`)
        })
});
router.post('/login', account.login);
router.post('/signup', account.signup);


module.exports = router;
