// aplicacion para la gestion de citas para mascotas
// Usamos bootstrap para los estilos
// Utilizamos Clases

document.querySelector('title').textContent = "Administar Citas";

// variables para los input del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#owner');
const telefonoInput = document.querySelector('#phone');
const fechaInput = document.querySelector('#date');
const horaInput = document.querySelector('#hour');
const sintomasInput = document.querySelector('#symptom');

//UI
const formulario = document.querySelector('#formulario');
const contenedorCitas = document.querySelector('#citas');

let editando;

// creamos las clases
class Citas {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
    }
}

class UI {
    imprimirMensaje(mensaje, tipo){
        // creamos el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'mt-2', 'alert', 'd-block', 'col-12');

        // Agregar clase segun la clase de errorbeforebegin
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        // agregar el mensaje al Div
        divMensaje.textContent = mensaje;

        // agregar mensaje al DOM
        document.querySelector('#fila').insertAdjacentElement('beforebegin', divMensaje);

        // borrar el mensaje de error despues de 5 segundos
        setTimeout( () => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}) {

        this.limpiarHTML();

        citas.forEach(cita => {
          const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;

          // Crear DIV
          const divCita = document.createElement('div');
          divCita.classList.add('cita', 'p-3');
          divCita.dataset.id = id;

          // Scripting de los elementos de la cita
          const mascotaParrafo = document.createElement('h2');
          mascotaParrafo.classList.add('card-title', 'fw-bolder');
          mascotaParrafo.textContent = mascota;
          
          const propietarioParrafo = document.createElement('p'); 
          propietarioParrafo.innerHTML = `
            <span class="fw-bolder">Propietario: </span> ${propietario}
          `;

        const telefonoParrafo = document.createElement('p');
        telefonoParrafo.innerHTML = `
            <span class="fw-bolder">Telefono: </span>${telefono}
        `;

        const fechaParrafo = document.createElement('p');
        fechaParrafo.innerHTML = `
            <span class="fw-bolder">Fecha: </span>${fecha}
        `;

        const horaParrafo = document.createElement('p');
        horaParrafo.innerHTML = `
            <span class="fw-bolder">Hora: </span>${hora}
        `;

        const sintomasParrafo = document.createElement('p');
        sintomasParrafo.innerHTML = `
            <span class="fw-bolder">Sintomas: </span>${sintomas}
        `;

        // boton para eliminar cita
        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" class=" size h-6 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
        
        btnEliminar.onclick = () => eliminarCita(id);

        // Crear boton Editar
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-info');
        btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" class=" size h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>'

        btnEditar.onclick = () => editarCita(cita);

          // Agregar parrafo al DIV
          divCita.appendChild(mascotaParrafo);
          divCita.appendChild(propietarioParrafo);
          divCita.appendChild(telefonoParrafo);
          divCita.appendChild(fechaParrafo);
          divCita.appendChild(horaParrafo);
          divCita.appendChild(sintomasParrafo);
          divCita.appendChild(btnEliminar);
          divCita.appendChild(btnEditar);
          // Agregar las citas en el HTML
          contenedorCitas.appendChild(divCita);
      });
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

eventListener();
// Agrego los eventos
function eventListener(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// creamos objeto para guardar la informacion de las cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};

function datosCita(e){
    //Llenamos el objeto con los datos para la cita
    citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e){
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    
    if((mascota === '') || (propietario === '') || (telefono === '') || (fecha === '') || (hora === '') || (sintomas === '')){
        ui.imprimirMensaje('Todos los datos son obligatorios', 'error');
        
        return;
    }

    if(editando){
        ui.imprimirMensaje('Se agrego correctamente');

        // pasar el objeto de la cita a edicion

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;

    }else{
         // Crear un id aqui
        citaObj.id = Date.now();

        // Generar una cita
        administrarCitas.agregarCita({...citaObj});  // aqui se crea una copia del objeto y se le pasa a agregarCita sin utilizar el objeto global ya que se repetirian los datos.

        //Mensaje de agregado correctamente
        ui.imprimirMensaje('Se agrego correctamente');
    }

     //Reiniciar el Objeto
     borrarDatosObjeto();

    // reiniciar Formulario
    formulario.reset();

    // Mostrar citas en el HTML
    ui.imprimirCitas(administrarCitas);
}

const borrarDatosObjeto = () =>{ //aqui
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono ='';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}
const eliminarCita = id =>{

    // Eliminar una cita
    administrarCitas.eliminarCita(id);

    // Mostrar un mensaje
    ui.imprimirMensaje('Cita eliminada correctamente');

    // Actualizar citas
    ui.imprimirCitas(administrarCitas);
}

const editarCita = (cita) =>{
    const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;

    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.propietario = propietario;
    citaObj.mascota = mascota;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}

