import express from "express"
const cakesRouter=express.Router()
import { getCakes,getCake,postCakes,updateCake,deleteCake,upload } from "../controller/cakesController.js"

cakesRouter.get("/",getCakes)

cakesRouter.get("/:id",getCake)

cakesRouter.post("/",upload.single("image"),postCakes)

cakesRouter.put("/:id",updateCake)

cakesRouter.delete("/:id",deleteCake)


export default cakesRouter