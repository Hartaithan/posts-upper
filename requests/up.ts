import { API_URL } from "@/lib/constants";
import { getAuthHeaders } from "@/lib/headers";
import type { Post } from "@/models/PostModel";
import type { PostsUpStatus } from "@/models/UpModel";

export const postUp = async (cookies: string, post: Post, index: number) => {
  const headers = getAuthHeaders(cookies);
  await fetch(
    `${API_URL}/v3/status?action=deactivate&postId=${post.id}&reason_code=310`,
    {
      headers,
      cache: "no-cache",
    },
  );
  await fetch(`${API_URL}/v3/status?action=activate&postId=${post.id}`, {
    headers,
    cache: "no-cache",
  });
  console.info(`[POSTS_UP_${index + 1}]: post ${post.id} up complete`);
};

export const postsUp = async (
  posts: Post[],
  cookies: string,
): Promise<PostsUpStatus> => {
  if (posts.length === 0) {
    console.info("[POSTS_UP]: empty");
    return "up_empty";
  }

  const requests = [];
  for (let index = 0; index < posts.length; index++) {
    const post = posts[index];
    requests.push(postUp(cookies, post, index));
  }

  try {
    console.info("[POSTS_UP]: request");
    await Promise.all(requests);
  } catch (error) {
    console.error("[POSTS_UP]: error", error);
    return "up_error";
  }

  console.info("[POSTS_UP]: complete");
  return "up_completed";
};
