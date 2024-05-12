import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies
    const token = cookies["access_token"]
    if (!token) {
      throw new UnauthorizedException();
    }
    return true
  }
}

@Injectable()
export class AdminAuth implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies
    const roleId = cookies["role_id"]
    if (!roleId || roleId !== "1") {
      throw new ForbiddenException({ message: "Only admin account could access this." });
    }
    return true
  }
}
