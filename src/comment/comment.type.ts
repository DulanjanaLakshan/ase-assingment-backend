import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("Comment")
export class CommentType {
  @Field((type) => ID)
  id: string;

  @Field()
  comment: string;

  @Field()
  author: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
