import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const COOKIE_NAME = "auth-token";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    redirect("/profile");
  }
  redirect("/login");
}
