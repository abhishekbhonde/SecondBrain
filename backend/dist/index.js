"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const cors_1 = __importDefault(require("cors"));
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userSchema = zod_1.z.object({
  username: zod_1.z.string().email(),
  password: zod_1.z.string().min(6),
});
app.post("/api/v1/signup", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = userSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Invalid input",
      });
      return;
    }
    const { username, password } = parsedData.data;
    try {
      const hashedPassword = yield bcrypt_1.default.hash(password, 10);
      yield db_1.UserModel.create({
        username: username,
        password: hashedPassword,
      });
      res.json({
        message: "User signed up",
      });
    } catch (e) {
      res.status(411).json({
        message: "User already exists",
      });
    }
  }),
);
app.post("/api/v1/signin", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { username, password } = req.body;
      const response = yield db_1.UserModel.find({
        username,
      });
      const storedPassword = yield bcrypt_1.default.compare(
        password,
        response[0].password,
      );
      if (username && storedPassword) {
        const token = jsonwebtoken_1.default.sign(
          {
            username,
          },
          process.env.JWT_PASSWORD,
        );
        res.status(200).json({ message: "Signin successful", token });
      }
    } catch (error) {
      res.status(500).json({
        message: "signin unsuccessful",
      });
    }
  }),
);
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    try {
      const content = yield db_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: [],
      });
      res.json({
        message: "Content added",
        content,
      });
    } catch (error) {
      res.json({
        message: "error in adding cotent",
      });
    }
  }),
);
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    try {
      const content = yield db_1.ContentModel.find({
        userId: userId,
      }).populate("userId", "username");
      res.json({
        content,
      });
    } catch (error) {
      res.json({
        message: "error in fetching data",
      });
    }
  }),
);
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    try {
      yield db_1.ContentModel.deleteMany({
        contentId,
        userId: req.userId,
      });
      res.json({
        message: "Deleted",
      });
    } catch (error) {
      res.json({
        message: "error in deleting data",
      });
    }
  }),
);
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
      const existingLink = yield db_1.LinkModel.findOne({
        userId: req.userId,
      });
      if (existingLink) {
        res.json({
          hash: existingLink.hash,
        });
        return;
      }
      const hash = (0, utils_1.random)(10);
      yield db_1.LinkModel.create({
        userId: req.userId,
        hash: hash,
      });
      res.json({
        hash,
      });
    } else {
      yield db_1.LinkModel.deleteOne({
        userId: req.userId,
      });
      res.json({
        message: "Removed link",
      });
    }
  }),
);
app.get("/api/v1/brain/:shareLink", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
      hash,
    });
    if (!link) {
      res.status(411).json({
        message: "Sorry incorrect input",
      });
      return;
    }
    // userId
    const content = yield db_1.ContentModel.find({
      userId: link.userId,
    });
    console.log(link);
    const user = yield db_1.UserModel.findOne({
      _id: link.userId,
    });
    if (!user) {
      res.status(411).json({
        message: "user not found, error should ideally not happen",
      });
      return;
    }
    res.json({
      username: user.username,
      content: content,
    });
  }),
);
app.listen(3001);
