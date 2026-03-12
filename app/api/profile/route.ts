import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "auth-token";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    email: "test@gmail.com",
  });
}
