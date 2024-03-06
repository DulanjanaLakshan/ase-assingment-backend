import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { User } from "src/user/user.entity";

@InputType()
export class CreateBlogPost {
  @MinLength(1)
  @Field()
  title: string;

  @MinLength(1)
  @Field()
  body: string;

  @MinLength(1)
  @Field()
  tags: string[];

  @MinLength(1)
  @Field()
  author: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}

@InputType()
export class UpdateBlogPost {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;

  @Field({ nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
