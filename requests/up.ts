import { API_URL } from "@/lib/constants";
import { getAuthHeaders } from "@/lib/headers";
import type { Post } from "@/models/PostModel";
import type { PostsUpStatus } from "@/models/UpModel";

export const postsUp = async (
  posts: Post[],
  cookies: string,
): Promise<PostsUpStatus> => {
  if (posts.length === 0) {
    console.info("[POSTS_UP]: empty");
    return "up_empty";
  }

  const headers = getAuthHeaders(cookies);

  try {
    console.info("[POSTS_UP]: starting");
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const index = i + 1;

      await fetch(
        `${API_URL}/v3/status?action=deactivate&postId=${post.id}&reason_code=310`,
        {
          headers,
          cache: "no-cache",
        },
      );
      console.info(`[POSTS_UP_${index}]: deactivate ${post.id} complete`);

      await fetch(`${API_URL}/v3/status?action=activate&postId=${post.id}`, {
        headers,
        cache: "no-cache",
      });
      console.info(`[POSTS_UP_${index}]: activate ${post.id} complete`);
    }
  } catch (error) {
    console.error("[POSTS_UP]: error", error);
    return "up_error";
  }

  console.info("[POSTS_UP]: complete");
  return "up_completed";
};
