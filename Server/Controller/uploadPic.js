const multer = require('multer');
const storage = multer.diskStorage({
	destination:  '../client/public/uploads/',
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		cb(null, file.fieldname + '-' + Date.now()+'.'+ext)
	}
});

exports.upload = multer({ storage: storage });
