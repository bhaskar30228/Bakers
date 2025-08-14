import express from "express"
const cakesRouter=express.Router()
import { getCakes,getCake,postCakes,updateCake,deleteCake } from "../controller/cakesController.js"
import { upload } from "../middleware/ImageUpload.js"
cakesRouter.get("/",getCakes)

cakesRouter.get("/:id",getCake)

cakesRouter.post("/",upload.single("image"),postCakes)

cakesRouter.put("/:id",updateCake)

cakesRouter.delete("/:id",deleteCake)


export default cakesRouter