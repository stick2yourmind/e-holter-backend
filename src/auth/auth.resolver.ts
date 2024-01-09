import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly _authService: AuthService) {}

  @Mutation(() => Auth, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this._authService.login(loginInput);
  }

  @Mutation(() => Auth, { name: 'register' })
  async register(@Args('registerInput') registerInput: RegisterInput) {
    const data = await this._authService.register(registerInput);
    return data;
  }

  @Query(() => String, { name: 'test' })
  test(): string {
    return 'hello';
  }
}
