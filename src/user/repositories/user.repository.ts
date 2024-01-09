import { Injectable } from '@nestjs/common';
import { $Enums, User } from '@prisma/client';
import { BaseRepository } from 'src/common/repositories/base.repository';
import { PrismaService } from 'src/db/orm/orm.service';

Injectable();
export class UserRepository extends BaseRepository<User> {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  async findById(id: number): Promise<User> {
    return await this._prismaService.user.findFirstOrThrow({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this._prismaService.user.findMany();
  }

  async create(data: { username: string; email: string; password: string }): Promise<User> {
    return await this._prismaService.user.create({ data });
  }

  async update(
    id: number,
    data: {
      username?: string;
      email?: string;
      password?: string;
      roles?: $Enums.ROLE;
      isValidated?: boolean;
    },
  ): Promise<User> {
    return await this._prismaService.user.update({ where: { id }, data });
  }

  async removeById(id: number): Promise<User> {
    return await this._prismaService.user.delete({ where: { id } });
  }
}
