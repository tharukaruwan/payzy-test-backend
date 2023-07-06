import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  NotFoundException,
  ValidationPipe,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/update-password-user.dto';
import { UsersGuard } from './users.guard';
import { omit } from 'lodash';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      const user = this.usersService.create(createUserDto);
      return omit(user, 'password');
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginUserDto: LoginUserDto) {
    try {
      const user = await this.usersService.findByEmail(loginUserDto.email);
      if (!user) throw new NotFoundException();
      const isValid = await this.usersService.comparePassword(
        loginUserDto.password,
        user.password,
      );
      if (!isValid) throw new ForbiddenException();
      const accessToken = this.usersService.signAccessTocken(user.email);
      return {
        user: omit(user, 'password'),
        accessToken,
      };
    } catch (err) {
      throw new Error();
    }
  }

  @Patch('change-password/:id')
  @UseGuards(UsersGuard)
  async changepassword(
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException();
    const isValid = await this.usersService.comparePassword(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!isValid) throw new ForbiddenException();
    return this.usersService.changePassword(id, changePasswordDto.password);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = this.usersService.findOne(id);
      return omit(user, 'password');
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
