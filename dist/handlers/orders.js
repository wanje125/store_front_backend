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
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const list = new orders_1.OrderList();
// handler functions here
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield list.index(req.params.user_id);
    res.json(products);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // @ts-ignore
        const user_id = req.params.user_id;
        const order = {
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            // @ts-ignore
            user_id: parseInt(user_id),
            status: req.body.status
        };
        const newOrder = yield list.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
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
    }
};
const OrderRoutes = (app) => {
    // Express routes here
    app.get("/users/:user_id/orders", verifyAuthToken, index);
    app.post("/users/:user_id/orders", verifyAuthToken, create);
};
exports.default = OrderRoutes;
