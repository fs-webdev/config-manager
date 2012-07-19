# config-manager

Config manager that helps you manage the environment vars for your different apps across all of your deployment 
environments.  Typical environments might include `local`, `dev`, `test`, `stage`, and `prod`, although you can have as many as you
want, and call them whatever you like.  config-manager also supports having a default.json file
which contains global config values shared across apps.

## How?

First, install it in your project's directory:

    npm install config-manager

Then add this line to your app's configuration:

    var configManager = require('config-manager')

Finally, initialize the manager with the base path of your config files, the target env, and the name of your app:

    var conf = configManager.init([BASE_PATH_TO_CONFIG_FILES], [TARGET_ENV], [NAME_OF_APP], function(conf){
      //At this point the conf object has the resolved env vars ready for use
    });

Config Files
---------------------------
Example config files can be found in the `test/files` folder.  The basic layout of these files is as follows:

    {
      "default": {
        "env1" : "value1"
      },
      "dev" : {
        "env1" : "value1OverrideDefaultDev",
        "devOnly1" : "value1"
      },
      "test" : {},
      "prod" : {
        "env1" : "value1OverrideDefaultProd"
      },
      "myMadeUpEnv" : {
        "env" : "mymadeupvalue"
      }
    }

The `default.json` file is used for setting global config values that apply to all of your apps and can
also be used to globally target specific deployment environments.

Individual apps can include an `[appname].json` file that will be used to override the values found
in the `default.json` file with values specific to a particular app.

Env Var Value Resolution
---------------------------
Values for an app's environment variables are derived using the following resolution chain:

* default section of the default.json file
* override with default section of the [appname].json file
* override with [target env] section of the default.json file
* override with [target env] section of the [appname].json file

The `default.json` file can be used to set global configuration values that apply to all of our apps.  Based on where
in the file you add the values, you can target every app in every environment (by placing the value in the `default` section),
or you can target every production app for example (by placing the value in the `prod` section of the file).

Configuration that applies only to one app should be placed in the json file corresponding to that app.  The same rules 
apply for how values affect the different environments.  The `default` section will apply to all instances of the app and the
other sections will only apply to those specific deployment environments.