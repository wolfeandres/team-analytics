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
function getPartnerName (json: { workout: any}) {
    return json.workout.parner.name
}

export default { getName, getDeviceID, getSerialNumber, getEvents };
