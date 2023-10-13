const path = require('path');

// module.exports = ({ env }) => ({
//   connection: {
//     client: 'mysql',
//     connection: {
//       host: env('DB_HOST'),
//       port: env.int('DATABASE_PORT', 3306),
//       database: env('DATABASE_NAME', 'timeline929testing'),
//       user: env('DB_USERNAME'),
//       password: env('DB_PASSWORD'),
//       ssl: { 
//         rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates 
//       },
//     },
//     debug: true,
//   },
//   pool: { acquireTimeoutMillis: env.int('DATABASE_POOL_ACQUIRE_TIMEOUT_MILLIS', 60000), },
// });

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DB_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'timeline929testing'),
      // user: env('DB_USERNAME', 'strapi'),
      // password: env('DB_PASSWORD', 'strapi'),

      user: env('DB_USERNAME', 'root'),
      password: env('DB_PASSWORD', ''),
      // ssl: { 
      //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates 
      // },
    },
    debug: true,
  },
  pool: { acquireTimeoutMillis: env.int('DATABASE_POOL_ACQUIRE_TIMEOUT_MILLIS', 60000), },
});
