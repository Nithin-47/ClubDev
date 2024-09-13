import { IMAGE_BUCKET_NAME } from "#src/config/general.js"
import { GridFSBucket } from "mongodb"
import mongoose from "mongoose"

const cache = {
    imageBucketStream: null
}

export function getImagesBucketStream() {
    if (cache.imageBucketStream) {
        return cache.imageBucketStream
    }

    cache.imageBucketStream = new GridFSBucket(mongoose.connection.db, {
        bucketName: IMAGE_BUCKET_NAME,
    })

    return cache.imageBucketStream
}
