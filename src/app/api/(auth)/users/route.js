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

export const PATCH = async () => {
  try {
  } catch (error) {
    return new NextResponse("Error in Patch " + error.message, { status: 500 });
  }
};
