import { $Enums } from '@prisma/client';

export type UserOutput = {
  id: number;
  username: string;
  email: string;
  roles: $Enums.ROLE;
  isValidated: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};
