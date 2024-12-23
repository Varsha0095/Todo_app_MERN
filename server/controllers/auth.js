import { createError } from "../utils/error.js";
import { connectToDB } from "../utils/connect.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  const data = req.body;
  console.log(data);
  if (!data.email || !data.password) {
    return next(createError(400, "Missing fields!"));
  }
  await connectToDB();
  // if the user is already registered
  const alreadyRegistered = await User.exists({ email: data.email });
  if (alreadyRegistered) {
    return next(createError(400, "User already exists."));
  }
  // res.send('register');
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new User({ ...req.body, password: hash });
  await newUser.save();
  res.status(201).json("User created successfully!");
  // res.send(newUser);
}

export async function login(req, res, next) {
  const data = req.body;
  console.log(data);
  if (!data.email || !data.password) {
    return next(createError(400, "Missing fields!"));
  }
  await connectToDB();
  // checking if the user with the email exists in database or not
  const user = await User.findOne({ email: req.body.email });

  // if the user does not exist in database then throw error
  if (!user) return next(createError(400, "Invalid Credentials"));

  // if the user exists in db then we've to check if the password sent from FE or Postman is correct or not
  // using compare method on bcrypt for this
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );

  // if the password given by user is not correct
  if (!isPasswordCorrect) return next(createError(400, "Invalid Credentials"));

  // if the password is correct then we've to create a token and pass the token inside the cookies
  const token = jwt.sign({ id: user._id }, process.env.JWT);
  console.log(token);
  // res.send('login route!');
  // sending token in response
  res
    .cookie("access_token", token, {
      httpOnly: false,
      secure:
        process.env.NODE_ENV ===
        "development" /*setting this value to false as the value we set is development*/,
    })
    .status(200)
    .json("User logged in!");
}

export async function logout(req, res, next) {
  res
    .clearCookie("access_token", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "development",
    })
    .status(200)
    .json({ message: "Logged out successfully!" });
}
