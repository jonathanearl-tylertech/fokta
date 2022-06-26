import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { MongoExceptionFilter } from "src/filters/mongo-exception.filter";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UserDto } from "./dto/user.dto";

@ApiTags("users")
@Controller("users")
@UseFilters(MongoExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse({ type: UserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: "email", type: String, required: false })
  @ApiQuery({ name: "firstName", type: String, required: false })
  @ApiQuery({ name: "lastName", type: String, required: false })
  @ApiOkResponse({ type: UserDto, isArray: true })
  async findAll(@Query() searchUserDto: SearchUserDto) {
    return await this.usersService.findAll(searchUserDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: UserDto })
  async findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: UserDto })
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  async remove(@Param("id") id: string) {
    return await this.usersService.remove(id);
  }
}
