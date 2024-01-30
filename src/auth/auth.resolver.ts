import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { Response } from 'express';
import { GenericResponse } from 'src/common/entity/generic-response.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly _authService: AuthService) {}

  @Mutation(() => Auth, { name: 'login' })
  async login(@Context('res') res: Response, @Args('loginInput') loginInput: LoginInput) {
    const data = await this._authService.login(loginInput);
    this._authService.setCookie(res, data.token);
    return data;
  }

  @Mutation(() => Auth, { name: 'register' })
  async register(@Context('res') res: Response, @Args('registerInput') registerInput: RegisterInput) {
    const data = await this._authService.register(registerInput);
    this._authService.setCookie(res, data.token);
    return data;
  }

  @Mutation(() => GenericResponse, { name: 'logout' })
  async logout(@Context('res') res: Response) {
    this._authService.clearCookie(res);
    return { success: true };
  }
}
