import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const userId = params.userId;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
