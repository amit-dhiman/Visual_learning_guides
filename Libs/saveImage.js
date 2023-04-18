const multer = require('multer');
const path = require('path');
const jPath = path.join(__dirname,"../uploads");
console.log("--path---",jPath);
// const storage = upload.single('image')

const upload = multer({dest: jPath});

module.exports = {
    // storage : storage,
    upload : upload
};

