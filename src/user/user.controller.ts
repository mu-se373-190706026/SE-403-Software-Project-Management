import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user-create.dto';
import { LoginUserDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signUp')
  async signUp(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
  @Get('allUsers')
  async getAll() {
    return await this.userService.findAll();
  }
  @Get(':username')
  async getUser(@Param('username') username) {
    return await this.userService.findOneUser(username);
  }
  @Put('update/:id')
  async updateUser(@Body() user: CreateUserDto, @Param('id') userId) {
    return await this.userService.updateUser(user, userId)
  }
  @Delete('delete/:username')
  async deleteUser(@Param('username') userName) {
    return await this.userService.deleteUser(userName)
  }
  @Post('login')
  async login(@Body() userData: LoginUserDto) {
    return await this.userService.login(userData)
  }

}
