import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery, Types } from "mongoose";
import { BcryptService } from "./services/bcrypt.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Credentials, CredentialsDocument } from "./schema/credentials.schema";
import { Profile, ProfileDocument } from "./schema/profile.schema";
import { User, UserDocument } from "./schema/user.schema";
import { ProviderService } from "./services/providers.service";

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const provider = await this.provider.findOne("FOKTA");
    const hash = await this.bcrypt.hash(
      createUserDto.credentials.password.value,
      this.bcrypt.DEFAULT_WORKFACTOR
    );
    const userId = new Types.ObjectId();
    const profile = await this.profile.create({
      ...createUserDto.profile,
      user: userId,
    });
    const credentials = await this.credentials.create({
      algorithm: this.bcrypt.DEFAULT_ALGORITHM,
      workFactor: this.bcrypt.DEFAULT_WORKFACTOR,
      value: hash,
    });
    await this.user.create({
      _id: userId,
      profile,
      credentials,
      provider,
    });
    return this.findOne(userId.toHexString());
  }

  async findAll(searchUserDto: SearchUserDto) {
    const { email, firstName, lastName } = searchUserDto;
    const filter: FilterQuery<UserDocument> = {};
    if (email) filter.profile.email = new RegExp(email, "i");
    if (firstName) filter.profile.firstName = new RegExp(firstName, "i");
    if (lastName) filter.profile.lastName = new RegExp(lastName, "i");
    return this.user
      .find(filter)
      .populate("profile")
      .populate("provider")
      .lean();
  }

  async findOne(id: string) {
    return this.user
      .findById(new Types.ObjectId(id))
      .populate("profile")
      .populate("provider")
      .lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.user
      .findByIdAndUpdate(new Types.ObjectId(id), updateUserDto)
      .populate("profile")
      .populate("provider")
      .lean();
  }

  async remove(id: string) {
    return this.user.findByIdAndDelete(new Types.ObjectId(id));
  }

  constructor(
    private readonly bcrypt: BcryptService,
    private readonly provider: ProviderService,
    @InjectModel(Credentials.name)
    private readonly credentials: Model<CredentialsDocument>,
    @InjectModel(Profile.name) private readonly profile: Model<ProfileDocument>,
    @InjectModel(User.name) private readonly user: Model<UserDocument>
  ) {}
}
