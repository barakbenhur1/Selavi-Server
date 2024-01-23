const express = require("express")
const router = express()
const Profile = require("../Login/Profile")

router.post('/', function (req, res) {
    const id = req.body.id
    get(id, res)
})

router.post('/follow', function (req, res) {
    const id = req.body.id
    const followID = req.body.followID
    follow(id, followID, res)
})

router.post('/following', function (req, res) {
    const id = req.body.id
    const followID = req.body.followID
    following(id, followID, res)
})

async function get(id, res) {
    let profile = await Profile.findOne({ id: id }, "id name")
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(profile))
}

async function follow(id, followID, res) {
    let profile = await Profile.findOne({ id: id }, "followed")
    let includes = profile.followed.includes(followID)
    if (includes) {
        profile.followed.pull(followID)
    }
    else {
        profile.followed.push(followID)
    }
    await profile.save()
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ follow: !includes }))
}

async function following(id, followID, res) {
    let profile = await Profile.findOne({ id: id }, "followed")
    let includes = profile.followed.includes(followID)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ follow: includes }))
}

module.exports = router