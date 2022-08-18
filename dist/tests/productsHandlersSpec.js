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
const request = (0, supertest_1.default)(server_1.default);
let token;
let id;
describe('test "/products" endpoint response', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const result_1 = yield request.post('/products').send({
            name: "practice",
            price: 200,
            category: "laptop"
        });
        id = result_1.body.id;
        yield console.log(id);
    }));
    it('"/products" endpoint should response with status code of 200 //GET', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/products');
        expect(response.statusCode).toBe(200);
    }));
    it('"/products/:id" endpoint should response with status code of 200 //GET', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/products/?id=${id}`);
        console.log(id);
        console.log(response.body);
        expect(response.statusCode).toBe(200);
    }));
    it('"/products/create" endpoint should response with status code of 200 //POST', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const product = {
            name: "product1",
            price: 200,
            category: "laptop"
        };
        const response = yield request.post('/products').send(product);
        console.log(product);
        expect(response.statusCode).toBe(200);
    }));
    it('"/products/:id" endpoint should response with status code of 200 //DELETE', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete(`/products/${id}`);
        expect(response.statusCode).toBe(200);
    }));
});
