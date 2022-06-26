import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { EncryptService } from "./services/encrypt.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const hash = await this.encrypt.hash(createUserDto.password);
    return this.user.create({ ...createUserDto, password: hash });
  }

  async findAll(searchUserDto: SearchUserDto) {
    const { email, firstName, lastName } = searchUserDto;
    const filter: FilterQuery<UserDocument> = {};
    if (email) filter.email = new RegExp(email, "i");
    if (firstName) filter.firstName = new RegExp(firstName, "i");
    if (lastName) filter.lastName = new RegExp(lastName, "i");
    return this.user.find(filter);
  }

  async findOne(id: string) {
    return this.user.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.user.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.user.findByIdAndDelete(id);
  }

  constructor(
    private readonly encrypt: EncryptService,
    @InjectModel(User.name) private readonly user: Model<UserDocument>
  ) {}
}
