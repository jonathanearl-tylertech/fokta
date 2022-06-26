import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ConflictException, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { ApiConflictResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { MongoExceptionFilter } from 'src/filters/mongo-exception.filter';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse({ type: User })
  @UseFilters(MongoExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiQuery({ name: 'email', type: String, required: false })
  @ApiQuery({ name: 'firstName', type: String, required: false })
  @ApiQuery({ name: 'lastName', type: String, required: false })
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: User })
  @UseFilters(MongoExceptionFilter)
  @Get()
  async findAll(@Query() searchUserDto: SearchUserDto) {
    return this.usersService.findAll(searchUserDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseFilters(MongoExceptionFilter)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
