import {
  Entity,
  Column,
  ObjectIdColumn,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  username: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
