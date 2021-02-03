import UI from "../clases/UI.js";
import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomaInput,
  formulario,
} from "./selectores.js";

export const ui = new UI();
export let DB = "";

export let editado;

export let citasObj = {
  id: "",
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

export function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomaInput.addEventListener("input", datosCita);

  formulario.addEventListener("submit", agregarCitas);
}

export function datosCita(e) {
  citasObj[e.target.name] = e.target.value;
}

export function agregarCitas(e) {
  e.preventDefault();

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citasObj;

  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.mostrarAlerta("Ningun campo puede estar vacio", "error");
    return;
  }

  if (editado) {
    const transaction = DB.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");
    const peticion = objectStore.put(citasObj);

    transaction.oncomplete = () => {
      ui.mostrarAlerta("Editado correctamente");
      formulario.querySelector("button[type='submit']").textContent =
        "Crear cita";
      editado = false;
    };

    transaction.onerror = (e) => {
      ui.mostrarAlerta("La cita no se pudo editar", "error");
      console.error(e);
    };
  } else {
    citasObj.id = Date.now();

    const transaction = DB.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");
    const peticion = objectStore.add(citasObj);

    transaction.oncomplete = () => {
      ui.mostrarAlerta("Se agrego correctamente");
    };

    transaction.onerror = (e) => {
      ui.mostrarAlerta("La cita no se pudo crear", "error");
      console.error(e);
    };
  }

  reiniciarObj();

  ui.imprimirCitas();

  formulario.reset();
}

export function reiniciarObj() {
  citasObj.mascota = "";
  citasObj.propietario = "";
  citasObj.telefono = "";
  citasObj.fecha = "";
  citasObj.hora = "";
  citasObj.sintomas = "";
}

export function eliminarCitas(id) {
  const transaction = DB.transaction(["citas"], "readwrite");
  const objectStore = transaction.objectStore("citas");

  objectStore.delete(id);

  transaction.oncomplete = () => {
    ui.mostrarAlerta("La cita se elimino correctamente");
  };

  transaction.onerror = (e) => {
    ui.mostrarAlerta("La cita no se pudo eliminar", "error");
    console.error(e);
  };

  ui.imprimirCitas();
}

export function cargarEdicion(cita) {
  const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;

  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomaInput.value = sintomas;

  citasObj.mascota = mascota;
  citasObj.propietario = propietario;
  citasObj.telefono = telefono;
  citasObj.fecha = fecha;
  citasObj.hora = hora;
  citasObj.sintomas = sintomas;
  citasObj.id = id;

  formulario.querySelector("button[type='submit']").textContent =
    "Guardar cambios";

  editado = true;
}

export function crearDB() {
  const crearDB = window.indexedDB.open("citas", 1);

  crearDB.onerror = () => {
    console.log("Error al crear la DB");
  };

  crearDB.onsuccess = () => {
    console.log("DB creada");

    DB = crearDB.result;

    ui.imprimirCitas();
  };

  crearDB.onupgradeneeded = (e) => {
    const db = e.target.result;

    const objectStore = db.createObjectStore("citas", {
      keyPath: "id",
      autoIncrement: true,
    });

    objectStore.createIndex("mascota", "mascota", { unique: false });
    objectStore.createIndex("propietario", "propietario", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("fecha", "fecha", { unique: false });
    objectStore.createIndex("hora", "hora", { unique: false });
    objectStore.createIndex("sintomas", "sintomas", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });

    console.log("DB creada y lista");
  };
}
