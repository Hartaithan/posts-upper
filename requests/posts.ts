import type { PostsResponse } from "@/models/PostModel";
import { getAuthHeaders } from "../lib/headers";
import { POSTS_URL } from "../lib/constants";

export const getPosts = async (
  cookies: string,
  type = "active",
  limit = 20,
  offset = 0,
): Promise<PostsResponse> => {
  let data: PostsResponse = { result: "error", data: [], code: 0, msg: "" };

  try {
    console.info("[GET_POSTS]: request");
    const headers = getAuthHeaders(cookies);
    const response = await fetch(
      `${POSTS_URL}/v4/profile/posts/${type}?limit=${limit}&offset=${offset}`,
      {
        headers,
        cache: "no-cache",
      },
    );
    data = await response.json();
    if (!response.ok) return data;
  } catch (error) {
    console.error("[GET_POSTS]: error", error);
    return data;
  }

  console.info("[GET_POSTS]: complete");
  return data;
};
