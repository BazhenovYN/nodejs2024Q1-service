import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    this.id = uuidv4();
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = this.createdAt;
  }
}
