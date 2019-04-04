'use strict';

var fs = require('fs');
var util = require('util');

var command = require('commander');
var config = require('config');
var moment = require('moment');
var nodemailer = require('nodemailer');
var tar = require('tar-fs');

var helper = require('./helper');

const Octokit = require('@octokit/rest')


const octokit = new Octokit({
  // see "Authentication" section below
  auth: config.get('git-pat-token'),

  // setting a user agent is required: https://developer.github.com/v3/#user-agent-required
  // v1.2.3 will be current @octokit/rest version
  userAgent: 'octokit/rest.js v1.2.3',

  // add list of previews you’d like to enable globally,
  // see https://developer.github.com/v3/previews/.
  // Example: ['jean-grey', 'symmetra']
  previews: [],

  // set custom URL for on-premise GitHub Enterprise installations
  baseUrl: 'https://api.github.com',

  // pass custom methods for debug, info, warn and error
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
  },

  request: {
    // Node.js only: advanced request options can be passed as http(s) agent,
    // such as custom SSL certificate or proxy settings.
    // See https://nodejs.org/api/http.html#http_class_http_agent
    agent: undefined,

    // request timeout in ms. 0 means no timeout
    timeout: 0
  }
})



command
  .description('command line tool to query your github org for these stats')
  .option('-s, --star [orgname]', 'Top-N repos by number of stars')
  .option('-f, --fork [orgname]', 'Top-N repos by number of fork')
  .option('-p, --pull [orgname]', 'Top-N repos by number of Pull Requests (PRs)')
  .option('-c, --cont [orgname]', 'Top-N repos by contribution percentage (PRs/forks)')
  .option('-l, --limit [limit_count]', 'Limit results count')
  .parse(process.argv);

  exports = module.exports = {

  getReposbystars: function(orgname,limit) {

    var output = octokit.paginate('GET /search/repositories?q=user%3A{user}+&s=stars&type=Repositories', { user: orgname },response => response.data.items.map(repos => repos));

    output = output.then(response=>response.map(repos => repos.full_name + '   :    ' + repos.stargazers_count));
    output.then(repos => {
    console.log('Most starred repos : count\n' + JSON.stringify(repos, null, 2));
    })
  },
  getReposByForks: function(orgName,limit) {
    var output = octokit.paginate('GET /search/repositories?q=user%3A{user}+&s=stars&type=Repositories', { user: orgName },response => response.data.items.map(repos => repos));
    output = output.then(response=>response.map(repos => repos.full_name + '   :   ' + repos.forks));
    output.then(repos => {
      console.log('Most forked repos : count\n' + JSON.stringify(repos, null, 2));
    })
  },
  getReposByPullRequest: function(orgname,limit) {
    helper.feature_message();
    return;
},
  getReposByContrPercent: function(orgname,limit) {
    helper.feature_message();
    return;
    },
};

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'test') {
    if (! (command.star || command.fork || command.pull || command.cont) && (!command.limit)) {
      console.log('one of the  --star,--fork,--pull,--cont --limit is required');
      command.help();
    }
    if(command.star) {
      exports.getReposbystars(command.star,command.limit);
    } else if(command.fork){
      exports.getReposByForks(command.fork,command.limit);
    }else if(command.pull){
        exports.getReposByPullRequest(command.pull,command.limit);
    }else if(command.cont){
      exports.getReposByContrPercent(command.cont,command.limit);
    }
  }
