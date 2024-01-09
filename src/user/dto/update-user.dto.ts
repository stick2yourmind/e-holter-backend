import { $Enums } from '@prisma/client';

export class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  roles?: $Enums.ROLE;
  isValidated?: boolean;
}
