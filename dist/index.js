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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const JWT_SECRET = process.env.JWT_SECRET;
const UserSchema = zod_1.z.object({
    username: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = UserSchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(400).json({
            error: "validation error"
        });
    }
    const { username, password } = validationResult.data;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield db_1.User.create({
        username,
        password: hashedPassword
    });
    res.status(201).json({
        message: "user created successfully", user
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const response = yield db_1.User.find({
            username
        });
        const storedPassword = yield bcrypt_1.default.compare(password, response[0].password);
        if (username && storedPassword) {
            const token = jsonwebtoken_1.default.sign({
                username
            }, JWT_SECRET);
            res.status(200).json({ message: "Signin successful", token });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "signin unsuccessful"
        });
    }
}));
app.post("/api/v1/content", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const content = yield db_1.Content.create({
        link,
        type,
        // @ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "content added successfully", content
    });
}));
app.get("/api/v1/content", middleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.body.userId;
    // const response = await Content.find({
    //     userId
    // })
}));
app.delete("/api/v1/content:id", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3000);
