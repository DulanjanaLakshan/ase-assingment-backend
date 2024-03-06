import { Query, Resolver } from "@nestjs/graphql";
import { BlogPostService } from "./blog-post.service";
import { BlogPostType } from "./blog-post.type";

@Resolver((of) => BlogPostType)
export class BlogPostResolver {
  constructor(private blogPostService: BlogPostService) {}

  @Query((returns) => [BlogPostType])
  async BlogPost() {
    return this.blogPostService.getAllBlogPost();
  }
}
