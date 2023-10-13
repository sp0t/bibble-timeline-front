// module.exports = ({ env }) => ({
//   auth: {
//     secret: env('ADMIN_JWT_SECRET', '79577925a66d6d9ee4a3676306d6e74f'),
//   },
//   apiToken: {salt: 'SOME_RANDOM_STRING'},
//   autoMigration: true,
// });

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ac95524c-e2d7-4ec5-a819-5815aa78c28a'),
  },
  apiToken: {salt: '562fb1b59265aa66f02fe848d0fd8f2c'},
  autoMigration: true,
});
