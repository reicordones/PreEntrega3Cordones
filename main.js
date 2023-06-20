class Paciente {
  constructor(nombre, apellido, dni, peso, altura) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.peso = peso;
    this.altura = altura;
  }

  calcularIMC() {
    let resultado = this.peso / (this.altura ** 2);
    return resultado.toFixed(2);
  }

  obtenerRecomendacion() {
    let imc = this.calcularIMC();
    let recomendacion = '';

    if (imc < 18.5) {
      recomendacion = 'Estás bajo de peso. Consulta a un profesional de la salud.';
    } else if (imc >= 18.5 && imc < 25) {
      recomendacion = 'Tu peso es normal. ¡Sigue así!';
    } else if (imc >= 25 && imc < 30) {
      recomendacion = 'Estás por encima de un peso normal. Considera realizar actividad física y llevar una dieta balanceada.';
    } else {
      recomendacion = 'Tienes sobrepeso. Es importante que consultes a un profesional de la salud y adoptes hábitos saludables.';
    }

    return recomendacion;
  }
}

let arrayPacientes = [];

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
}

const formulario = document.getElementById('formulario');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCalcularIMC = document.getElementById('btnCalcularIMC');
const infoPacientes = document.getElementById('infoPacientes');

formulario.addEventListener('submit', handleSubmit);
btnCalcularIMC.addEventListener('click', handleCalcularIMC);
btnLimpiar.addEventListener('click', limpiarPantalla);

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

function handleCalcularIMC() {
  const dni = prompt('Ingrese el DNI del paciente:');
  mostrarIMCPaciente(dni);
}

function mostrarPacientes() {
  console.log(arrayPacientes); // Imprimir por consola

  // let pacientesHTML = '';

  // arrayPacientes.forEach(function (paciente) {
  //   const pacienteHTML = `
  //     <div>
  //       <h3>${paciente.nombre} ${paciente.apellido}</h3>
  //       <p>DNI: ${paciente.dni}</p>
  //       <p>Peso: ${paciente.peso} kg</p>
  //       <p>Altura: ${paciente.altura} m</p>
  //       <hr>
  //     </div>
  //   `;

  //   pacientesHTML += pacienteHTML;
  // });

  // infoPacientes.innerHTML = pacientesHTML;
}

function limpiarPantalla() {
  infoPacientes.innerHTML = '';
}

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
