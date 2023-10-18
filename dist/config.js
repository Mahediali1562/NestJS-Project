"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config = () => ({
    port: process.env.PORT,
    contextPath: 'api/v1',
    enableMetaData: true,
    database: {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: true,
        logging: true,
        entities: ['./modules/**/*.entity.ts'],
        autoLoadEntities: true,
        keepConnectionAlive: true,
    },
    jwt: {
        secret: 'hard!to-guess_secret',
        accessTokenOptions: { expiresIn: 3600 },
        refreshTokenOptions: { expiresIn: 1210000, path: '/auth/refresh' },
        grantTypes: { accessGrant: 'access', refreshGrant: 'refresh' },
    },
    bcrypt: {
        saltRounds: 10,
    },
    swagger: {
        isEnabled: true,
        uiPath: '/swagger-ui',
        authUsers: {
            root: 'toor',
            admin: 'admin@123',
        },
    },
    session: {
        secret: 'some-really-hard-to-guess-secret-32sdf-42gh45fs-23134234-4332-gebhj',
    },
    morgan: {
        format: ':method, :url, :status, :response-time, :total-time,:http-version, :remote-addr, :user-agent',
    },
});
exports.config = config;
//# sourceMappingURL=config.js.map