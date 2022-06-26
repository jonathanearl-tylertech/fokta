import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { PasswordService } from 'src/services/password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly user: Model<UserDocument>,
    private readonly pwd: PasswordService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hash = await this.pwd.hash(createUserDto.password);
    const user = await this.user.create({ ...createUserDto, password: hash })
    return user.toObject();
  }

  async findAll(searchUserDto: SearchUserDto) {
    const { email, firstName, lastName } = searchUserDto;
    const filter: FilterQuery<UserDocument> = {};
    if (email) filter.email = new RegExp(email, 'i');
    if (firstName) filter.firstName = new RegExp(firstName, 'i');
    if (lastName) filter.lastName = new RegExp(lastName, 'i');
    return await this.user.find(filter).lean();
  }

  async findOne(id: string) {
    return await this.user.findOne({ id }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.user.findOneAndUpdate({ id }, updateUserDto).lean();
  }

  async remove(id: string) {
    return await this.user.findOneAndRemove({ id }).lean();
  }
}
