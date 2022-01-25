// aplicacion para la gestion de citas para mascotas
// Usamos bootstrap para los estilos
// Utilizamos Clases

document.querySelector('title').textContent = "Administar Citas";

// variables para los input del formulario
const mascota = document.querySelector('#mascota');
const propietario = document.querySelector('#owner');
const telefono = document.querySelector('#phone');
const fecha = document.querySelector('#date');
const hora = document.querySelector('#hour');
const sintomas = document.querySelector('#symptom');

//UI
const formulario = document.querySelector('#formulario');
const contenedorCitas = document.querySelector('#citas');

// creamos las clases
class Citas {
    constructor(){
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];

        console.log(this.citas)
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

          // Agregar parrafo al DIV
          divCita.appendChild(mascotaParrafo);
          divCita.appendChild(propietarioParrafo);
          divCita.appendChild(telefonoParrafo);
          divCita.appendChild(fechaParrafo);
          divCita.appendChild(horaParrafo);
          divCita.appendChild(sintomasParrafo);

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
    mascota.addEventListener('input', datosCita);
    propietario.addEventListener('input', datosCita);
    telefono.addEventListener('input', datosCita);
    fecha.addEventListener('input', datosCita);
    hora.addEventListener('input', datosCita);
    sintomas.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

// creamos objeto para guardar la informacion de las cita
const cita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
};

function datosCita(e){
    //Llenamos el objeto con los datos para la cita
    cita[e.target.name] = e.target.value;
}

function nuevaCita(e){
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas} = cita;
    
    if((mascota === '') || (propietario === '') || (telefono === '') || (fecha === '') || (hora === '') || (sintomas === '')){
        ui.imprimirMensaje('Todos los datos son obligatorios', 'error');
        
        return;
    }

    // Crear un id
    cita.id = Date.now();

    // Generar una cita
    administrarCitas.agregarCita({...cita});  // se crea una copia del objeto y se le pasa a agregarCita sin utilizar el objeto global ya que se repetirian los datos.

     //Reiniciar el Objeto
     borrarDatosObjeto();

    // reiniciar Formulario
    formulario.reset();

    // Mostrar citas en el HTML
    ui.imprimirCitas(administrarCitas);
}

const borrarDatosObjeto = () =>{
    cita.mascota = '';
    cita.propietario = '';
    cita.telefono ='';
    cita.fecha = '';
    cita.hora = '';
    cita.sintomas = '';
}

