import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("BlogPsot")
export class BlogPostType {
  @Field((type) => ID)
  id: string;
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  image: string;

  @Field()
  author: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
