import { getActiveCookies } from "@/lib/auth";
import { API_URL } from "@/lib/constants";
import { getAuthHeaders } from "@/lib/headers";
import type { Post } from "@/models/PostModel";
import type { Action } from "@/models/ResponseModel";

type SuccessfulResponse = Post[];

interface FailedResponse {
  message?: string;
}

type Response = Action<200, SuccessfulResponse> | Action<400, FailedResponse>;

export const getPosts = async (
  type = "active",
  limit = 20,
  offset = 0,
): Promise<Response> => {
  try {
    const cookies = await getActiveCookies();
    if (!cookies)
      return { status: 400, data: { message: "Необходимо авторизоваться" } };
    const headers = getAuthHeaders(cookies.value);
    const response = await fetch(
      `${API_URL}/v4/profile/posts/${type}?limit=${limit}&offset=${offset}`,
      {
        headers,
        cache: "no-cache",
      },
    );
    const data = await response.json();
    if (!response.ok) return { status: 400, data };
    return { status: 200, data };
  } catch (error) {
    return {
      status: 400,
      data: {
        message: "Неизвестная ошибка",
      },
    };
  }
};
