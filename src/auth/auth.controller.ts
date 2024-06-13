import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSer: AuthService) {}

  @Post('register')
  async inscription(@Body() body) {
    try {
      let res = await this.authSer.signup(body);
      return { message: 'User registred', res };
    } catch (err) {
      throw new ConflictException('Username et/ou Email existant');
    }
  }
  @Post('login')
  async login(@Body() body) {
    let res = await this.authSer.singin(body);
    return { message: 'User Logged', res };
  }
}
