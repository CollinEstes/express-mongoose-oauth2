express-mongoose-oauth2
=========

Express4 / Mongoose middleware that adds full oauth2 authentication routing and handling.  
(still in progress...)

###Current Providers Available:
Google  
Facebook  
Twitter  
Github  
Coinbase  

###Requirements:  
Mongodb - This module utlizes mongoose to save Users into supplied Mongo DB.  
Express Application - This module requires an express instance to add these API calls too. 
Application ID / Secret  - from all desired providers (see below for more information).  



## Usage

1.  Complete configuration with provider information

    This module requires a configuration object to be supplied with provider client IDs, passwords, callbackURLs, and success routes.  Please see the example configuration [here] (./test/auth.js)  
    
2.  Install express4-mongoose-oauth2

    ```
    $ npm install https://github.com/CollinEstes/express-mongoose-oauth2.git  
    ```
    
    
3.  Require express4-mongoose-oauth2 

    ```
    //add to your express configuration:      
    require('express4-mongoose-oauth2')(expressinstance, dbConnectionString, config);  
    ```
      
    >expressinstance -  is your instance "app" ie:  var app = express();  
    >dbConnectionString - is the targeted mongo db you want to use ie:'mongodb://@localhost:2701
    7/nfl_test'.    
    >config - provider configured completed in step 1.  
    
 
4.  Add success and error callbacks
    
    Implement express route handling for all success and error callbacks specific in the configuration file completed in step 1.
    
5.  Add client-side login links
    
    Add links that correspond to the specified "loginURL" from the configuration file completed in step 1.  

    ```
    // example
    <a href="/connect/google">google</a>
    ```
    
    

    
## Integration Tests

This project does contain integration tests but extra configuration is required.  Phantomjs is used to perform the full oauth2 login process, with mocha tests running when the success callback is invoked for each provider login.  To perform these tests follow the steps below.  
    
1.  Add configuration to /test/auth found [here](./test/auth.js)
2.  For each desired provider you must supply login creditials to the corresponding phantom-[provider].spec.js found [here] (./test/phantom/)  
3.  Make sure your local mongodb is running.
4.  Run gulp tests

    ```
    $ gulp test
    ```


