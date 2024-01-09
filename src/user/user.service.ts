import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserMapper } from './mapper/user-mapper';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return await this._userRepository.create(createUserDto);
  }

  async findAll() {
    const users = await this._userRepository.findAll();

    return new UserMapper().mapEntitiesToDto(users);
  }

  async findById(id: number) {
    const user = await this._userRepository.findById(id);
    return new UserMapper().mapEntityToDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this._userRepository.update(id, updateUserDto);
    return new UserMapper().mapEntityToDto(user);
  }

  async remove(id: number) {
    const user = await this._userRepository.removeById(id);
    return new UserMapper().mapEntityToDto(user);
  }
}
