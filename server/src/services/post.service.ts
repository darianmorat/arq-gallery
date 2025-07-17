import { db } from "../db";
import { postsTable } from "../db/schema";

export const postService = {
   getAll: async () => {
      const posts = await db
         .select({
            id: postsTable.id,
            mediaUrl: postsTable.mediaUrl,
         })
         .from(postsTable);

      return posts;
   },
};
