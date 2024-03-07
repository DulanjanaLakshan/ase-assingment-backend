import { Field, InputType } from "@nestjs/graphql";
import { IsEmail,  MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @MinLength(1)
  @Field()
  firstName: string;

  @MinLength(1)
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @MinLength(1)
  @Field()
  password: string;

  @MinLength(1)
  @Field()
  username: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

@InputType()
export class LoginUserInput {
  @MinLength(1)
  @Field()
  email: string;

  @MinLength(1)
  @Field()
  password: string;
}