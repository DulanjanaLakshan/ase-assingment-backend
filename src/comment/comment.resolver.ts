import { Resolver } from "@nestjs/graphql";
import { CommentType } from "./comment.type";

@Resolver((of) => CommentType)
export class CommentRepolver {}