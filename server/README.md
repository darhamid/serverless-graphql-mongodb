# Test Cloudapps

**Below is the requirement for running this application:**

```
Node        8.10.0
Serverless  1.24.1
```

**Setting up the local environment**. 

Install NVM if you haven't already done so (https://github.com/creationix/nvm). Once NVM is installed, install Node 8.10 `nvm install 8.10` then install other dependencies below. 

```
npm install -g serverless
npm install
```

**To run this locally, simply enter the follow command. This should run your API gateway on http://localhost:8000**

```
npm run offline
```

**To run unit test, run the following command**

```
npm run test
```

** Direct Serverless deployment
sls deploy -v --stage staging --region us-west-2