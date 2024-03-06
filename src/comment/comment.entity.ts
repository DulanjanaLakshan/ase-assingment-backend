import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Comment {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  comment: string;

  @Column()
  author: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
