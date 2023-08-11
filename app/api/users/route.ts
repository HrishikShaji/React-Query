import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (request: NextRequest) => {
  const page = Number(request.nextUrl.searchParams.get("page"));
  try {
    const users = await prisma.user.findMany({
      skip: page === 0 ? 0 : page * 1,
      take: 1,
    });
    console.log(users);
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
