import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MOCK_EMAIL = process.env.EMAIL;
const MOCK_PASSWORD = process.env.PASSWORD;
const COOKIE_NAME = "auth-token";
const TOKEN = "mock-jwt-token-" + Date.now();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.headers.set("X-Auth-Token", TOKEN);
    response.headers.set("Authorization", `Bearer ${TOKEN}`);
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
