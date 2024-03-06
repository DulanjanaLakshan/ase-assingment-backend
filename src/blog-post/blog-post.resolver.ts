import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BlogPostType } from "./blog-post.type";
import { BlogPostService } from "./blog-post.service";
import { CreateBlogPostInput, UpdateBlogPostInput } from "./blog-post.input";
import { BlogPost } from "./blog-post.entity";
import { NotFoundException } from "@nestjs/common";

@Resolver((of) => BlogPostType)
export class BlogPostRepolver {
  constructor(private blogPostService: BlogPostService) {}

  @Query((returns) => [BlogPostType])
  async getAllBlogPost() {
    return this.blogPostService.getAllBlogPost();
  }

  @Query((returns) => BlogPostType)
  async findBlogPostById(@Args("id") id: string) {
    return this.blogPostService.findBlogPostById(id);
  }

  @Mutation((returns) => BlogPostType)
  async deleteBlogPost(@Args("id") id: string) {
    return this.blogPostService.deletBlogPostById(id);
  }

  @Mutation((returns) => BlogPostType)
  async createBlogPost(
    @Args("createBlogPostInput") createBlogPostInput: CreateBlogPostInput
  ): Promise<BlogPostType> {
    return this.blogPostService.createBlogPost(createBlogPostInput);
  }

  @Mutation((returns) => BlogPostType)
  async updateBlogPost(
    @Args("id") id: string,
    @Args("updateBlogPostInput") updateBlogPostInput: UpdateBlogPostInput
  ): Promise<BlogPost> {
    const blogPost = await this.blogPostService.updateBlogPost(
      id,
      updateBlogPostInput
    );
    if (!blogPost) {
      throw new NotFoundException(
        `BlogPost with ID ${id} not found after update`
      );
    }
    return blogPost;
  }
}
