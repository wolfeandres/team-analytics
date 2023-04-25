exports = function({ query, headers, body}, response) {
    // Find returns all documents without a query. 
    const doc = context.services.get("mongodb-atlas").db("FitnessLog").collection("Test").find();
    // return the list of documents.
    return doc;
};
