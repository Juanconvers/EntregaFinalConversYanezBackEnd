import { Router } from "express";
import { uploadImg } from "../controllers/multerController.js"
import { uploadDocs, uploadProds, uploadProfiles } from "../config/multer.js"

const multerRouter = Router()

multerRouter.post('/profiles', uploadProfiles.single('profile'),  uploadImg)
multerRouter.post('/docs', uploadDocs.single('doc'),  uploadImg)
multerRouter.post('/products', uploadProds.single('product'),  uploadImg)

export default multerRouter
