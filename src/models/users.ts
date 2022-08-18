// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUNDS || '10'
const pepper = process.env.BCRYPT_PASSWORD
const tokenSecret = process.env.TOKEN_SECRET

export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    password: string;

}

export class UserList {
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users'

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get ${id} user. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
            const result = await conn.query(sql, [u.firstName, u.lastName, hash])
            const user = result.rows[0]
            conn.release()

            return user
        } catch (err) {
            throw new Error(`unable create user (${u.firstName}): ${err}`)
        }
    }
    async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password FROM users WHERE firstname=($1) AND lastname=($2)'

        const result = await conn.query(sql, [firstname, lastname])

        console.log(password + pepper)

        if (result.rows.length) {

            const user = result.rows[0]

            console.log(user)

            if (bcrypt.compareSync(password + pepper, user.password)) {
                return user
            }
        }

        return null
    }
}