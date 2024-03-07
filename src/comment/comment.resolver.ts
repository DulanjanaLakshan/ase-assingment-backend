import { Query, Resolver } from "@nestjs/graphql";
import { CommentType } from "./comment.type";
import { CommentService } from "./comment.service";

@Resolver((of) => CommentType)
export class CommentRepolver {
    constructor(private commentService:CommentService){}

    @Query((returns)=>[CommentType])
    async getAllComment(){
        return this.commentService.getAllComment();
    }
}