const uuidv4 = require("uuid");
class Persona {
  constructor(data) {
    this.personaId = uuidv4.v4();
    this.anho_nacimiento = data.anho_nacimiento;
    this.genero = data.genero;
    this.color_ojos = data.color_ojos;
    this.color_pelo = data.color_pelo;
    this.mundo = data.mundo;
    this.masa = data.masa;
    this.nombre = data.nombre;
    this.color_piel = data.color_piel;
  }
}


module.exports = Persona