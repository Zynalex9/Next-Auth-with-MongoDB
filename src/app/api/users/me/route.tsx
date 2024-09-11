import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-passsword");
  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
