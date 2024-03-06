import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BlogPost } from "./blog-post.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateBlogPostInput, UpdateBlogPostInput } from "./blog-post.input";
import { v4 as uuid } from "uuid";

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost) private blogPostRepository: Repository<BlogPost>
  ) {}

  async createBlogPost(
    createBlogPostInput: CreateBlogPostInput
  ): Promise<BlogPost> {
    const { title, body, image, author } = createBlogPostInput;
    const blogPost = this.blogPostRepository.create({
      id: uuid(),
      title,
      body,
      image,
      author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return this.blogPostRepository.save(blogPost);
  }

  async getAllBlogPost(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  async findBlogPostById(id: string): Promise<BlogPost> {
    return this.blogPostRepository.findOne({ id } as FindOneOptions<BlogPost>);
  }

  async deletBlogPostById(id: string): Promise<string> {
    const blog = this.blogPostRepository.findOne({ id } as FindOneOptions<
      BlogPost
    >);
    if (blog !== null) {
      this.blogPostRepository.delete({ id });
      return "blog post deleted...!";
    }
    return "blog psot not deleted, check blog...";
  }

  async updateBlogPost(
    id: string,
    updateBlogPostInput: UpdateBlogPostInput
  ): Promise<BlogPost> {
    const user = await this.blogPostRepository.findOne({ id } as FindOneOptions<
      BlogPost
    >);

    if (!user) {
      throw new NotFoundException(`Blog psot with ID ${id} not found`);
    }

    Object.assign(user, {
      ...updateBlogPostInput,
      updatedAt: new Date().toISOString(),
    });

    return this.blogPostRepository.save(user);
  }
}
