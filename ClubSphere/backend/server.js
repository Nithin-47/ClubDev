import express, { urlencoded } from 'express'; // Import express
const app = express(); // Create an express app
import path from 'path';
import { logger, logEvents } from './middleware/logEvents';


import 'dotenv/config'



import cors from 'cors';
import credentials from './middleware/credentials';
import corsOptions from './config/corsOptions';
import errorHandler from './middleware/errorHandler';
import verifyJWT from './middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import { urlencoded as _urlencoded } from 'body-parser';


import { createConnection } from 'mongoose';
import connectDB from './config/dbConn';
import Grid from 'gridfs-stream';
import { GridFSBucket } from 'mongodb';


const PORT = process.env.PORT || 3500;

// Connect to the database
// connectDB();

// custom middleware logger
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(_urlencoded({ extended: true })); 

app.use(urlencoded({extended:false}));
// app.use(express.json());
app.use(cookieParser());

app.use('/',require('./routes/root').default);
app.use('/register',require('./routes/register').default);
app.use('/auth',require('./routes/auth').default);
app.use('/refresh',require('./routes/refresh').default);
app.use('/logout',require('./routes/logout').default);
app.use('/clubs',require('./routes/api/clubs').default);

app.use(verifyJWT);
// app.use('/upload',require('./routes/upload'));
app.use('/employees',require('./routes/api/employees').default);



// app.use(errorHandler)


const conn = createConnection(`${process.env.DATABASE_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


// const gfs = {bucket: null};
let bucket;

conn.once('open', () => {
    console.log('Connected to the database');

    // init stream
    bucket = new GridFSBucket(conn.db, {
        bucketName: 'photos',
      });


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    
});


export default bucket;
