express-mongoose-oauth2
=========

Express4 / Mongoose middleware that adds full oauth2 authentication routing and handling.

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
