import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';


// const storage = new DiskStorage({
//     destination: (req, file, cb) => {
//         cb(null, __dirname + '/../uploads');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });


// const upload = multer({ dest: 'uploads/' });



const storage = new GridFsStorage({
    url: process.env.DATABASE_URI,
    // options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {

        // console.log(req);

        const match = ['image/png', 'image/jpeg','image/jpg'];

        // if(match.indexOf(file.mimetype) === -1) {
        //     const filename = `${Date.now()}-bezkoder-${file.originalname}`;
        //     return filename;
        // }
        // console.log(file.originalname);

        return {
            bucketName: 'photos',
            filename: file.originalname
        }
    }
});


export default multer({ storage });



//`${Date.now()}-bezkoder-${file.originalname}`

