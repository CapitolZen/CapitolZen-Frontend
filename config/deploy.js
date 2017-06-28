/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    pipeline: {
      activateOnDeploy: true,
    },
    s3: {},
    cloudfront: {
      objectPaths: ['/*', '/assets/*', '/index.html']
    },
    's3-index': {
      cacheControl: 'max - age = 0, no - cache, no - store, must - revalidate'
    },
    slack: {
      webhookURL: 'https://hooks.slack.com/services/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'
    }
  };


  if (deployTarget === 'staging') {
    ENV.build.environment = 'development';

  }

  if (deployTarget === 'qa') {
    ENV.build.environment = 'production';

  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.s3.accessKeyId = process.env.AWS_KEY;
    ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = process.env.PRODUCTION_BUCKET;
    ENV.s3.region = process.env.PRODUCTION_REGION;

    ENV.cloudfront.accessKeyId = process.env.AWS_KEY;
    ENV.cloudfront.secretAccessKey = process.env.AWS_SECRET;
    ENV.cloudfront.distribution = process.env.PRODUCTION_DISTRIBUTION;

    ENV['s3-index']['accessKeyId']= process.env.AWS_KEY;
    ENV['s3-index']['secretAccessKey']= process.env.AWS_SECRET;
    ENV['s3-index']['bucket'] = process.env.PRODUCTION_BUCKET;
    ENV['s3-index']['region'] = process.env.PRODUCTION_REGION;


  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
