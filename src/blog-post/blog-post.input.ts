import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateBlogPostInput {
  @MinLength(1)
  @Field()
  title: string;

  @MinLength(1)
  @Field()
  body: string;

  @MinLength(1)
  @Field()
  image: string;

  @MinLength(1)
  @Field()
  author: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

@InputType()
export class UpdateBlogPostInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  author?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
