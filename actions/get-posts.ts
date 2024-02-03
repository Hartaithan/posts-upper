"use server";

import { getPosts } from "@/requests/posts";
import type { Post } from "@/models/PostModel";
import type { Action } from "@/models/ResponseModel";
import { getActiveCookies } from "@/requests/cookies";

type SuccessfulResponse = Post[];

interface FailedResponse {
  message?: string;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export const getActivePosts = async (): Promise<Response> => {
  try {
    const cookies = await getActiveCookies();
    if (!cookies) {
      return { status: 400, data: { message: "Необходимо авторизоваться" } };
    }
    const posts = await getPosts(cookies.value);
    if (posts.result === "error") {
      return { status: 400, data: { message: "Не удалось получить посты" } };
    }
    return { status: 200, data: posts.data };
  } catch (error) {
    return {
      status: 400,
      data: {
        message: "Неизвестная ошибка",
      },
    };
  }
};
