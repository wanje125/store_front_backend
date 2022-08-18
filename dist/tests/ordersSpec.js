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
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const products_1 = require("../models/products");
const users_1 = require("../models/users");
const list = new orders_1.OrderList();
const product = new products_1.ProductList();
const user = new users_1.UserList();
describe("product Model", () => __awaiter(void 0, void 0, void 0, function* () {
    afterEach(() => {
    });
    it('should have an index method', () => {
        expect(list.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(list.create).toBeDefined();
    });
    it('check create and index method', () => __awaiter(void 0, void 0, void 0, function* () {
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
        // @ts-ignore
        const result = yield list.create({
            product_id: resultp.id,
            quantity: 100,
            user_id: resultu.id,
            status: 'active',
        });
        const new_id = result.id;
        // @ts-ignore
        expect(result).toEqual({
            id: new_id,
            // @ts-ignore
            product_id: resultp.id.toString(),
            quantity: 100,
            // @ts-ignore
            user_id: resultu.id.toString(),
            status: 'active',
        });
        // @ts-ignore
        const result_1 = yield list.index(resultu.id.toString());
        expect(result_1.length).toBeGreaterThan(0);
    }));
}));
