import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.2.0',
        tags: [
            {
                name: 'Authentication',
                description: 'Authentication Enpoints'
            },
        ],
        info: {
            title: 'LegumexApps Transportes API',
            version: '1.0.0',
            description: "LegumexApps Transportes GT API Documentation"
        },
    },
    apis: ['./src/routes/*.ts', './src/docs/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;