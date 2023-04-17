// gets the name of the user
function getName (json: { name: any; }) {
    return json.name;
}
    
// gets the user device id
function getDeviceID (json: { device_id: any; }) {
    return json.device_id;
}

// gets the user serial number
function getSerialNumber (json: { serial_number: any; }) {
    return json.serial_number;
}

// get the JSON object of events
function getEvents (json: { events: any; }) {
    return json.events;
}

// get the name of the partner
function getPartnerName (json: { workouts: any}) {

    if (json.workouts != null && json.workouts.length > 0) {
        return json.workouts[0].parner.name
    }
    return "null_name";
}

// compares two json files and returns if they are partner files
function isPartnerJSON(json: { name: string, workout: { start_timestamp: any, partners: any}}, partner_json: { name: string, workout: { start_timestamp: any, partners: any}}) {
    console.log(json);
    console.log(partner_json);
    var name = json.name;
    var partner_name = partner_json.name;

    var workout_timestamp = json.workout.start_timestamp;
    var partner_workout_timestamp = partner_json.workout.start_timestamp
    if (json.workout.partners[0].name == partner_name && partner_json.workout.partners[0].name == name) {
        if (Math.abs(workout_timestamp - partner_workout_timestamp) < 5) {
            return true;
        }
    }
    return false;
}

export default { getName, getDeviceID, getSerialNumber, getEvents, isPartnerJSON };
