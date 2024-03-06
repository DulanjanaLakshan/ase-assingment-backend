import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogPost } from "./blog-post.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateBlogPost, UpdateBlogPost } from "./blog-post.input";
import { NotFoundError } from "rxjs";

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost) private blogPostRepository: Repository<BlogPost>
  ) {}

  async getAllBlogPost(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  async getBlogPostId(id: string): Promise<BlogPost> {
    return this.blogPostRepository.findOne({ id } as FindOneOptions<BlogPost>);
  }

  async saveBlogPost(createBlogPost: CreateBlogPost): Promise<BlogPost> {
    const { title, body, tags, author } = createBlogPost;

    const blogPost = this.blogPostRepository.create({
      title,
      body,
      tags,
      author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return this.blogPostRepository.save(blogPost);
  }

  async updateBlogPost(
    id: string,
    updatedData: UpdateBlogPost
  ): Promise<BlogPost> {
    const blog = await this.blogPostRepository.findOne({ id } as FindOneOptions<
      BlogPost
    >);

    if (!blog) {
        throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
    Object.assign(blog, {
      ...updatedData,
      updatedAt: new Date(),
    });

    return this.blogPostRepository.save(blog);
  }

  async deleteBlogPost(id: string): Promise<string> {
    this.blogPostRepository.delete({id});
    return "delete Sucsess...!";
  }
}
