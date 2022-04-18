import { PrismaClient } from "@prisma/client";
import { Arg, Mutation, ObjectType, Query } from "type-graphql";
import { User } from "../models/User";

const prisma = new PrismaClient();

@ObjectType()
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await prisma.user.findMany();
    return users;
  }

  @Query(() => User)
  async user(@Arg("id") id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  @Mutation(() => User)
  async createUser(@Arg("name") name: string, @Arg("email") email: string) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return user;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: string,
    @Arg("name") name: string,
    @Arg("email") email: string
  ) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    return user;
  }

  @Mutation(() => String)
  async deleteUser(@Arg("id") id: string) {
    await prisma.user.delete({
      where: { id },
    });
    return "User deleted";
  }
}
