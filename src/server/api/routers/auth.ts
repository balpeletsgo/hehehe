import { registerSchema } from "@/server/schema/auth-schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, username, email, password } = input;

      const isUsernameTaken = await ctx.db.user.findFirst({
        where: {
          username,
        },
      });

      if (isUsernameTaken) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username is already taken",
        });
      }

      const isEmailTaken = await ctx.db.user.findFirst({
        where: {
          email,
        },
      });

      if (isEmailTaken) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email is already taken",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await ctx.db.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
        },
      });

      return {
        success: true,
        message: "Registered successfully",
      };
    }),
});
