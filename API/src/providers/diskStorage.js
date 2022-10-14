const fs = require('fs');
const { path } = require('path');
const uploadConfig = require('../config/upload')

class DiskStorage {
    async saveFile(file){
        await fs.promise.rename(
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOAD_FOLDER, file)
        )

        return file 
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file)

        try{
            await fs.promises.stat(filePath)
        } catch(e){
            return false
        }

        await fs.promises.unlink(filePath)
    }
}

module.exports = DiskStorage