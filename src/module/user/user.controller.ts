import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/helpers/decorator.helper';
import { UserRoleGuard } from 'src/guards/user-role.guard';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('orderBy') orderBy: keyof User,
    @Query('orderType') orderType: 'ASC' | 'DESC' = 'DESC',
    @Query() q: any,
  ) {
    const order = orderBy ? { [orderBy]: orderType } : { id: 'DESC' as 'ASC' | 'DESC' };
    const user = await this.userService.findAll(page, pageSize, q.search, order);
    const countUser = await this.userService.countRows(q.search);
      
    return {
      totalRow: countUser,
      data: user
    };
  }

  @Get(':id')
  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(+id);
  }

  @Patch(':id')
  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserRoleGuard)
  @Roles(['Admin'])
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
