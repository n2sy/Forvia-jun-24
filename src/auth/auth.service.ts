import { Injectable, NotFoundException } from '@nestjs/common';
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

  async singin(credentials) {
    let { identifiant, password } = credentials;
    let qb = await this.userRep.createQueryBuilder('user');
    let u = await qb
      .select('user')
      .where('user.username = :idt OR user.email = :idt', { idt: identifiant })
      .getRawOne();
    if (!u) throw new NotFoundException('Username et/ou email inexistant');

    bcrypt.compare(password, u.password, (err, result) => {
      console.log(result);
      if (err) {
        throw new NotFoundException('Mot de passe erroné');
      } else
        return {
          id: u.id,
          role: u.role,
        };
    });
  }
}
