const Persona = require("../models/persona");
function convertPeopleToPersona(data)
{
    return new Persona({
        anho_nacimiento : data.birth_year,
        genero : data.gender,
        color_ojos : data.eye_color,
        color_pelo : data.hair_color,
        mundo : data.homeworld,
        masa : data.mass,
        nombre : data.name,
        color_piel : data.skin_color
    })
}

module.exports = convertPeopleToPersona