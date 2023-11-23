// const Hapi = require('@hapi/hapi');
// const Joi = require('joi');
// const { DataBasePg } = require('pg');
// const hapiCors = require('hapi-cors');
// const databaseConnection = new DataBasePg({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'Registration',
//     password: 'root',
//     port: 5432,
// });

// const init = async () => {
//     const server = Hapi.server({
//         port: 3000,
//         host: 'localhost',
//     });
//     await server.register({
//         plugin: hapiCors,
//         options: {
//             origin: ['http://localhost:3001']
//         }
//     });
//     server.route({
//         method: 'POST',
//         path: '/api/auth/register',
//         options: {
//             validate: {
//                 payload: Joi.object({
//                     username: Joi.string().required(),
//                     password: Joi.string().required(),
//                 }),
//             },
//         },
//         handler: async (request, handler) => {
//             try {
//                 const { username, password } = request.payload;
//                 const client = await databaseConnection.connect();

//                 // Replace this query with your actual authentication logic
//                 const result = await client.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING *', [username, password]);
//                 return { success: true, message: 'Registration successful', user: result.rows[0] };
//             } catch (error) {
//                 console.error('Error during login:', error.message);
//                 return { error: true, message: 'Internal server error' };
//             } finally {
//                 client.release(); // Release the client back to the pool
//             }
//         },
//     });
//     await server.start();
//     console.log('Server running on', server.info.uri);
// };
// process.on('unhandledRejection', (err) => {
//     console.error(err);
//     process.exit(1);
// });

// init();
const Hapi = require('@hapi/hapi');
const HapiCors = require('hapi-cors');
const Joi = require('joi');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Registration',
    password: 'root',
    port: 5432,
});

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
    });

    await server.register({
        plugin: HapiCors,
        options: {
            origins: ['http://localhost:3001'], // Change this to the actual origin of your React app in production
        },
    });

    server.route({
        method: 'POST',
        path: '/register',
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }),
            },
        },
        handler: async (request, h) => {
            try {
                const { username, password } = request.payload;
                const client = await pool.connect();
                const result = await client.query('INSERT INTO users(username, password) VALUES($1, $2) RETURNING *', [username, password]);
                client.release();
                return { success: true, message: 'Registration successful', user: result.rows[0] };
            } catch (error) {
                console.error('Error during registration:', error.message);
                return { error: true, message: 'Internal server error' };
            }
        },
    });

    await server.start();
    console.log('Server running on', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();
