// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUNDS || '10'
const pepper = process.env.BCRYPT_PASSWORD
const tokenSecret = process.env.TOKEN_SECRET

export type Order = {
    id?: string;
    product_id: number;
    quantity: number;
    user_id: number;
    status: string;


}

export class OrderList {
    async index(id: string): Promise<Order[]> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT * FROM orders Where user_id = ($1)'
            
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await Client.connect()
            const sql = "INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) returning *"
            const result = await conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status])

            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not add a order. order:${o.product_id} - ${o.user_id} Error: ${err}`)

        }
    }


}