import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateCommentInput, UpdateCommentInput } from "./comment.input";
import { v4 as uuid } from "uuid";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}

  async getAllComment(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async getCommentById(id: string): Promise<Comment> {
    return this.commentRepository.findOne({ id } as FindOneOptions<Comment>);
  }

  async getCommentByBlogPostId(blogId: string): Promise<Comment> {
    return this.commentRepository.findOne({ blogId } as FindOneOptions<
      Comment
    >);
  }

  async createComment(
    createCommentInput: CreateCommentInput
  ): Promise<Comment> {
    const { author, blogId, comment } = createCommentInput;
    const saveCommentDetails = this.commentRepository.create({
      id: uuid(),
      author,
      blogId,
      comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return this.commentRepository.save(saveCommentDetails);
  }

  async updateComment(
    id: string,
    updateCommentInput: UpdateCommentInput
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      id,
    } as FindOneOptions<Comment>);

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    Object.assign(comment, {
      ...updateCommentInput,
      updatedAt: new Date().toISOString(),
    });

    return this.commentRepository.save(comment);
  }

  async deletCommetnById(id: string): Promise<string> {
    const comment = await this.commentRepository.findOne({
        id,
      } as FindOneOptions<Comment>);
    if (comment !== null) {
      this.commentRepository.delete({ id });
      return "Comment delete sucsses...!";
    }
    return "Comment not deleted, check comment...";
  }
}
