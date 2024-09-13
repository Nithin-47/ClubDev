import multer from 'multer'
import { GridFsStorage } from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import { IMAGE_BUCKET_NAME } from "#src/config/general.js"

dotenv.config()

const storage = new GridFsStorage({
    url: process.env.DATABASE_URI,
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg', 'image/jpg']

        // if(match.indexOf(file.mimetype) === -1) {
        //     const filename = `${Date.now()}-bezkoder-${file.originalname}`;
        //     return filename;
        // }
        // console.log(file.originalname);

        return {
            bucketName: IMAGE_BUCKET_NAME,
            filename: file.originalname
        }
    }
})

export default multer({ storage })
