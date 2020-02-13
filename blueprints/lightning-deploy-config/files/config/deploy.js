
const VALID_DEPLOY_TARGETS = [ // update these to match what you call your deployment targets
  'development',
  'staging',
  'production'

];

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      fingerprint: {}
    },
    redis: {
      allowOverwrite: true,
      keyPrefix: '<%= dasherizedPackageName %>:index'
    },
    cloudinary: {
      folder: "",
      timestampSubfolder: {
        enabled: true,    // default
        type: "timestamp" // default, otherwise "md5" - hash from tymestamp
      }
    }
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    ENV.redis.url = process.env.REDIS_URL || 'redis://0.0.0.0:6379/';
    // only care about deploying index.html into redis in dev
    ENV.pipeline = {
      disabled: {
        allExcept: ['redis']
      }
    }
  }

  if (deployTarget === 'staging' || deployTarget === 'production') {
    ENV.build.environment = 'production';
    ENV.cloudinary.cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    ENV.cloudinary.apiKey    = process.env.CLOUDINARY_API_KEY;
    ENV.cloudinary.apiSecret = process.env.CLOUDINARY_API_SECRET;
    ENV.cloudinary.secure    = (process.env.CLOUDINARY_SECURE === "true");
    // ENV.cloudinary.uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
    ENV.cloudinary.cdnSubdomain = process.env.CLOUDINARY_CDN_SUBDOMAIN ? process.env.CLOUDINARY_CDN_SUBDOMAIN : "res";
    ////  Relevant only for Advanced plan
      //private_cdn Boolean Optional. Set this parameter to true if you are an Advanced plan user with a private CDN distribution. For details, see Private CDNs and CNAMEs.
      //cname string  Optional. The custom domain name to use for building HTTP URLs. Relevant only for Advanced plan users that have a private CDN distribution and a custom CNAME. For details, see Private CDNs and CNAMEs.
      //secure_distribution string  Optional. The domain name of the CDN distribution to use for building HTTPS URLs. Relevant only for Advanced plan users that have a private CDN distribution. For details, see Private CDNs and CNAMEs.
    let assets_prepend =  [ ENV.cloudinary.secure  ? "https:/" : "http:/",  
                        ENV.cloudinary.cdnSubdomain + ".cloudinary.com",
                        ENV.cloudinary.cloudName,
                        "raw/upload",
                        ENV.cloudinary.folder === "" ? ENV.cloudinary.folder +"/" : ""
                      ].join("/")
   
    ENV.build.fingerprint = {
      prepend: assets_prepend
    }
  }

  if (deployTarget === 'staging') {
    ENV.redis.url = process.env.QA_REDIS_URL;
  }

  if (deployTarget === 'production') {
    ENV.redis.url = process.env.PROD_REDIS_URL;
  }
  
  return ENV;

  /* Note: a synchronous return is shown above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   * const { Promise } = require('rsvp');
   * 
   * let get_env_promise_heroku_redis_url = function(app_name) {
   *   return new Promise(function(resolve, reject){
   *     let exec = require('child_process').exec;
   *     let command = 'heroku redis:credentials REDIS_URL -a ' + app_name;
   *     exec(command, function (error, stdout, stderr) {
   *       ENV.redis.url = stdout.replace(/\n/, '')
   *       if (error) {
   *         reject(error);
   *       } else {
   *         resolve(ENV);
   *       }
   *     });
   *   });
   *  }
   *
   *  if (deployTarget === 'staging') {
   *    return get_env_promise_heroku_redis_url(process.env.HEROKU_REDIS_APP_NAME_STAGING);
   *  }
   *
   *  if (deployTarget === 'production') {
   *    return get_env_promise_heroku_redis_url(process.env.HEROKU_REDIS_APP_NAME_PRODUCTION);
   *  }
   *
   *  return ENV;
   *
   */
}