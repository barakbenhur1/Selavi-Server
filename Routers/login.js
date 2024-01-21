const express = require("express")
const router = express()
const Login = require("../Login/Profile")
const { v4: uuidv4 } = require('uuid')

router.post('/', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password, res)
})

router.post('/signup', function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    signup(name, email, password, res)
})

async function login(email, password, res) {
    let login = await Login.findOne({ email: email })
    if (login.password == password) {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify
            (
                {
                    id: login.id,
                    name: login.name
                }
            )
        )
    }
    else {
        res.sendStatus(500)
    }
}

async function signup(name, email, password, res) {
    let login = await Login(
        {
            id: uuidv4(),
            email: email,
            password: password,
            name: name,
            followed: []
        }
    )
    login.save()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true }))
}

module.exports = router
