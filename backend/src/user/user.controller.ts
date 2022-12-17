import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.user(Number(id));
  }

  @Get()
  async users(): Promise<User[]> {
    return this.userService.allUsers();
  }

  @Post()
  async createUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(userData);
  }
}
