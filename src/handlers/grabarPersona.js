const AWS = require("aws-sdk");
const Persona = require("../models/persona");

module.exports.handler = async (event) => {

  const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
  const persona = new Persona(JSON.parse(event.body));
  const params = {
    TableName: "persona",
    Item: persona
  };

  try {
    await dynamoDbClient.put(params).promise();
    return persona;
  } catch (error) {
    console.log(error);
    return { error: "No se pudo crear a la persona" };
  }
}
