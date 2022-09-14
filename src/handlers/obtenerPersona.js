const AWS = require("aws-sdk");
const convertPeopleToPersona = require("../utils/convert");
const axios = require('axios').default;

module.exports.handler = async (event) => {
  const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
  const { personaId } = event.pathParameters;
  const params = {
    TableName: "persona",
    Key: {
      personaId
    },
  };

  try {
    const result = await dynamoDbClient.get(params).promise();
    const persona = result.Item;
    if (persona) {
      return persona;
    } else {

      try {
        const url = `https://swapi.py4e.com/api/people/${personaId}`;
        const resultSwapi =await axios.get(url);
        return convertPeopleToPersona(resultSwapi.data);
      } catch (error) {
        console.log(error);
        return  { 
            statusCode: 404, 
            body: "Persona no se encontro", 
        };
      }
    }
  } catch (error) {
    console.log(error);
    return  { 
        statusCode: 500, 
        body: "Error al buscar una persona", 
    };
  }
}
