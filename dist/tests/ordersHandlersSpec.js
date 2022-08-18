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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const product = new products_1.ProductList();
const user = new users_1.UserList();
const request = (0, supertest_1.default)(server_1.default);
let uid;
let pid;
let token;
describe('test "/orders" endpoint response ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const resultp = yield product.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        // @ts-ignore
        const resultu = yield user.create({
            firstName: 'chris',
            lastName: 'cho',
            password: '1234',
        });
        pid = resultp.id.toString();
        // @ts-ignore
        uid = resultu.id.toString();
        const response = yield request.post('/login')
            .send({
            firstName: "chris",
            lastName: "cho",
            password: "1234"
        });
        token = response.body;
        console.log(token);
        expect(200);
    }));
    it('"/users/:user_id/orders" endpoint should response with status code of 200 //POST', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const order = JSON.stringify({
            product_id: pid,
            quantity: 100,
            status: 'active',
        });
        const response = yield request.post(`/users/?user_id=${uid}/orders`).send(order).send(token).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
    }));
    it('"/users/:user_id/orders" endpoint should response with status code of 200 //GET', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/users/?user_id=${uid}/orders`).send(token).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
    }));
});
