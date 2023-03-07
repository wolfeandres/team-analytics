import { DataObject } from '@mui/icons-material';
import axios from 'axios';
import { resolve } from 'path';
import JSONHandler from './JSONHandler';

var app_id = "data-nphof";
var api_key = "e1G2HlcHaZPlJ2NOoFtP3ocZilWoQOoPIdZ8pndoFpECJhoNn7e5684PV0NTZSXg";

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
  
        // constructs body
        var body = JSON.stringify({
          "dataSource": "FitnessLog",
          "database": "FitnessLog",
          "collection": "Test",
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
        return axios(config)
          .then(function (response) {
            const docs = new Array<any>(response.data.documents.length);
            for (var i = 0; i < response.data.documents.length; i++) {
              docs[i] = response.data.documents[i];
            }
  
            console.log(typeof docs);
            console.log(docs);
            return docs;
          })
          .catch(async function (error) {
            console.log(error)
            throw error;
          });
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  }
  

// returns partner JSONs stored in the database
function getPartnerJSON(json: { name: string, workout: { start_timestamp: any, partner: any}}) : any {
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
        var partner_name = json.workout.partner.name;
        var main_timestamp = json.workout.start_timestamp
        // send POST request and get the token for another request
        axios(config)
        .then(async function (response) {
            var token_json = JSON.parse(JSON.stringify(response.data));
            var access_token = token_json.access_token;

            // constructs body
            var body = JSON.stringify({
                "dataSource": "FitnessLog",
                "database": "FitnessLog",
                "collection": "Test",
                "filter": {
                "name": partner_name
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
                var jsonArray = JSON.parse(JSON.stringify(response.data));
                for (var i = 0; i < jsonArray.documents.length; i++) {
                    if (JSONHandler.isPartnerJSON(json, jsonArray.documents[i])) {
                        return jsonArray.documents[i]
                    }
                }
                alert("Couldn't find JSON for partner " + partner_name + " in the database.")
                return null;
            })
            .catch(async function (error) {
                console.log(error);
            });
        }).catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        console.log(error)
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
            "dataSource": "FitnessLog",
            "database": "FitnessLog",
            "collection": "Test",
            document
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