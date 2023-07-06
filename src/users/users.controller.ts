import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
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
        user,
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

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.findOne(id);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
