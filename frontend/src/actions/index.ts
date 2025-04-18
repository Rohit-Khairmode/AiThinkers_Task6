"use server";

import { cookies } from "next/headers";

export async function removeUserCookies() {
  (await cookies()).delete("access_token").delete("refresh_token");
}
