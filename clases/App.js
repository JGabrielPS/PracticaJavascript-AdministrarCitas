import { datosCita, agregarCitas } from "../js/funciones.js";
import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomaInput,
  formulario
} from "../js/selectores.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    mascotaInput.addEventListener("input", datosCita);
    propietarioInput.addEventListener("input", datosCita);
    telefonoInput.addEventListener("input", datosCita);
    fechaInput.addEventListener("input", datosCita);
    horaInput.addEventListener("input", datosCita);
    sintomaInput.addEventListener("input", datosCita);

    formulario.addEventListener("submit", agregarCitas);
  }
}

export default App;
