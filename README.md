git-utils-
==========================

This tool provides command line options to query github organization.


## Setup

```
$ git clone https://github.com/sbalaram-org/github-utils.git
$ cd github-utils
$ npm install
```

Copy `config/default-example.json` to `config/default.json`

```
$ cp config/default-example.json config/default.json
$ vi config/default.json
```
Update the git-pat-token to your github generate PAT-token (see here https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line on how to generate)

```
{
  "git-pat-token": "xxxx",
  "default-limit":10
}
```

## Usage

### Top-N repos by number of stars

$ node src/git-utils.js  -s [orgname] -l [limit count]


### Top-N repos by number of forks

$ node src/git-utils.js  -f [orgname] -l [limit count]


### Top-N repos by number of Pull Requests (PRs).

    Feature in development coming soon

### Top-N repos by contribution percentage (PRs/forks).

   Feature in development coming soon

### Testing

To run  unit tests

* update the token to your github PAT token under config/default.json

```
{
  "git-pat-token": "xxxx",
  "default-limit":10
}
```
* then run the following

$ node src/git-utils.js  -f [orgname] -l [limit count]
