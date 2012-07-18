# config-manager

Config manager that helps you manage the environment vars for your different apps across all of your deployment 
environments.

## How?

First, install it in your project's directory:

    npm install config-manager

Then add this line to your app's configuration:

    var configManager = require('config-manager')

Finally, initialize the manager with the base path of your config files, the target env, and the name of your app:

    var config = configManager.init([BASE_PATH_TO_CONFIG_FILES], [TARGET_ENV], [NAME_OF_APP], callback);