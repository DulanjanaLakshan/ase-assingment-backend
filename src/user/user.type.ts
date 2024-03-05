import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  username: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
