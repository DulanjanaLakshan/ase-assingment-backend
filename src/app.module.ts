import { Module } from "@nestjs/common";
import { BlogPostModule } from "./blog-post/blog-post.module";
import { UserModule } from "./user/user.module";
import { CommentModule } from "./comment/comment.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogPost } from "./blog-post/blog-post.entity";
import { Comment } from "./comment/comment.entity";

const uri =
  "mongodb+srv://dulanjana20013:WFSnN6CTsVY8MG2U@cypso.x4lxv8k.mongodb.net/assingment_02?retryWrites=true&w=majority&appName=Cypso";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: uri,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [BlogPost, Comment],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    BlogPostModule,
    UserModule,
    CommentModule,
  ],
  providers: [],
})
export class AppModule {}
