import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { API_URL } from "@/constants";
import type { BackendRegisterResponse, RegisterData } from "@/types/auth.types";

interface RegisterResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const registerData: RegisterData = await request.json();
    const { email, username, firstName, lastName, phoneNumber, password, confirmPassword } =
      registerData;

    if (
      !email ||
      !username ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          message: "All fields are required.",
          errors: {
            general: ["All fields are required."],
          },
        } as RegisterResponse,
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords do not match.",
          errors: {
            password: ["Passwords do not match."],
            confirmPassword: ["Passwords do not match."],
          },
        } as RegisterResponse,
        { status: 400 },
      );
    }

    const backendResponse = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        username,
        phone_number: phoneNumber,
        password,
        confirm_password: confirmPassword,
      }),
    });

    const responseData = (await backendResponse.json()) as BackendRegisterResponse;

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          message: responseData.message,
          errors: responseData.errors,
        } as RegisterResponse,
        { status: backendResponse.status },
      );
    }

    if (backendResponse.status === 202) {
      // Registration successful but email not sent
      return NextResponse.json(
        {
          message:
            "Registration successful! Please check your email for verification. You may need to wait or click resend if you don't receive it.",
        } as RegisterResponse,
        { status: 202 },
      );
    }

    return NextResponse.json(
      {
        message: "Registration successful! Please check your email for verification.",
      } as RegisterResponse,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred.",
        errors: {
          general: ["An unexpected error occurred during registration. Please try again later."],
        },
      } as RegisterResponse,
      { status: 500 },
    );
  }
}
