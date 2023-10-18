/* eslint @typescript-eslint/no-var-requires: "off" */
import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');
import { RequestMeta } from '../dto/request-meta.dto';

@Injectable()
export class RequestMetaService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getRequestMeta(request: any): Promise<RequestMeta> {
    let token: any = await this.extractJWTFromRequest(request);
    const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress || request.socket.remoteAddress;
    const requestMeta = new RequestMeta();
    if (token && token.startsWith('Bearer')) {
      token = token.replace('Bearer ', '');
      const decodedToken: any = await jwt.decode(token);
      requestMeta.userId = await decodedToken.sub;
      requestMeta.actor = await decodedToken.name;
      requestMeta.email = await decodedToken.email;
      requestMeta.sessionId = await decodedToken.jti;
    }
    requestMeta.requestId = request.requestId;
    requestMeta.originalUrl = request.originalUrl;
    requestMeta.method = request.method;
    requestMeta.userAgent = request.headers['user-agent'];
    requestMeta.host = request.headers['host'];
    requestMeta.clientIp = String(ip);
    requestMeta.startTime = Date.now();
    return requestMeta;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async extractJWTFromRequest(req: any): Promise<any> {
    let token = null;
    const h = req.headers;
    if (req && h) {
      token = req.headers.authorization;
    }
    return token;
  }
}
