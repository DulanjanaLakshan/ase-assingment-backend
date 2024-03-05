import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { FindOneOptions, In, Repository } from "typeorm";
import { CreateUserInput, UpdateUserInput } from "./user.input";
import { v4 as uuid } from "uuid";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async saveUser(createUserInput: CreateUserInput): Promise<User> {
    const {
      firstName,
      lastName,
      email,
      password,
      username,
    } = createUserInput;
    const user = this.userRepository.create({
      id: uuid(),
      firstName,
      lastName,
      email,
      username,
      password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return this.userRepository.save(user);
  }

  async updateUser(id: string, updatedData: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ id } as FindOneOptions<User>);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, {
      ...updatedData,
      updatedAt: new Date(),
    });

    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id } as FindOneOptions<User>);
  }
}
