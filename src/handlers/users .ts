import express, { Request, Response, NextFunction } from 'express'
import { User, UserList } from '../models/users'
import jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN_SECRET

const list = new UserList()
// handler functions here
const index = async (_req: Request, res: Response) => {
    const products = await list.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const products = await list.show(req.params.id)
    res.json(products)

}

const create = async (req: Request, res: Response) => { 
    // @ts-ignore
    const user: User = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
    }
    try {
        const newUser = await list.create(user)
        // @ts-ignore
        const token = await jwt.sign({ user: newUser }, tokenSecret)

        res.json(token)
    } catch(err) {
        res.status(400)
        // @ts-ignore
        res.json(err + user)
    }
}
const login = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password,
    }
    try {
        const u = await list.authenticate(user.firstName, user.lastName, user.password)
        // @ts-ignore
        const token = jwt.sign({ user: u }, tokenSecret);
        res.json(token)
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1]
        // @ts-ignore
        const decoded = jwt.verify(token, tokenSecret)


        next()
    } catch (error) {
        res.status(401)
        res.json(`could not access,  your token is invalid . Error${error}`)
    }
}


const UserRoutes = (app: express.Application) => {
    // Express routes here
    app.get("/users", verifyAuthToken, index)
    app.get("users/:id", verifyAuthToken ,show)
    app.post("/users", create)
    app.post("/login",login)
}

export default UserRoutes