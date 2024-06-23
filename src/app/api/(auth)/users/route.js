import connectDB from "/lib/db";
import User from "/lib/modals/user";
import { NextResponse } from "next/server";

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

export const POST = async () => {
  try {
    await connectDB();
    const user = new User({
      email: "email@hotmail.com",
      username: "username",
      password: "password",
    });
    await user.save();
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new NextResponse("Error in creating user " + error.message, {
      status: 500,
    });
  }
};
