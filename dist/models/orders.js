"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderList = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const saltRounds = process.env.SALT_ROUNDS || '10';
const pepper = process.env.BCRYPT_PASSWORD;
const tokenSecret = process.env.TOKEN_SECRET;
class OrderList {
    index(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders Where user_id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get orders. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) returning *";
                const result = yield conn.query(sql, [o.product_id, o.quantity, o.user_id, o.status]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add a order. order:${o.product_id} - ${o.user_id} Error: ${err}`);
            }
        });
    }
}
exports.OrderList = OrderList;
