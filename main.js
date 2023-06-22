//Definición de la clase Paciente

class Paciente {
  constructor(nombre, apellido, dni, peso, altura) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.peso = peso;
    this.altura = altura;
  }

 // Método para calcular el IMC del paciente

  calcularIMC() {
    let resultado = this.peso / (this.altura ** 2);
    return resultado.toFixed(2);
  }

// Método para obtener la recomendación según el IMC del paciente

  obtenerRecomendacion() {
    let imc = this.calcularIMC();
    let recomendacion = '';

    if (imc < 18.5) {
      recomendacion = 'Estás bajo de peso. Consulta a un profesional de la salud';
    } else if (imc >= 18.5 && imc < 25) {
      recomendacion = 'Tu peso es normal. ¡Sigue así!';
    } else if (imc >= 25 && imc < 30) {
      recomendacion = 'Estás por encima de un peso normal. Considera realizar actividad física y llevar una dieta balanceada';
    } else {
      recomendacion = 'Tienes sobrepeso. Es importante que consultes a un profesional de la salud y adoptes hábitos saludables';
    }

    return recomendacion;
  }
}

// Array para almacenar los pacientes

let arrayPacientes = [];

// Cargar datos de pacientes desde localStorage o archivo JSON

if (localStorage.getItem('pacientes')) {
  const pacientesData = JSON.parse(localStorage.getItem('pacientes'));

  pacientesData.forEach(function (pacienteData) {
    const paciente = new Paciente(
      pacienteData.nombre,
      pacienteData.apellido,
      pacienteData.dni,
      pacienteData.peso,
      pacienteData.altura
    );
    arrayPacientes.push(paciente);
  });
} else {
  fetch('pacientes.json')
    .then(response => response.json())
    .then(data => {
      arrayPacientes = data.map(pacienteData => new Paciente(
        pacienteData.nombre,
        pacienteData.apellido,
        pacienteData.dni,
        pacienteData.peso,
        pacienteData.altura
      ));

      localStorage.setItem('pacientes', JSON.stringify(arrayPacientes));

      mostrarPacientes();
    })
    .catch(error => {
      console.error('Error al cargar los datos de pacientes:', error);
    });
}

// Obtener referencias a elementos del DOM

const formulario = document.getElementById('formulario');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCalcularIMC = document.getElementById('btnCalcularIMC');
const infoPacientes = document.getElementById('infoPacientes');

// Event listeners

formulario.addEventListener('submit', handleSubmit);
btnCalcularIMC.addEventListener('click', handleCalcularIMC);
btnLimpiar.addEventListener('click', limpiarPantalla);

// Función para manejar el envío del formulario de registro de paciente

function handleSubmit(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const dni = document.getElementById('dni').value;
  const peso = document.getElementById('peso').value;
  const altura = document.getElementById('altura').value;

  const pacienteExistente = arrayPacientes.find(paciente => paciente.dni === dni);
  if (pacienteExistente) {
    alert('Ya existe un paciente con el mismo DNI');
    return;
  }

  const paciente = new Paciente(nombre, apellido, dni, peso, altura);
  arrayPacientes.push(paciente);

  localStorage.setItem('pacientes', JSON.stringify(arrayPacientes));

  formulario.reset();

  mostrarPacientes();
}

// Función para manejar el botón de cálculo de IMC

function handleCalcularIMC() {
  const dni = prompt('Ingrese el DNI del paciente:');
  mostrarIMCPaciente(dni);
}

// Función para mostrar la información de los pacientes en el DOM

function mostrarPacientes() {
  console.log(arrayPacientes);

  let pacientesHTML = '';

  arrayPacientes.forEach(function (paciente) {
    const imc = paciente.calcularIMC();
    const recomendacion = paciente.obtenerRecomendacion();

    const pacienteHTML = `
      <div>
        <h3>${paciente.nombre} ${paciente.apellido}</h3>
        <p>DNI: ${paciente.dni}</p>
        <p>Peso: ${paciente.peso} kg</p>
        <p>Altura: ${paciente.altura} m</p>
        <p>IMC: ${imc}</p>
        <p>Recomendación: ${recomendacion}</p>
        <hr>
      </div>
    `;

    pacientesHTML += pacienteHTML;
  });

  infoPacientes.innerHTML = pacientesHTML;
}

// Función para limpiar la pantalla de información de pacientes

function limpiarPantalla() {
  infoPacientes.innerHTML = '';
}

// Función para mostrar el IMC y recomendación de un paciente específico

function mostrarIMCPaciente(dni) {
  const pacienteIndex = arrayPacientes.findIndex(function (paciente) {
    return paciente.dni === dni;
  });

  if (pacienteIndex !== -1) {
    const paciente = arrayPacientes[pacienteIndex];
    const imc = paciente.calcularIMC();
    const recomendacion = paciente.obtenerRecomendacion();

    let pacienteHTML = `
      <div>
        <h3>${paciente.nombre} ${paciente.apellido}</h3>
        <p>DNI: ${paciente.dni}</p>
        <p>Peso: ${paciente.peso} kg</p>
        <p>Altura: ${paciente.altura} m</p>
        <p>IMC: ${imc}</p>
        <p>Recomendación: ${recomendacion}</p>
        <hr>
      </div>
    `;

    infoPacientes.innerHTML = pacienteHTML;
  } else {
    infoPacientes.innerHTML = 'No se encontró al paciente.';
  }
}

mostrarPacientes();
