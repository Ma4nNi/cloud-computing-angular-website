'use strict';
var request = require('request');
var Promise = require('bluebird');
var jwtVerify = Promise.promisify(require('jsonwebtoken').verify);
var env = {};
env.AUTH0_SECRET="n00dBF_7MMLbsf2GvmVqtdKyRHc4Hhe1y3u2rG367KjS6OX9mtE7vzGvhdUs303t";
env.DOMAIN = "mannpe.auth0.com";
module.exports = env;

module.exports.verifyToken = (event, context, callback) => {
    if(event.authorizationToken==null){
        callback("No token provided")
        return;
    }
    var token = event.authorizationToken.split(' ')[1];

  getUserInfo(token).then(function(profile) {
    context.succeed(generatePolicy('user', 'Allow', event.methodArn));
  }).catch(function(error) {
     context.fail("Unauthorized");
  })
};

var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}


function getUserInfo(authToken) {
    console.log('Get user profile');
    var secretBuffer = new Buffer(env.AUTH0_SECRET, 'base64');
    var domain = env.DOMAIN;
  
    var body = {
      'id_token': authToken
    };
  
    var options = {
      url: 'https://'+ domain + '/tokeninfo',
      method: 'POST',
      json: true,
      body: body
    };
  
    return jwtVerify(authToken, secretBuffer).then(function(decoded) {
      return request(options);
    }).catch(function (error) {
      console.log('Failed jwt verification: ', error, 'auth: ', authToken);
      return error;
    });
  }