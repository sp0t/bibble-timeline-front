module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  // port: env.int('PORT', 80),
  // url: env("PUBLIC_URL", "http://timelineapi.testing.929.org.il:80"),
  port: env.int('PORT', 1337),
  url: env("PUBLIC_URL", "http://127.0.0.1:1337"),
});
