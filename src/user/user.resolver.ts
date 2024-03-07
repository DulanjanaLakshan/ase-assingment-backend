import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserType } from "./user.type";
import { UserService } from "./user.service";
import { CreateUserInput, LoginUserInput } from "./user.input";
import { User } from "./user.entity";

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService:UserService){}

  @Query((returns)=>[UserType])
  async getAllUsers(){
    return this.userService.getAllUsers();
  }

  @Query((returns)=>UserType)
  async findUserById(@Args("id") id:string):Promise<User>{
    return this.userService.findUserByID(id);
  }

  @Mutation((returns)=>UserType)
  async signUp(@Args('createUserInput') createUserInput:CreateUserInput):Promise<User>{
    return this.userService.createUser(createUserInput);
  }

  @Mutation((returns) => UserType)
  async signIn(@Args('loginUserInput') loginUserInput: LoginUserInput): Promise<User> {
    console.log("is working");
    return this.userService.signIn(loginUserInput);
  }
}
