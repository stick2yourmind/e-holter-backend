import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this._userRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this._userRepository.findAll();
    return users;
  }

  async findById(id: number) {
    const user = await this._userRepository.findById(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this._userRepository.findByEmail(email);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this._userRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: number) {
    const user = await this._userRepository.removeById(id);
    return user;
  }
}
