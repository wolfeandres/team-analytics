// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {

    // Headers, e.g. {"Content-Type": ["application/json"]}
    const contentTypes = headers["Content-Type"];

    if (body == null) {
      return "Error: you must include a body to your request.";
    }
    
    // get current unix timestamp in seconds, not milliseconds
    var current_time = Math.floor(Date.now() / 1000)
    
    try {
      const json = JSON.parse(body.text());
      const reqBody = json.document;
      
      /*
      * Workout Metadata
      */
      if (reqBody.group_id == null) {
        return "Error: missing group_id field or group_id must not be null";  
      } else if (typeof reqBody.group_id != "number") {
        return "Error: group_id field must be a number";
      }
      
      // name 
      if (reqBody.name == null || reqBody.name == "") {
        return "Error: failed to provide name field, it is either null or an empty String.";
      } else if (typeof reqBody.name != "string") {
        return "Error: name field should be a String.";
      }
      
      // device id
      if (reqBody.device_id == null || reqBody.device_id == "") {
        return "Error: failed to provide device_id field, it is either null or an empty String.";
      } else if (typeof reqBody.device_id != "string") {
        return "Error: device_id field should be a String.";
      }
      
      
      if (reqBody.workout == null || typeof reqBody.workout != "object") {
        return "Error: workout object does not exist.";
      }
      
      if (reqBody.workout.workout_type == null) {
        return "Error: missing workout_type or workout_type is null";
      } else if (typeof reqBody.workout.workout_type != "string") {
        return "Error: workout_type must be of type String";
      } else if (reqBody.workout.workout_type == "") {
        return "Error: workout_type must be specified and not an empty String.";
      }
      
      if (reqBody.workout.start_timestamp == null) {
        return "Error: missing workout start_timestamp or start_timestamp is null";
      } else if (typeof reqBody.workout.start_timestamp != "number") {
        return "Error: start_timestamp must be of type Number";
      } else if (reqBody.workout.start_timestamp > current_time) {
        return "Error: start_timestamp is not formatted in seconds."
      }
      
      if (reqBody.workout.end_timestamp == null) {
        return "Error: missing workout end_timestamp or end_timestamp is null";
      } else if (typeof reqBody.workout.end_timestamp != "number") {
        return "Error: end_timestamp must be of type Number";
      } else if (reqBody.workout.end_timestamp > current_time) {
        return "Error: end_timestamp is not formatted in seconds."
      }
      
      /*
      * Workout Metric Data
      */
      if (reqBody.workout.heart_rate != null) {
        if (typeof reqBody.workout.heart_rate != "object") {
          return "Error: heart_rate must be of type Object";
        } else {
          if (reqBody.workout.heart_rate.target_heart_rate == null) {
            return "Error: missing target_heart_rate field or target_heart_rate is null";
          } else if (typeof reqBody.workout.heart_rate.target_heart_rate != "number") {
            return "Error: target_heart_rate must be of type Number";
          }
        }
      }
      

      for (var k in reqBody.workout) {
        if (reqBody.workout[k].units != null) {
          if (typeof reqBody.workout[k].units != "string") {
            return "Error: units in object " + k + " must be of type String";
          } else if (reqBody.workout[k].units == "") {
            return "Error: units at object " + k + " must be specified and not an empty String";
          }
          
          if (reqBody.workout[k].data != null) {
            if (reqBody.workout[k].data.length == null) {
              return "Error: data array of object " + k + " is not an array";
            } else if (reqBody.workout[k].data.length == 0) {
              return "Error: data array in object " + k + " cannot be empty if it exists.";
            } else {
              for (var l = 0; l < reqBody.workout[k].data.length; l++) {
                if (reqBody.workout[k].data[l].value == null) {
                  return "Error: a value must be provided in data array of object " + k + " at index " + l; 
                } else if (typeof reqBody.workout[k].data[l].value != "string") {
                  return "Error: the value in data array of object " + k + " at index " + l + " must be of type String";
                } else if (reqBody.workout[k].data[l].value == "") {
                  return "Error: value must not be an empty String in data array of object " + k + " at index " + l;
                }
                
                if (reqBody.workout[k].data[l].timestamp == null) {
                  return "Error: a timestamp must be provided in data array of object " + k + " at index " + l; 
                } else if (typeof reqBody.workout[k].data[l].timestamp != "number") {
                  return "Error: the timestamp in data array of object " + k + " at index " + l + " must be of type Number";
                } else if (reqBody.workout[k].data[l].timestamp > current_time) {
                  return "Error: timestamp in data array of object " + k + " at index " + l + " is not formatted in seconds.";
                }
              }
            }
          }
        }
      }
      /*
      * Partners Data
      */
      if (reqBody.workout.partners != null) {
        if (typeof reqBody.workout.partners != "object" || reqBody.workout.partners.length == null) {
          return "Error: partners must be an array";
        }
        
        if (reqBody.workout.partners.length <= 0) {
          return "Error: partner array must not be empty if it exists";
        }
        
        for (var i = 0; i < reqBody.workout.partners.length; i++) {
          if (reqBody.workout.partners[i].name == null) {
            return "Error: missing partner name or partner name is null at index " + i;
          } else if (typeof reqBody.workout.partners[i].name != "string") {
            return "Error: partner name must be a String at index " + i;
          } else if (reqBody.workout.partners[i].name == "") {
            return "Error: partner name must not be an empty String in partners array at index " + i;
          }
          
          if (reqBody.workout.partners[i].device_id == null) {
            return "Error: missing partner device_id or partner device_id is null at index " + i;
          } else if (typeof reqBody.workout.partners[i].device_id != "string") {
            return "Error: partner device_id must be a String at index " + i;
          } else if (reqBody.workout.partners[i].device_id == "") {
            return "Error: partner device_id must not be an empty String in partners array at index " + i;
          }
        }
        
      }
      
      /*
      * Event Data
      */
      if (reqBody.events != null) {
        for (var j = 0; j < reqBody.events.length; j++) {
          if (reqBody.events[j].event_type == null) {
            return "Error: event_type is missing or null at index " + j + " in events array";
          } else if (typeof reqBody.events[j].event_type != "string") {
            return "Error: event_type must be of type string at index " + j + " in events array";
          } else if (reqBody.events[j].event_type == "") {
            return "Error: event_type must not be an empty string in events array at index " + j;
          }
          
          if (reqBody.events[j].timestamp == null) {
            return "Error: timestamp is missing or null at index " + j + " in events array";
          } else if (typeof reqBody.events[j].timestamp != "number") {
            return "Error: timestamp must be of type number at index " + j + "in events array";
          }  else if (reqBody.events[j].timestamp > current_time) {
              return "Error: timestamp in events array at index " + j + " is not formatted in seconds.";
          }
          
          switch (reqBody.events[j].event_type) {
            case "0":
            case "1":
            case "3":
              if (reqBody.events[j].current_page == null) {
                return "Error: current_page is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].current_page != "string") {
                return "Error: current_page must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].current_page == "") {
                return "Error: current_page must not be an empty String at index " + j + " in events array";
              }
              break;
            
            case "2":
              if (reqBody.events[j].button_name == null) {
                return "Error: button_name is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].button_name != "string") {
                return "Error: button_name must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].button_name == "") {
                return "Error: button_name must not be an empty String at index " + j + " in events array";
              }
              break;
              
            case "4":
              if (reqBody.events[j].setting_name == null) {
                return "Error: setting_name is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].setting_name != "string") {
                return "Error: setting_name must be of type number at index " + j + " in events array";
              } else if (reqBody.events[j].setting_name == "") {
                return "Error: setting_name must not be an empty String at index " + j + " in events array";
              }
              
              if (reqBody.events[j].previous_value == null) {
                return "Error: previous_value is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].previous_value != "string") {
                return "Error: previous_value must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].previous_value == "") {
                return "Error: previous_value must not be an empty String at index " + j + " in events array";
              }
              
              if (reqBody.events[j].current_value == null) {
                return "Error: current_value is missing or null at index " + j;
              } else if (typeof reqBody.events[j].current_value != "string") {
                return "Error: current_value must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].current_value == "") {
                return "Error: current_value must not be an empty String at index " + j + " in events array";
              }
              break;
              
            case "5":
            case "6":
              if (reqBody.events[j].workout_type == null) {
                return "Error: workout_type is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].workout_type != "string") {
                return "Error: workout_type must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].workout_type == "") {
                return "Error: workout_type must not be an empty String at index " + j + " in events array";
              }
              break;
              
            case "9":
            case "10":
              if (reqBody.events[j].device_id == null) {
                return "Error: device_id is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].device_id != "string") {
                return "Error: device_id must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].device_id == "") {
                return "Error: device_id must not be an empty String at index " + j + " in events array";
              }
              
              if (reqBody.events[j].name == null) {
                return "Error: name is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].name != "string") {
                return "Error: name must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].name == "") {
                return "Error: name must not be an empty String at index " + j + " in events array";
              }
              break;
              
            case "12":
            case "13":
               if (reqBody.events[j].device_id == null) {
                return "Error: device_id is missing or null at index " + j + " in events array";
              } else if (typeof reqBody.events[j].device_id != "string") {
                return "Error: device_id must be of type String at index " + j + " in events array";
              } else if (reqBody.events[j].device_id == "") {
                return "Error: device_id must not be an empty String at index " + j + " in events array";
              }
              break;
          }
          
        }
      }
      
      /*
      * Check for duplicate
      */
      var name = reqBody.name;
      var device_id = reqBody.device_id;
      var start_timestamp = reqBody.workout.start_timestamp;
      var end_timestamp = reqBody.workout.end_timestamp;
      var partner_name = null;
      var partner_device_id = null;
      var partners_size = 0;
      var events_size = 0;
      if (reqBody.workout.partners != null) {
        partner_name = reqBody.workout.partners[0].name;
        partner_device_id = reqBody.workout.partners[0].device_id;
        partners_size = reqBody.workout.partners.length;
      }
      
      if (reqBody.events != null) {
        events_size = reqBody.events.length;
      }
      
      var count = await context.services.get("FitnessLog").db("FitnessLog").collection("FitnessLogs").count({name: name, device_id: device_id, "workout.partners.name": partner_name, "workout.partners.device_id": partner_device_id, "workout.start_timestamp": start_timestamp, "workout.end_timestamp": end_timestamp, "workout.partners": { $size: partners_size }, events: { $size: events_size }});
    
      if (count > 0) {
        return "Error: found duplicate document(s) in the database";
      }
      
      return context.services.get("FitnessLog").db("FitnessLog").collection("FitnessLogs").insertOne(reqBody);
    } catch (err) {
      return err;
    }
};
