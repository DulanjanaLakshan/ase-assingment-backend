import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @MinLength(1)
  @Field()
  firstName: string;

  @MinLength(1)
  @Field()
  lastName: string;

  @MinLength(1)
  @Field()
  email: string;

  @MinLength(1)
  @Field()
  password: string;

  @MinLength(1)
  @Field()
  username: string;

  @IsDateString()
  @Field({ nullable: true })
  createdAt?: string;

  @IsDateString()
  @Field({ nullable: true })
  updatedAt?: string;
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
export class SignInInput {
  @IsNotEmpty()
  @Field()
  username: string;

  @IsNotEmpty()
  @Field()
  password: string;
}