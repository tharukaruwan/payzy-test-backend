import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  findAll() {
    // return await this.userRepo.;
    return 'OK';
  }

  async findByEmail(email: string) {
    try {
      return await this.userRepo.findOne({ where: { email: email } });
    } catch {
      return null;
    }
  }

  async findOne(id: number) {
    try {
      // return await this.userRepo.findOneById(id);
      return await this.userRepo.findOne({ where: { id: id } });
    } catch {
      return null;
    }
  }

  async changePassword(id: number, password: string) {
    try {
      const hashedpass: string = await bcrypt.hash(password, 10);
      await this.userRepo.update(id, { password: hashedpass });
      return 'password changed';
    } catch (err) {
      return null;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async comparePassword(candidatePassword: string, password: string) {
    try {
      return await bcrypt.compare(candidatePassword, password);
    } catch (e) {
      return false;
    }
  }

  signAccessTocken(email: string) {
    return jwt.sign(
      {
        tockentype: 'accessTocken',
        usertype: 'user',
        email: email,
      },
      String(process.env.PRIVATEKEY_ACCESSTOCKEN),
      {
        expiresIn: process.env.ACCESSTOKENTTL,
      },
    );
  }
}
