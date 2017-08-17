REM Note The tslint extension requires a global installation of tslint:
npm install -g tslint
REM I would recommend you to check out the VS Code extensions gallery to see if you find an interesting extension. In this post we are going to use the following extensions:
REM tslint
REM Wallaby.js
REM After installing the extensions we need to install some third party dependencies.

REM Create a new folder for your project and create a new package.json file:

REM mkdir ts-vscode-boilerplate
REM cd ts-vscode-boilerplate
npm init
REM We are now ready to install the third party dependencies:

npm install  --save-dev browser-sync
npm install  --save-dev browserify
npm install  --save-dev chai
npm install  --save-dev gulp
npm install  --save-dev gulp-istanbul
npm install  --save-dev gulp-mocha
npm install  --save-dev gulp-sourcemaps
npm install  --save-dev gulp-tslint
npm install  --save-dev gulp-typescript
npm install  --save-dev gulp-uglify
npm install  --save-dev run-sequence
npm install  --save-dev tslint
npm install  --save-dev tsify
npm install  --save-dev typescript
npm install  --save-dev vinyl-buffer
npm install  --save-dev vinyl-source-stream
npm install  --svae-dev jquery

git config --global user.name "Ladislav Lisy"
git config --global user.email ladislav.lisy@seznam.cz
git remote add origin https://github.com
git push -u origin master

npm install @types/mocha
npm install @types/chai
npm install @types/jquery
