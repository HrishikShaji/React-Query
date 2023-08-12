import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (request: NextRequest) => {
  try {
    const posts = await prisma.post.findMany({});
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const post = await request.json();
  console.log(post);
  try {
    await prisma.post.create({
      data: {
        body: post.body,
        userId: post.userId,
      },
    });
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
