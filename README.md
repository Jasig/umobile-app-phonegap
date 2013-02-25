# uMobile Phonegap

## Development Environment
Follow the below steps to set up a development environment.

### Install Node & NPM
At the core of the uMobile-phonegap is uMobile running as an HTML5 web application. The HTML5 code base leverages [node.js](http://nodejs.org/) for its development server. The HTML5 code base also makes use of [npm](https://npmjs.org/), a package manager for installing node modules. The latest releases of node ships with npm so only a node installation is required. Node offers platform installers for both Windows and Mac OSX. They also offer binaries for Windows, Mac OSX and Linux systems. Visit the [download](http://nodejs.org/download/) page for more information.

To verify your node installation, open a terminal and enter the _node -v_ command:

    node -v // example output: v0.8.9

To verify your npm installation, open a terminal and enter the _npm -v_ command:

    npm -v // example output: 1.1.61

### Install Node Modules
Once node and npm are installed you will need to install all of the node modules leveraged by umobile. You can view all of the module dependencies by examining the **package.json** file located at the root of the HTML5 project.

To install node modules:

Open a terminal window and navigate to the root of the umobile HTML5 project.

    cd path/to/umobile-phonegap

Run the _npm install_ command. (You must run the _npm install_ command in the same directory that contains the package.json file).

    npm install

Depending upon your system permissions, you may need to run the _npm install_ as root.

    sudo npm install
    
You may also encounter a warning about installing grunt with the _-g_ parameter. The _-g_ installs grunt globally so it is accessible across all projects.

    npm install -g grunt-cli

Once complete, the **node_modules** directory, containing all of your project's node modules, will be addded to your project.

### Start the Server
Open a terminal window and navigate to the root of the umobile-app-phonegap project.

    cd path/to/umobile-phonegap

Run the _node app.js_ command to start the server.

    node app.js

Open a browser and navigate to http://localhost:5000
