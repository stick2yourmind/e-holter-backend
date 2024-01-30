import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterInput } from 'src/auth/dto/register.input';
import { LoginInput } from 'src/auth/dto/login.input';
import { UserMapper } from 'src/core/user/mapper/user-mapper';
import { UserService } from 'src/core/user/user.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
    private readonly _userService: UserService,
  ) {}

  async login({ email, password }: LoginInput) {
    const user = await this._userService.findByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid user or email');
    }

    const token = this._jwtService.sign({ id: user.id });
    return { token, user: new UserMapper().mapEntityToDto(user) };
  }

  async register(registerInput: RegisterInput) {
    const passwordHash = bcrypt.hashSync(registerInput.password, Number(this._configService.getOrThrow('HASH_SALT')));
    const user = await this._userService.create({
      username: registerInput.email,
      password: passwordHash,
      email: registerInput.email,
    });

    const token = this._jwtService.sign({ id: user.id });
    return { token, user };
  }

  setCookie(res: Response, token: string) {
    res.cookie('userToken', token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: this._configService.getOrThrow('NODE_END') === 'PROD',
      secure: true,
      sameSite: 'none',
    });
  }

  clearCookie(res: Response) {
    res.cookie('userToken', '', {
      expires: new Date(Date.now()),
      httpOnly: this._configService.getOrThrow('NODE_END') === 'PROD',
      secure: true,
      sameSite: 'none',
    });
  }
}
