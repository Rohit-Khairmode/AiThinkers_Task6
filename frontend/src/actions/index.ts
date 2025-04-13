"use server";

import { cookies } from "next/headers";

export async function removeUserCookies() {
  console.log("removing cookies");
  (await cookies()).delete("access_token").delete("refresh_token");
}
