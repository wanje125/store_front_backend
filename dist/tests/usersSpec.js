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
const users_1 = require("../models/users");
const list = new users_1.UserList();
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
    it('should have a authenticate method', () => {
        expect(list.authenticate).toBeDefined();
    });
    it('create user and check the authenticate', () => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        const result = yield list.create({
            firstName: 'chris',
            lastName: 'cho',
            password: '1234',
        });
        // @ts-ignore
        expect(result.firstname).toEqual('chris');
        // @ts-ignore
        expect(result.lastname).toEqual('cho');
        const result_1 = yield list.authenticate('chris', 'cho', '1234');
        expect(result_1).toBeTruthy();
    }));
}));
