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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSecret = process.env.TOKEN_SECRET;
const list = new users_1.UserList();
// handler functions here
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield list.index();
    res.json(products);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield list.show(req.params.id);
    res.json(products);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const user = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
    };
    try {
        const newUser = yield list.create(user);
        // @ts-ignore
        const token = yield jsonwebtoken_1.default.sign({ user: newUser }, tokenSecret);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        // @ts-ignore
        res.json(err + user);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password,
    };
    try {
        const u = yield list.authenticate(user.firstName, user.lastName, user.password);
        // @ts-ignore
        const token = jsonwebtoken_1.default.sign({ user: u }, tokenSecret);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
});
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        // @ts-ignore
        const token = authorizationHeader.split(' ')[1];
        // @ts-ignore
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        next();
    }
    catch (error) {
        res.status(401);
        res.json(`could not access,  your token is invalid . Error${error}`);
    }
};
const UserRoutes = (app) => {
    // Express routes here
    app.get("/users", verifyAuthToken, index);
    app.get("users/:id", verifyAuthToken, show);
    app.post("/users", create);
    app.post("/login", login);
};
exports.default = UserRoutes;
