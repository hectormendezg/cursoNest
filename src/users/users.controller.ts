import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  /* Peticiones http */
  @Get()
  getUsers(): Promise<User[]> {
    //==> Indica que va a devolver un array de usuarios 😱
    return this.usersService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    /* console.log(id);
    console.log(typeof id); */
    return this.usersService.getUser(id);
  }
  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    //==> Devuelve solo un usuario 😱
    return this.usersService.createUser(newUser);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }
}
