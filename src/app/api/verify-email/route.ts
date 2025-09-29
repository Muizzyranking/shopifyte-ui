import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { API_URL } from "@/constants";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { token } = data;
    if (!token) {
      return NextResponse.json(
        {
          message: "Verification token is required.",
          status: "error",
        },
        { status: 400 },
      );
    }
    const backendResponse = await fetch(`${API_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const responseData = await backendResponse.json();

    if (!responseData.ok) {
      return NextResponse.json(
        {
          message: responseData.message || "Email verification failed.",
          status: "error",
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(
      {
        message: responseData.message || "Email verified successfully.",
        status: "success",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "An error occurred while verifying email.",
        status: "error",
      },
      { status: 500 },
    );
  }
}
