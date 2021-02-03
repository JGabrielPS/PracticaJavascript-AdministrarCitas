import { eventListeners, crearDB } from "../js/funciones.js";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    eventListeners();

    crearDB();
  }
}

export default App;
