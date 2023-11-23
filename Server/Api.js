'use strict';

const Hapi = require('@hapi/hapi');
const HapiCors = require('hapi-cors');

const init = async () => {
    const server = Hapi.server({
        port: 3001,
        host: 'localhost',
    });
    await server.register({
        plugin: HapiCors,
        options: {
            origins: ['http://localhost:3000'], // Change this to the actual origin of your React app in production
        },
    });

    server.route({
        method: 'GET',
        path: '/user',
        handler: (request, h) => {

            return 'Hello, Hapi!';
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();