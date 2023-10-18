import { Global, Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { RequestMetaService } from '../interceptors/request-meta.service';

@Injectable()
@Global()
export class RequestLogger implements NestMiddleware {
  constructor(private readonly requestMetaService: RequestMetaService) {}
  async use(req: Request, res: Response, next: any) {
    const reqParams = req.query;
    const request = req as IRequestCustom;
    if (reqParams.hasOwnProperty('requestId') && reqParams.requestId) {
      request.requestId = String(reqParams.requestId);
    } else {
      request.requestId = uuidv4();
    }
    const requestMeta = await this.requestMetaService.getRequestMeta(req);
    request.startTime = requestMeta.startTime;
    next();
  }
}
export interface IRequestCustom extends Request {
  requestId: string;
  startTime: number;
}
