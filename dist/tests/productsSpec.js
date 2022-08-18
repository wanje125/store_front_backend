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
const products_1 = require("../models/products");
const list = new products_1.ProductList();
describe("product Model", () => __awaiter(void 0, void 0, void 0, function* () {
    afterEach(() => {
    });
    it('should have an index method', () => {
        expect(list.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(list.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(list.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(list.delete).toBeDefined();
    });
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const result = yield list.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        const new_id = result.id;
        expect(result).toEqual({
            id: new_id,
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        yield list.delete(new_id.toString());
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const result_1 = yield list.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        const new_id = result_1.id;
        const result = yield list.index();
        // @ts-ignore
        expect(result.length).toBeGreaterThanOrEqual(1);
        yield list.delete(new_id.toString());
    }));
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const result_1 = yield list.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        const new_id = result_1.id;
        const result = yield list.show(new_id.toString());
        expect(result).toEqual({
            id: new_id,
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        yield list.delete(new_id.toString());
    }));
    it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const result_1 = yield list.create({
            name: 'laptop1',
            price: 100,
            category: 'laptop',
        });
        const new_id = result_1.id;
        yield list.delete(new_id.toString());
        const result = yield list.show(new_id.toString());
        expect(result).toBeFalsy();
    }));
}));
