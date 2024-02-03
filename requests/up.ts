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

  const deactivateRequests = [];
  const activateRequests = [];
  for (const post of posts) {
    deactivateRequests.push(
      fetch(
        `${API_URL}/v3/status?action=deactivate&postId=${post.id}&reason_code=310`,
        {
          headers,
          cache: "no-cache",
        },
      ).then((i) => i.json()),
    );
    activateRequests.push(
      fetch(`${API_URL}/v3/status?action=activate&postId=${post.id}`, {
        headers,
        cache: "no-cache",
      }).then((i) => i.json()),
    );
  }

  try {
    console.info("[POSTS_UP]: request");
    await Promise.all(deactivateRequests);
    await Promise.all(activateRequests);
  } catch (error) {
    console.error("[POSTS_UP]: error", error);
    return "up_error";
  }

  console.info("[POSTS_UP]: complete");
  return "up_completed";
};
