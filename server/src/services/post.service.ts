import { eq } from "drizzle-orm";
import { db } from "../db";
import { posts, users } from "../db/schema";

export const postService = {
   getAll: async () => {
      const allPosts = await db
         .select({
            id: posts.id,
            mediaUrl: posts.mediaUrl,
            title: posts.title,
            publicId: posts.publicId,
         })
         .from(posts);

      return allPosts;
   },

   getAllUserPosts: async (username: string) => {
      const allPosts = await db.query.users.findFirst({
         where: eq(users.username, username),
         with: {
            posts: true,
         },
      });

      return allPosts;
   },

   getByPublicId: async (publicId: string) => {
      const post = await db.query.posts.findFirst({
         where: eq(posts.publicId, publicId),
         with: {
            author: true,
            category: true,
         },
      });

      return post;
   },

   create: async (
      public_id: string,
      secure_url: string,
      resource_type: string,
      userId: string,
      categoryId: string,
      title: string,
      description: string,
   ) => {
      const post = await db
         .insert(posts)
         .values({
            publicId: public_id,
            mediaUrl: secure_url,
            resourceType: resource_type,
            authorId: userId,
            categoryId: categoryId,
            title: title,
            description: description,
         })
         .returning({
            publicId: posts.publicId,
            mediaUrl: posts.mediaUrl,
            resourceType: posts.resourceType,
            authorId: posts.authorId,
            categoryId: posts.categoryId,
            title: posts.title,
            description: posts.description,
         });

      return post;
   },

   delete: async (id: string) => {
      const [deletedPost] = await db
         .delete(posts)
         .where(eq(posts.id, id))
         .returning({ title: posts.title });

      return deletedPost;
   },
};
