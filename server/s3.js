const aws = require("aws-sdk");
const { AWS_KEY, AWS_SECRET } = require("./secrets.json");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
}

module.exports.s3 = new aws.S3({
    accessKeyId: AWS_KEY,
    secretAccessKey: AWS_SECRET,
});
