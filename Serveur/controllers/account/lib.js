//const User = require('');
const passwordHash = require('password-hash');

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "text": "Invalid request"
        })
    }
    else {
        let user ={
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        };
        let findUser = new Promise((resolve, reject)=>{
            //To do

        });

        findUser.then(()=>{

        })
    }
}

function login(req, res) {
    if (!req.body.email || req.body.password) {
        res.status(400).json({
            "text": "Invalid request"
        })
    }
    else {
        // To do
    }
}

exports.login = login;
exports.signup = signup;
