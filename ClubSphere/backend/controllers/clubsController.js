
import app from 'express';
import upload from '../middleware/upload';
import { find, create, findOne } from '../model/Club';
import { Types } from 'mongoose';
import { default as handleUpload } from './uploadController';
import bucket from '../server';
import { GridFSBucket } from 'mongodb';







const getClubs = async (req, res) => {

    try {
        const clubs = await find({}, { name: 1, image: 1 }).exec();

        if (!clubs || clubs.length === 0) {
            return res.status(204).json({ msg: 'No clubs found' });
        }

        const clubData = await Promise.all(
            clubs.map(async (club) => {
                const file = await gfs.files.findOne({ _id: Types.ObjectId(club.image) });
                if (!file || file.length === 0) {
                    return { name: club.name, image: null };
                }

                const readstream = gfs.createReadStream(file.filename);
                const chunks = [];
                readstream.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                await new Promise((resolve) => readstream.on('end', resolve));

                const image = Buffer.concat(chunks).toString('base64');

                return {
                    name: club.name,
                    image: `data:${file.contentType};base64,${image}`
                };
            })

        )
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }


}

const createNewClub = async (req, res) => {

    // upload.single('image')(req, res, async (err) => {

        console.log("-----------------")
        // console.log(req.body);
        // console.log(req.file);

        console.log(bucket);



        if (!req?.body?.name || !req?.body?.longDescription) {
            return res.status(400).json({ 'msg': 'Please include a club name, image and long description' });
        }

        const { name, shortDescription, longDescription, contact } = req.body;

        // somehow upload middleware should be called and also controller to return object id
        // const bucket = new GridFSBucket('uploads');
        // bucket = new GridFSBucket(conn.db, {
        //     bucketName: 'photos',
        //   });
        const cursor = await bucket.find({ filename: req.file.filename }, { _id: 1 });
        
        // console.log(file);

        const imageObject = cursor;




        try {
            const result = await create({
                "name": name,
                "shortDescription": shortDescription,
                "longDescription": longDescription,
                "image": imageObject,
                "contact": contact
            });


            res.status(201).json(result);

            console.log("Successfully created club");
        }
        catch (err) {
            res.status(500).json({ 'msg': err.message });
        }

    // }
    // )
}







const getSpecificClub = async (req, res) => {

    try {

        if (!req?.params?.name) {
            return res.status(400).json({ 'msg': 'Please include a club name' });
        }

        const club = await findOne({ name: req.params.name }).exec();

        if (!club) {
            return res.status(204).json({ 'msg': `Club ${req.params.name} not found` });
        }

        const file = await gfs.files.findOne({ _id: club.image }).exec();

        if (!file || file.length === 0) {
            return res.status(404).json({ msg: 'No file exists' });
        }

        res.set({
            'Club-Name': club.name,
            'Club-ShortDescription': club.shortDescription,
            'Club-LongDescription': club.longDescription,
            'Club-Contact': club.contact,
        });

        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);

    }
    catch (err) {
        res.status(500).json({ 'msg': err.message });
    }

}


export default { getClubs, createNewClub, getSpecificClub };