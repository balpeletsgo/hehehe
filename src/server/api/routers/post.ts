import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { postSchema } from "@/server/schema/post-schema";
import { TRPCError } from "@trpc/server";
import { ZodError } from "zod";

export const postRouter = createTRPCRouter({
  getPosts: publicProcedure.query(async ({ ctx }) => {
    try {
      const posts = await ctx.db.posts.findMany({
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          post: true,
          createdAt: true,
          author: {
            select: {
              firstName: true,
              lastName: true,
              username: true,
            },
          },
        },
        take: 10,
      });

      return {
        success: true,
        message: "Posts fetched successfully",
        data: posts,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch posts",
        cause: error,
      });
    }
  }),

  create: protectedProcedure
    .input(postSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { post } = input;

        await ctx.db.posts.create({
          data: {
            post: post,
            author: { connect: { id: ctx.session.user.id } },
          },
        });

        return {
          success: true,
          message: "Post created successfully",
        };
      } catch (error) {
        if (error instanceof ZodError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: error.message,
            cause: error,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create post",
          cause: error,
        });
      }
    }),
});
