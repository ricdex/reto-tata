const handler = require('../src/handlers/obtenerPersona');
const AWS = require("aws-sdk");
const axios = require('axios').default;

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
const personaSwapiMock = {
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "hair_color": "blond",
    "skin_color": "fair",
    "eye_color": "blue",
    "birth_year": "19BBY",
    "gender": "male",
    "homeworld": "https://swapi.py4e.com/api/planets/1/",
}

jest.mock('axios');
axios.mockResolvedValue();

describe('obtener persona', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      AWS.config.update({region:'us-east-1'});
    });

    test('ok from dynamo', async () => {
      
        const awsMock = jest.spyOn(AWS.DynamoDB, 'DocumentClient');
        awsMock.mockImplementation(() => {
            return {
            get: (params, callback) => {
                return {
                    promise() {
                    return Promise.resolve({ Item : personaMock});
                    }
                };
            }
            }
        });
        const eventMock = { pathParameters: { personaId: "1fedb6f5-36ae-4ae6-8391-681466c8d51e"} };
        const response = await handler.handler(eventMock);
        
        expect(response).toEqual(personaMock);
    });

    test('ok from swapi', async () => {
      
        const awsMock = jest.spyOn(AWS.DynamoDB, 'DocumentClient');
        awsMock.mockImplementation(() => {
            return {
            get: (params, callback) => {
                return {
                    promise() {
                    return Promise.resolve({ Item : null});
                    }
                };
            }
            }
        });
        axios.get.mockImplementation(() => Promise.resolve({ data: personaSwapiMock }));
        const eventMock = { pathParameters: { personaId: "1"} };
        const response = await handler.handler(eventMock);

        expect(response.personaId).not.toBe('');
        delete response.personaId;
        
        expect(response).toEqual(personaMock);
    });
  });