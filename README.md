
### Install  Dependencies:

$ npm install


It will create `node_module` folder in this all dependency files will be install with this command.

If you are using pnpm, you need to add the following line to your .npmrc file to hoist our packages to the root node_modules.

public-hoist-pattern[]=*@nextui-org/*


After modifying the .npmrc file, you need to run pnpm install again to ensure that the dependencies are installed correctly.


### Run Project in development mode:

$ npm run dev
