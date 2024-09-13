
import { includes } from '../config/allowedOrigins';
import { all } from '../routes/root';

const credentials = (req,res,next) => {
    const origin = req.headers.origin;
    if(includes(origin)) {
        // res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Credentials', true);

    }

    next();
}

export default credentials;