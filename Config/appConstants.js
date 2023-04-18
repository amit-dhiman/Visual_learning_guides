var SERVER = {
  APP_NAME: "Gleek",
  SECRET: "#GleekfGKHJN<uHHSh",
  SALT: 11,
  JWT_SECRET_KEY_NEWUSER: "dontshareyoursecretkeyUser",
  JWT_SECRET_KEY_USER: "gff%$TGMJ^rztt",
  JWT_SECRET_KEY_ADMIN: "gff%$TGMJ^rztt",
  JWT_SECRET_KEY_VENDOR: "gff%$TGMJ^rztt",
  MAX_DISTANCE_RADIUS_TO_SEARCH: 10000,
  NOTIFICATION_KEY: "AAAAH0zyQno:APA91bEJ-PT3AbIpey7VDPTTcZOhGR2z7IC0Nn9fiHGzusAGwWR4jV7s1UWaRPIh7hq07wy77MkahQBc23jDTKakq9QDBlbQzgCY9Ko2njkgd90m0JcW0KfddtXcxqbg85UQTKs8HprC",
  STRIP_KEY : "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"
  //STRIP_KEY : "sk_test_51JraWXJ5pphZmj9S4rZv58wlo4pwftdDnBim8cCHFiJCU0vsNwHQITDPYUSEwDw1Xi0nl5MJ8YUd6l3nUvZo9iCl00AFd3EJNO"
};

var swaggerDefaultResponseMessages = [
  { code: 200, message: "OK" },
  { code: 400, message: "Bad Request" },
  { code: 401, message: "Unauthorized" },
  { code: 404, message: "Data Not Found" },
  { code: 500, message: "Internal Server Error" }
];

var SCOPE = {
  USER: "USER",
  ADMIN: "ADMIN",
  VENDOR: "VENDOR",
  NEWUSER: "NEWUSER"
};

var GENDER = {
  MALE:"MALE",
  FEMALE:"FEMALE"

}

var APP_CONSTANTS = {
  SCOPE:SCOPE,
  swaggerDefaultResponseMessages:swaggerDefaultResponseMessages,
  SERVER:SERVER,
  GENDER:GENDER
};

module.exports = APP_CONSTANTS;

