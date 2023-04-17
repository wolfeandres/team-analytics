exports = function({ query, headers, body}, response) {

    // Get request body
    const reqBody = JSON.parse(body.text());

    // Get the name of the user in the workout
    var name = reqBody.name;
  
    console.log("name " + name) 

    // Return all documents with that name
    const doc = context.services.get("mongodb-atlas").db("FitnessLog").collection("Test").find({ name: name});

    return doc;
};
