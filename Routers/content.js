const express = require("express")
const router = express()
const Content = require("../Content/Content")
const Profile = require("../Login/Profile")

router.post('/', function (req, res) {
    const id = req.body.id
    get(id, res)
})

router.post('/all', function (req, res) {
    const id = req.body.id
    getAll(id, res)
})

router.post('/save', function (req, res) {
    const id = req.body.id
    const content = req.body.content
    save(id, content, res)
})

async function get(id, res) {
    let content = await Content.find({ id: id })
    res.end(JSON.stringify(content))
}

async function getAll(id, res) {
    let profile = Profile.findOne({id: id}, "followed")
    let content = []
    for (i = 0; i < profile.followed.length; i++) {
        let c = await Content.find({ id: profile.followed[i] })
        for (j = 0; j < c.length; j++) {
            content.push(c[i])
        }
    }
    res.end(JSON.stringify(content))
}

async function save(id, vals, res) {
    let split = vals.split("!+!")
    let values = []

    for (i = 0; i < split.length; i++) {
        let keyValue = split[i].split("±")
        values.push(
            {
                type: keyValue[0],
                value: keyValue[1]
            }
        )
    }

    let content = await Content(
        {
            id: id,
            values: values
        }
    )

    content.save()
    res.end(JSON.stringify({ success: true }))
}

module.exports = router