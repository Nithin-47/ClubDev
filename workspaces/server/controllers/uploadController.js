


const handleUpload = (req, res) => {
    if(req.file == undefined){
        return res.status(400).send({message: 'Please upload a file!'});
    }

    const fileObjectId = req.file.id;

    return res.status(200).send({
        message: 'File uploaded successfully!',
        id: fileObjectId
    });


}

export default {handleUpload};