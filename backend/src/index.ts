import express, { Request, Response } from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";
import { z } from "zod";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const userSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<void> => {
    const parsedData = userSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Invalid input",
      });
      return;
    }
    const { username, password } = parsedData.data;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({
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
  },
);

app.post(
  "/api/v1/signin",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password } = req.body;

      const response = await UserModel.find({
        username,
      });

      const storedPassword = await bcrypt.compare(
        password,
        response[0].password as string,
      );

      if (username && storedPassword) {
        const token = jwt.sign(
          {
            username,
          },
          process.env.JWT_PASSWORD as string,
        );

        res.status(200).json({ message: "Signin successful", token });
      }
    } catch (error) {
      res.status(500).json({
        message: "signin unsuccessful",
      });
    }
  },
);

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  try {
    const content = await ContentModel.create({
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
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  try {
    const content = await ContentModel.find({
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
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  try {
    await ContentModel.deleteMany({
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
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await LinkModel.create({
      userId: req.userId,
      hash: hash,
    });

    res.json({
      hash,
    });
  } else {
    await LinkModel.deleteOne({
      userId: req.userId,
    });

    res.json({
      message: "Removed link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({
    hash,
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input",
    });
    return;
  }
  // userId
  const content = await ContentModel.find({
    userId: link.userId,
  });

  console.log(link);
  const user = await UserModel.findOne({
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
});

app.listen(3001);
