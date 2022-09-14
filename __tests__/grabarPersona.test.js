const handler = require('../src/handlers/grabarPersona');
const AWS = require("aws-sdk");

const personaMock = {
    "anho_nacimiento": "19BBY",
    "genero": "male",
    "color_ojos": "blue",
    "color_pelo": "blond",
    "mundo": "https://swapi.py4e.com/api/planets/1/",
    "masa": "77",
    "nombre": "Luke Skywalker",
    "color_piel": "fair"
}

describe('grabar persona', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      AWS.config.update({region:'us-east-1'})
      const awsMock = jest.spyOn(AWS.DynamoDB, 'DocumentClient');
      awsMock.mockImplementation(() => {
        return {
          put: (params, callback) => {
            return {
                promise() {
                  return Promise.resolve();
                }
            };
          }
        }
      });
    });

    test('ok', async () => {
      const eventMock = { body: JSON.stringify(personaMock) };
      const response = await handler.handler(eventMock);

      expect(response.personaId).not.toBe('');
      
      delete response.personaId;
      expect(response).toEqual(personaMock);
      
    });
  });