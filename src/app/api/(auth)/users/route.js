import connectDB from "/lib/db";
import User from "/lib/modals/user";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
  try {
    await connectDB();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    await connectDB();
    const newUser = new User(body);
    await newUser.save();
    return new NextResponse(
      JSON.stringify({ message: "User has been created", User: newUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in creating user " + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request) => {
  try {
    const body = await request.json();
    const { userId, newUserName } = body;

    await connectDB();
    if (!userId || !newUserName) {
      return new NextResponse(
        JSON.stringify(
          { message: "Please provide User ID or new Username" },
          { status: 400 }
        )
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid User ID" }, { status: 400 })
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUserName },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }, { status: 404 })
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User has been updated", User: updatedUser }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify("Error in Patch " + error.message, { status: 500 })
    );
  }
};
