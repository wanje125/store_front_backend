"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor(userList) {
        const secret = process.env.JWT_SECRET;
        if (secret === undefined) {
            throw new Error("JWT_SECRET is not set");
        }
        this.jwtSecret = secret;
        this.userList = userList;
    }
    /*    async createToken(login: Login): Promise<Auth> {
            const user = await this.userList.authenticate();
            const token = jwt.sign({ user }, this.jwtSecret);
            return {
                token
            };
        }*/
    validateToken(req, resp, next) {
        try {
            const authorizationHeader = req.headers.authorization || "fallback";
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, this.jwtSecret);
            next();
        }
        catch (e) {
            resp.status(401);
            resp.send({
                message: "Unauthorized"
            });
        }
    }
}
exports.TokenService = TokenService;
