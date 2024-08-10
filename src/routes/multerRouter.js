import { Router } from "express";
import { insertImg } from "../controllers/multerController.js"
import { uploadDocs, uploadProds, uploadProfiles } from "../config/multer.js"

const multerRouter = Router()

multerRouter.post('/profiles', uploadProfiles.single('profile'),  insertImg)

multerRouter.post('/docs', uploadDocs.single('doc'),  insertImg)

multerRouter.post('/products', uploadProds.single('product'),  insertImg)

export default multerRouter 
