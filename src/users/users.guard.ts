import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest().headers;
      if (request.authorization) {
        const token = request.authorization.split(' ')[1];
        const decoded: any = jwt.verify(
          token,
          String(process.env.PRIVATEKEY_ACCESSTOCKEN),
        );
        return decoded ? true : false;
      } else {
        throw new ForbiddenException();
      }
    } catch (err) {
      throw new ForbiddenException();
    }
  }
}
