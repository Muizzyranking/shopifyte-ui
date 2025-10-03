import { type NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/constants";

interface LoginData {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const loginData = await request.json();
    const { email, password }: LoginData = loginData;
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required.",
          status: "error",
        },
        { status: 400 },
      );
    }
    const backEndResponse = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const responseData = await backEndResponse.json();
    if (backEndResponse.ok) {
      return NextResponse.json(
        {
          message: responseData.message || "Login successful.",
          status: "success",
          data: responseData.data || {},
        },
        { status: responseData.status || 200 },
      );
    }

    return NextResponse.json(
      {
        message: responseData.message || "Login failed.",
        status: "error",
        errors: responseData.errors || {},
      },
      { status: backEndResponse.status || 400 },
    );
  } catch (_) {
    return NextResponse.json(
      {
        message: "Internal Server Error. Please try again later.",
        status: "error",
      },
      { status: 500 },
    );
  }
}
