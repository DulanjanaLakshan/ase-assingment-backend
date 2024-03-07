import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommentType } from "./comment.type";
import { CommentService } from "./comment.service";
import { CreateCommentInput, UpdateCommentInput } from "./comment.input";

@Resolver((of) => CommentType)
export class CommentRepolver {
  constructor(private commentService: CommentService) {}

  @Query((returns) => [CommentType])
  async getAllComment() {
    return this.commentService.getAllComment();
  }

  @Query((returns) => CommentType)
  async findCommentById(@Args("id") id: string) {
    return this.commentService.getCommentById(id);
  }

  @Query((returns) => [CommentType])
  async findCommentByPostId(@Args("blogId") blogId: string) {
    return this.commentService.getCommentByPostId(blogId);
  }

  @Mutation((returns) => CommentType)
  async createComment(
    @Args("createCommentInput") createCommentInput: CreateCommentInput
  ) {
    return this.commentService.createComment(createCommentInput);
  }

  @Mutation((returns) => CommentType)
  async updateComment(
    @Args("id") id: string,
    @Args("updateCommentInput") updateCommentInput: UpdateCommentInput
  ) {
    return this.commentService.updateComment(id, updateCommentInput);
  }

  @Mutation(() => String)
  async deleteComment(@Args("id") id: string): Promise<string> {
    try {
      const deletedCommentId = await this.commentService.deletCommetnById(id);
      return `Comment with ID ${deletedCommentId} deleted successfully.`;
    } catch (error) {
      console.error("Error deleting comment:", error);
      return "Failed to delete comment.";
    }
  }
}
