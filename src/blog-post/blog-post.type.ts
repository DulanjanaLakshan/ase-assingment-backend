import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("BlogPost")
export class BlogPostType {
    @Field((type) => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field((type) => [String])
    tags: string[];

    @Field()
    author: string;

    @Field()
    createdAt: string;

    @Field()
    updatedAt: string;
}
