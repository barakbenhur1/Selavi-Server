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
    const content = req.body.urls
    save(id, content, res)
})

async function get(id, res) {
    let content = await Content.find({ id: id })
    res.end(JSON.stringify(content))
}

async function getAll(id, res) {
    let profile = await Profile.findOne({ id: id }, "followed")
    let content = []
    let followed = profile.followed ?? []
    for (i = 0; i < followed.length; i++) {
        let c = await Content.find({ id: followed[i] })
        for (j = 0; j < c.length; j++) {
            content.push(c[j])
        }
    }
    res.end(JSON.stringify(content))
}

async function save(id, vals, res) {
    let split = vals.split("!+!")
    let values = []

    for (i = 0; i < split.length; i++) {
        let keyValue = split[i].split("±")
        values.push
            (
                {
                    assetType: keyValue[1],
                    value: keyValue[0]
                }
            )
    }

    let profile = await Profile.findOne({ id: id })

    let c =
    {
        id: id,
        name: profile.name,
        content: values
    }

    let content = await Content(c)

    await content.save()
    
    res.end(JSON.stringify({ success: true }))
}

module.exports = router