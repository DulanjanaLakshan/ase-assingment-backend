import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateCommentInput {
  @MinLength(1)
  @Field()
  comment: string;

  @MinLength(1)
  @Field()
  author: string;
  
  @MinLength(1)
  @Field()
  blogId: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}

@InputType()
export class UpdateCommentInput {
  @Field({ nullable: true })
  comment?: string;

  @Field({ nullable: true })
  author: string;
  
  @Field({ nullable: true })
  blogId: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
