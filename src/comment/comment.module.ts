import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRepolver } from './comment.resolver';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentRepolver,CommentService]
})
export class CommentModule {}
