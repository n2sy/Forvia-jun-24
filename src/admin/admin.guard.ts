import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/auth/generics/Role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    if (req.user.role == RoleEnum.ROLE_ADMIN) return true;
    return false;
  }
}
