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
    try {
        // @ts-ignore
        const product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category || ''
        };
        const newProduct = yield list.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield list.delete(req.body.id);
    res.json(deleted);
});
const ProductRoutes = (app) => {
    // Express routes here
    app.get("/products", index);
    app.get("products/:id", show);
    app.post("/products", create);
    app.delete("/products/:id", destroy);
};
exports.default = ProductRoutes;
