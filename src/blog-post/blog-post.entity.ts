import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class BlogPost {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  image: string;

  @Column()
  author: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
