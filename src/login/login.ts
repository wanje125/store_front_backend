import express, { Request, Response, NextFunction } from 'express'
import { User, UserList } from '../models/users'
import jwt from 'jsonwebtoken'

const tokenSecret = process.env.TOKEN_SECRET

const list = new UserList()



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


