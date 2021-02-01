const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomaInput = document.querySelector("#sintomas");

const formulario = document.querySelector("#nueva-cita");

const contenedorCitas = document.querySelector("#citas");

let citasObj = {
  id: "",
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
  }

  editarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
  }
}

class UI {
  mostrarAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");

    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    divMensaje.textContent = mensaje;

    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();

    citas.forEach((cita) => {
      const {
        id,
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas,
      } = cita;

      const divCita = document.createElement("div");

      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span>${propietario}`;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `<span class="font-weight-bolder">Telefono: </span>${telefono}`;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `<span class="font-weight-bolder">Fecha: </span>${fecha}`;

      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `<span class="font-weight-bolder">Hora: </span>${hora}`;

      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `<span class="font-weight-bolder">Sintomas: </span>${sintomas}`;

      const btnEliminar = document.createElement("button");
      btnEliminar.onclick = () => eliminarCitas(id);
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
		</svg>`;

      const btnEditar = document.createElement("button");
      btnEditar.onclick = () => cargarEdicion(cita);
      btnEditar.classList.add("btn", "btn-info", "mr-2");
      btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
		<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
		<path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
	</svg>`;

      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const ui = new UI();
let administrarCita = new Citas();
let editado;

eventListeners();

function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomaInput.addEventListener("input", datosCita);

  formulario.addEventListener("submit", agregarCitas);
}

function datosCita(e) {
  citasObj[e.target.name] = e.target.value;
}

function agregarCitas(e) {
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

function reiniciarObj() {
  citasObj.mascota = "";
  citasObj.propietario = "";
  citasObj.telefono = "";
  citasObj.fecha = "";
  citasObj.hora = "";
  citasObj.sintomas = "";
}

function eliminarCitas(id) {
  administrarCita.eliminarCita(id);

  ui.mostrarAlerta("La cita se elimino correctamente");

  ui.imprimirCitas(administrarCita);
}

function cargarEdicion(cita) {
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
