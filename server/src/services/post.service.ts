import { db } from "../db";
import { posts } from "../db/schema";

export const postService = {
   getAll: async () => {
      const allPosts = await db
         .select({
            id: posts.id,
            mediaUrl: posts.mediaUrl,
         })
         .from(posts);

      return allPosts;
   },
};
