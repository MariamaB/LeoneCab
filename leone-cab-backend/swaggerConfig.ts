// Configure the app to use Swagger
export const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'LeoneCab API',
      version: '1.0.0',
      // description: 'A sample Express.js API built with TypeScript and Swagger',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    // './src/routes/*.ts',
    './src/**/*.routes.ts',
  ], // Pfade zu deinen Routen-Dateien
};
