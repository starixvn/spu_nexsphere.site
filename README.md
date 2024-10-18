### Delete node_modules (if exist)

Delete node_modules folder if it existed

### Edit npm config (If you are using pnpm):

$ npm config edit

Add the following line to your .npmrc file to hoist our packages to the root node_modules:
public-hoist-pattern[]=*@nextui-org/*


### Install  Dependencies:

$ npm install

OR

$ pnpm install

It will create `node_module` folder in this all dependency files will be install with this command.


### Run Project in development mode:

$ npm run dev

Server MUST run at port 3000 (http://localhost:3000) to call API successfully.


### Run unit test

$ npm run test


### Run unit test with coverage report

$ npm run test:coverage


### Accounts
admin    | 123456
user     | 123456
