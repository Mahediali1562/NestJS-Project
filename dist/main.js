"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const basicAuth = require("express-basic-auth");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const morgan_logger_config_1 = require("./config/morgan-logger.config");
const global_exception_filter_1 = require("./filters/global-exception.filter");
const request_meta_service_1 = require("./interceptors/request-meta.service");
function setupSwagger(app, configService) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('NestJS Seed')
        .setDescription('NestSeed For Indexnine Technologies')
        .setVersion('0.1.0')
        .addSecurity('BearerAuthorization', {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "Access token format: 'Bearer <access-token>'",
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    const authenticatedSwaggerUIUsers = configService.get('swagger.authUsers');
    const swaggerUIPath = configService.get('swagger.uiPath');
    app.use([swaggerUIPath, '/api-json'], basicAuth({
        challenge: true,
        users: authenticatedSwaggerUIUsers,
    }));
    swagger_1.SwaggerModule.setup(swaggerUIPath, app, document);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {});
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix(configService.get('contextPath'));
    if (configService.get('swagger.isEnabled')) {
        setupSwagger(app, configService);
    }
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    app.use((0, morgan_logger_config_1.morganMiddleware)(configService.get('morgan.format')));
    const requestMetaService = app.get(request_meta_service_1.RequestMetaService);
    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionsFilter(requestMetaService));
    app.use(compression());
    app.use((0, helmet_1.default)());
    await app.listen(configService.get('PORT'));
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
//# sourceMappingURL=main.js.map