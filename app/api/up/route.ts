import type { UpResponse } from "@/models/UpModel";
import { getActiveCookies } from "@/requests/cookies";
import { getPosts } from "@/requests/posts";
import { postsUp } from "@/requests/up";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (): Promise<NextResponse<UpResponse>> => {
  const cookies = await getActiveCookies();
  if (cookies === null) {
    return NextResponse.json(
      { message: "Не удалось получить куки!", status: "cookies_not_found" },
      { status: 400 },
    );
  }

  const posts = await getPosts(cookies.value);
  if (posts.result === "error") {
    return NextResponse.json(
      { message: "Не удалось получить посты!", status: "get_posts_error" },
      { status: 400 },
    );
  }

  const upStatus = await postsUp(posts.data, cookies.value);
  if (upStatus === "up_empty") {
    return NextResponse.json(
      { message: "Нет активных постов!", status: upStatus },
      { status: 200 },
    );
  }
  if (upStatus === "up_completed") {
    return NextResponse.json(
      { message: "Посты успешно подняты!", status: upStatus },
      { status: 200 },
    );
  }
  if (upStatus === "up_error") {
    return NextResponse.json(
      { message: "Не удалось поднять посты!", status: upStatus },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Что-то пошло не так!", status: "unknown" },
    { status: 400 },
  );
};
