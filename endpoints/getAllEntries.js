exports = function({ query, headers, body}, response) {
    const doc = context.services.get("mongodb-atlas").db("FitnessLog").collection("Test").find();
    return doc;
};
