import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { FindOneOptions, In, Repository } from "typeorm";
import { CreateUserInput, SignInInput, UpdateUserInput } from "./user.input";
import { v4 as uuid } from "uuid";
import * as bcrypt from 'bcrypt';

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
      updatedAt: new Date().toISOString(),
    });

    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id } as FindOneOptions<User>);
  }

  async signIn(signInInput: SignInInput): Promise<User> {
    const { username, password } = signInInput;

    const user = await this.userRepository.findOne({ username } as FindOneOptions<User>);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
