import Club from "#src/model/club.js"

const getClubs = async (req, res) => {
    try {
        const clubs = await Club.find({}).exec()

        if (!clubs) {
            return res.status(204).json({ msg: 'No clubs found' })
        }

        res.status(200).json(clubs)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
}

const createNewClub = async (req, res) => {
    if (!req?.body?.name || !req?.body?.longDescription) {
        return res.status(400).json({ 'msg': 'Please include a club name, image and long description' })
    }

    const { name, shortDescription, longDescription, contact } = req.body
    
    console.log(req.file.id)

    try {
        const result = await Club.create({
            "name": name,
            "shortDescription": shortDescription,
            "longDescription": longDescription,
            "image": req.file.id,
            "contact": contact
        })


        res.status(201).json(result)

        console.log("Successfully created club")
    }
    catch (err) {
        res.status(500).json({ 'msg': err.message })
        console.error(err)
    }
}

const getSpecificClub = async (req, res) => {
    // try {
    //     if (!req?.params?.name) {
    //         return res.status(400).json({ 'msg': 'Please include a club name' })
    //     }

    //     const club = await Club.findOne({ name: req.params.name }).exec()

    //     if (!club) {
    //         return res.status(204).json({ 'msg': `Club ${req.params.name} not found` })
    //     }

    //     const file = await gfs.files.findOne({ _id: club.image }).exec()

    //     if (!file || file.length === 0) {
    //         return res.status(404).json({ msg: 'No file exists' })
    //     }

    //     res.set({
    //         'Club-Name': club.name,
    //         'Club-ShortDescription': club.shortDescription,
    //         'Club-LongDescription': club.longDescription,
    //         'Club-Contact': club.contact,
    //     })

    //     const readstream = gfs.createReadStream(file.filename)
    //     readstream.pipe(res)

    // } catch (err) {
    //     res.status(500).json({ 'msg': err.message })
    // }
}

export { getClubs, createNewClub, getSpecificClub }