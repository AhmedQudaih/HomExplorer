const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'homeExplorerImages',
  },
});

exports.upload = multer({
	 storage: storage,
 fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
 	 cb(null, true);
  } else {
 	 cb(null, false);
 	 return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}
 });


/*
multer.diskStorage({
	destination:  './uploads/',
	filename: (req, file, cb) => {
		const ext = file.mimetype.split("/")[1];
		cb(null, file.fieldname + '-' + Date.now()+'.'+ext)
	}
});
*/
