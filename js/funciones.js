import Citas from "../clases/Citas.js";
import UI from "../clases/UI.js";
import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomaInput,
  formulario
} from "./selectores.js";

export const ui = new UI();
export let administrarCita = new Citas();

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
    ui.mostrarAlerta("Editado correctamente");
    formulario.querySelector("button[type='submit']").textContent =
      "Crear cita";
    administrarCita.editarCita({ ...citasObj });
    editado = false;
  } else {
    citasObj.id = Date.now();
    administrarCita.agregarCita({ ...citasObj });
    ui.mostrarAlerta("Se agrego correctamente");
  }

  reiniciarObj();

  ui.imprimirCitas(administrarCita);

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
  administrarCita.eliminarCita(id);

  ui.mostrarAlerta("La cita se elimino correctamente");

  ui.imprimirCitas(administrarCita);
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
