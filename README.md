# config-manager

Config manager that helps you manage the environment vars for your different apps across all of your deployment 
environments.  Typical environments include `local`, `dev`, `test`, and `prod`, although you can have as many as you
want, and call them whatever you like.  config-manager also supports having a default.json file
which contains global config values shared across apps.

## How?

First, install it in your project's directory:

    npm install config-manager

Then add this line to your app's configuration:

    var configManager = require('config-manager')

Finally, initialize the manager with the base path of your config files, the target env, and the name of your app:

    var config = configManager.init([BASE_PATH_TO_CONFIG_FILES], [TARGET_ENV], [NAME_OF_APP], callback);