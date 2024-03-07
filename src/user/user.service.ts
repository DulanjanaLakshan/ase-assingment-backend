import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateUserInput, LoginUserInput } from "./user.input";
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(createUserInput:CreateUserInput):Promise<User>{
    const { firstName,lastName, username, email, password } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      id: uuid(),
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return this.userRepository.save(user);
  }

  async signIn(loginUserInput:LoginUserInput):Promise<User>{
    const { email, password } = loginUserInput;
    const user = await this.userRepository.findOne({ email } as FindOneOptions<User>);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = jwt.sign({userId:user.id},'DulanjanaJwtTocken121$',{ expiresIn: '1h' });
    delete user.password;
    return user;
  }

  async getAllUsers():Promise<User[]>{
    return this.userRepository.find();
  }

  async findUserByID(id:string):Promise<User>{
    return this.userRepository.findOne({id} as FindOneOptions<User>)
  }
}
