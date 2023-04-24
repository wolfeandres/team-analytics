import axios from 'axios';
import JSONHandler from './JSONHandler';

var app_id = "react-apiow";
var api_key = process.env.REACT_APP_DB_KEY;

// returns every JSON stores in the database
function getDatabaseEntries() : Promise<Array<any>> {
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
    return axios(config)
    .then(async function (response) {
        var json = JSON.parse(JSON.stringify(response.data));
        var access_token = json.access_token;
          
          // configuration for axios, includes headers
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://data.mongodb-api.com/app/' + app_id + '/endpoint/react/v1/action/find',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + access_token,
            },
            data : body
          };
          
          // send the POST request, if there's an error it tries a new token. if there's still an error, return with error.
          return axios(config)
          .then(function (response) {
             var docs = [];
             for (var i = 0; i < response.data.length; i++) {
             docs.push(response.data[i]);
            }
            return docs;
          })
          .catch(async function (error) {
             console.log(error);
             throw error;
          });
    }).catch(function (error) {
        console.log(error);
        throw error;
    });
}

// returns partner JSONs stored in the database
function getPartnerJSON(json: { name: string, workout: { start_timestamp: any, partners: [ any ]}}) : Promise<any> {
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

        console.log(json)
        var partner_name = json.workout.partners[0].name;
        var main_timestamp = json.workout.start_timestamp
        // send POST request and get the token for another request
        return axios(config)
        .then(async function (response) {
            var token_json = JSON.parse(JSON.stringify(response.data));
            var access_token = token_json.access_token;

            // constructs body
            var body = JSON.stringify({
                "name": partner_name
            });
            
            // configuration for axios, includes headers
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://data.mongodb-api.com/app/' + app_id + '/endpoint/react/v1/action/findName',
                headers: { 
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + access_token,
                },
                data : body
            };
            
            // send the POST request, if there's an error it tries a new token. if there's still an error, return with error.
            return axios(config)
            .then(function (response) {
                var jsonArray = JSON.parse(JSON.stringify(response.data));
                for (var i = 0; i < jsonArray.length; i++) {
                    if (JSONHandler.isPartnerJSON(json, jsonArray[i])) {
                        return jsonArray[i]
                    }
                }
                alert("Couldn't find JSON for partner " + partner_name + " in the database.")
                return null;
            })
            .catch(async function (error) {
                console.log(error);
                throw error
            });
        }).catch(function (error) {
            console.log(error);
            throw error
        });
    } catch (error) {
        console.log(error)
        throw error
    } 
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
            var token_json = JSON.parse(JSON.stringify(response.data));
            var access_token = token_json.access_token;
    
            // create the body, which includes the JSON that should be inserted.
        var document = json;
        var body = JSON.stringify({
            document
          });
          
          // config for axios
          var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://data.mongodb-api.com/app/' + app_id + '/endpoint/react/v1/action/insert',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': 'Bearer ' + access_token,
            },
            data : body
          };
          console.log(json)
          // send POST request, tries to get a new token on error once in case the token expired.
          axios(config)
          .then(function (response) {
            // on insertion
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

export default { getDatabaseEntries, insertJSON, getPartnerJSON };
