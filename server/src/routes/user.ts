import express from 'express'

import { UserController } from '../controllers/UserController'

const routes = express.Router()

routes.get("/", UserController.getAll)
routes.get("/:id", UserController.getById)

routes.post("/", UserController.create)
routes.post("/login", UserController.login)

routes.delete("/", UserController.deleteAll)
routes.delete("/:id", UserController.deleteById)

export { routes as userRoutes }