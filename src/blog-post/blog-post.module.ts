import { Module } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './blog-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPostRepolver } from './blog-post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  providers: [BlogPostRepolver,BlogPostService]
})
export class BlogPostModule {}
