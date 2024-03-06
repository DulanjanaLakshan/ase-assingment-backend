import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { UserType } from "./user.type";
import { UserService } from "./user.service";
import { CreateUserInput, SignInInput, UpdateUserInput } from "./user.input";
import { User } from "./user.entity";
import { NotFoundException } from "@nestjs/common";

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [UserType])
  async users() {
    return this.userService.getAllUsers();
  }

  @Query((returns) => UserType)
  async user(@Args("id") id: string) {
    return await this.userService.getUserById(id);
  }

  @Mutation((returns) => UserType)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.saveUser(createUserInput);
  }

  @Mutation((returns) => UserType)
  async updateUser(
    @Args("id") id: string,
    @Args("updateUserData") updateUserData: UpdateUserInput
  ): Promise<User> {
    const user = await this.userService.updateUser(id, updateUserData);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }
    return user;
  }

  @Mutation((returns) => UserType)
  async signIn(@Args("signInInput") signInInput: SignInInput): Promise<UserType> {
    const user = await this.userService.signIn(signInInput);
    delete user.password;
    return user;
  }
}
