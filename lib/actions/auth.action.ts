"use server";

import { auth, db } from "@/app/firebase/admin";

import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email, password } = params;
  try {
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please log in instead.",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      password,
      createdAt: new Date(),
    });
    return {
      success: true,
      message: "User created successfully. Please sign in",
    };
  } catch (e: any) {
    console.error("Error signing up:", e);
    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "Email already in use. Please use a different email address.",
      };
    }
    return {
      success: false,
      message: "An error occurred during sign-up. Please try again later.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, password } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up.",
      };
    }
    await setSessionCookie(userRecord.uid);
  } catch (e: any) {
    console.error("Error signing in:", e);
    return {
      success: false,
      message: "Failed to sign in. Please try again later.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
