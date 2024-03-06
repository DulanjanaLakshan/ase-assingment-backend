import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { UserModule } from "./user/user.module";
import { BlogPostModule } from "./blog-post/blog-post.module";
import { CommentModule } from "./comment/comment.module";
import { BlogPost } from "./blog-post/blog-post.entity";

const uri =
  "mongodb+srv://dulanjana20013:WFSnN6CTsVY8MG2U@cypso.x4lxv8k.mongodb.net/assingment?retryWrites=true&w=majority&appName=Cypso";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: uri,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, BlogPost],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UserModule,
    BlogPostModule,
    CommentModule,
  ],
})
export class AppModule {}
