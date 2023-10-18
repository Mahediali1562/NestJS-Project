export class RequestMeta {
  static userId(userId: any) {
    throw new Error('Method not implemented.');
  }
  actor: string;
  email: string;
  originalUrl: string;
  method: string;
  userAgent: string;
  host: string;
  clientIp: string;
  requestId: string;
  userId: string;
  sessionId: string;
  role: string;
  startTime: number;
  id: any;
}
