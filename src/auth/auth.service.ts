import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from './generics/Role.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRep: Repository<UserEntity>,
  ) {}

  async signup(crendentials) {
    let newUser = this.userRep.create({
      email: crendentials.email,
      username: crendentials.username,
      salt: await bcrypt.genSalt(),
      role: RoleEnum.ROLE_USER,
    });
    newUser.password = await bcrypt.hash(crendentials.password, newUser.salt);
    return this.userRep.save(newUser);
  }

  dd() {
    bcrypt.verif();
  }
}
