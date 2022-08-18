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
describe('test "/users" endpoint response and users/create', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users')
            .send({
            firstName: "donghyeon",
            lastName: "oh",
            password: "1234"
        });
        token = response.body;
        console.log(token);
        expect(200);
    }));
    it('"/users" endpoint should response with status code of 200 //GET', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/users').send(token).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
    }));
    it('"/users/:id" endpoint should response with status code of 200 //GET', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get(`/users/?id=${id}`).send(token).set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
    }));
    it('"/login" endpoint should response with status code of 200 //POST', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const user = {
            firstName: "donghyeon",
            lastName: "oh",
            password: "1234"
        };
        const response = yield request.post('/login').send(user);
        console.log(user);
        expect(response.statusCode).toBe(200);
    }));
});
