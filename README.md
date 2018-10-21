Run npm install in both the node-server and front-end folders

__FRONT-END__
- First, navigate to the front-end folder and type in `npm run watch` to get webpack to build the bundle.js file
- Next, in a separate command-line, run `npm run start` and this will have lite-server serve up the index.html file
- Now, any changes you make should be automatically sent to update the lite-server page whenever webpack recompiles bundle.js