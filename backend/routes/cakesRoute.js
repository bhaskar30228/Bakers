import express from "express"
const cakesRouter=express.Router()
import { getCakes,getCake,postCakes,updateCake,deleteCake } from "../controller/cakesController.js"
import { upload } from "../middleware/ImageUpload.js"
import { authenticate, adminOnly } from "../middleware/Role.js"

cakesRouter.get("/",getCakes)

cakesRouter.get("/:id",getCake)

cakesRouter.post("/",authenticate,adminOnly,upload.single("image"),postCakes);

cakesRouter.put("/:id", authenticate, adminOnly, updateCake);
cakesRouter.delete("/:id", authenticate, adminOnly, deleteCake);


export default cakesRouter