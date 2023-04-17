import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpArgHost = context.switchToHttp();
    const req = httpArgHost.getRequest<Request>();
    console.log(`${req.method} ${req.url}`);
    const startTime = performance.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`${performance.now() - startTime} ms`)));
  }
}
