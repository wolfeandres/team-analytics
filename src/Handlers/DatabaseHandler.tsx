import axios from 'axios';

var app_id = "";
var current_access_token : any;
var current_refresh_token : any;
var api_key = "";
var number_of_requests = 0;

// gets a new access token, deprecated for now
async function getAccessToken() {
    // if the refresh token is null, an access token was never grabbed so grab one as normal with the api key.
    if (current_refresh_token == null) {
        var body = JSON.stringify({
            "key": api_key
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://realm.mongodb.com/api/client/v2.0/app/' + app_id + '/auth/providers/api-key/login',
            headers: { 
            'Content-Type': 'application/json', 
            },
            data : body
        };

        // send POST request and stores the tokens.
        axios(config)
        .then(async function (response) {
            var json = JSON.parse(JSON.stringify(response.data));
            current_access_token = json.access_token;
            current_refresh_token = json.refresh_token;
            console.log("obtained " + json.access_token);
            return;
        }).catch(function (error) {
            console.log(error);
            return;
        });
    } else {
        // otherwise, get a new access token by refreshing it.
        await refreshAccessToken();
    }
}

// gets a new access token by using the current refresh token, deprecated for now
async function refreshAccessToken() {
    var body = JSON.stringify({
        "key": api_key
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://realm.mongodb.com/api/client/v2.0/auth/session',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer ' + current_refresh_token
        },
        data : body
    };

    // send the POST request and set the access token to the new one.
    axios(config)
    .then(async function (response) {
        var json = JSON.parse(JSON.stringify(response.data));
        current_access_token = json.access_token;
        console.log("refreshed " + json.access_token);
    }).catch(function (error) {
        console.log(error);
    });
}

// returns every JSON stores in the database
function getDatabaseEntries() : any {
    var body = JSON.stringify({
        "key": api_key
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://realm.mongodb.com/api/client/v2.0/app/' + app_id + '/auth/providers/api-key/login',
        headers: { 
        'Content-Type': 'application/json', 
        },
        data : body
    };

    // send POST request and get the token for another request
    axios(config)
    .then(async function (response) {
        var json = JSON.parse(JSON.stringify(response.data));
        var access_token = json.access_token;

        // constructs body
        var body = JSON.stringify({
            "dataSource": "FitnessLog",
            "database": "FitnessLog",
            "collection": "FitnessLogs"
          });
          
          // configuration for axios, includes headers
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://us-east-1.aws.data.mongodb-api.com/app/' + app_id + '/endpoint/data/v1/action/find',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + access_token,
            },
            data : body
          };
          
          // send the POST request, if there's an error it tries a new token. if there's still an error, return with error.
          axios(config)
          .then(function (response) {
             number_of_requests = 0;
             return response.data;
          })
          .catch(async function (error) {
             console.log(error)
          });
    }).catch(function (error) {
        console.log(error);
        return;
    });
}

// returns partner JSONs stored in the database
function getJSONByName(name: string) : any {
    var body = JSON.stringify({
        "key": api_key
    });

    var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://realm.mongodb.com/api/client/v2.0/app/' + app_id + '/auth/providers/api-key/login',
        headers: { 
        'Content-Type': 'application/json', 
        },
        data : body
    };

    // send POST request and get the token for another request
    axios(config)
    .then(async function (response) {
        var json = JSON.parse(JSON.stringify(response.data));
        var access_token = json.access_token;

        // constructs body
        var body = JSON.stringify({
            "dataSource": "FitnessLog",
            "database": "FitnessLog",
            "collection": "FitnessLogs",
            "filter": {
              "json.name": name
            }
          });
          
          // configuration for axios, includes headers
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://us-east-1.aws.data.mongodb-api.com/app/' + app_id + '/endpoint/data/v1/action/find',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + access_token,
            },
            data : body
          };
          
          // send the POST request, if there's an error it tries a new token. if there's still an error, return with error.
          axios(config)
          .then(function (response) {
             number_of_requests = 0;
             console.log(response.data);
             return JSON.stringify(response.data);
          })
          .catch(async function (error) {
              console.log(error);
          });
    }).catch(function (error) {
        console.log(error);
        return;
    });
}

// inserts a JSON object into the database
async function insertJSON(json: any) {
    try {       
        var body = JSON.stringify({
            "key": api_key
        });
    
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://realm.mongodb.com/api/client/v2.0/app/' + app_id + '/auth/providers/api-key/login',
            headers: { 
            'Content-Type': 'application/json', 
            },
            data : body
        };
    
        // send POST request and get the token for another request
        axios(config)
        .then(async function (response) {
            var json = JSON.parse(JSON.stringify(response.data));
            var access_token = json.access_token;
    
            // create the body, which includes the JSON that should be inserted.
        var body = JSON.stringify({
            "dataSource": "FitnessLog",
            "database": "FitnessLog",
            "collection": "FitnessLogs",
            "document": {
              json
            }
          });
          
          // config for axios
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://us-east-1.aws.data.mongodb-api.com/app/' + app_id + '/endpoint/data/v1/action/insertOne',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + access_token,
            },
            data : body
          };
          
          // send POST request, tries to get a new token on error once in case the token expired.
          axios(config)
          .then(function (response) {
             console.log(JSON.stringify(response.data));
          })
          .catch(async function (error) {
              console.log(error);
          });
        }).catch(function (error) {
            console.log(error);
            return;
        });
      } catch (error) {
        console.log(error);
      }
}

export default { getDatabaseEntries, insertJSON, getJSONByName };
