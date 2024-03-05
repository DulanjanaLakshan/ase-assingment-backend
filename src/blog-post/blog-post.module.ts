import { Module } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';

@Module({
  providers: [BlogPostService]
})
export class BlogPostModule {}
