import { IsNotEmpty } from 'class-validator';

export class Project {
  name?: string;
  @IsNotEmpty()
  userId?: string;
}
