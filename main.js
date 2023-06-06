class Paciente {
  constructor(nombre, apellido, dni, peso, altura) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.peso = peso;
    this.altura = altura;
  }

//Función para calcular indice de masa corporal

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

//Registro de pacientes

const arrayPacientes = [];
const formulario = document.getElementById('formulario');
const btnRegistrar = document.getElementById('btnRegistrar');
const btnCalcularIMC = document.getElementById('btnCalcularIMC');
const infoPacientes = document.getElementById('infoPacientes');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const dni = document.getElementById('dni').value;
  const peso = document.getElementById('peso').value;
  const altura = document.getElementById('altura').value;
  
  const paciente = new Paciente(nombre, apellido, dni, peso, altura);
  arrayPacientes.push(paciente);
  
  formulario.reset();
  
  mostrarPacientes();
});

//Traer IMC por DNI

btnCalcularIMC.addEventListener('click', () => {
  const dni = prompt('Ingrese el DNI del paciente:');
  mostrarIMCPaciente(dni);
});

function mostrarPacientes() {
  console.log(arrayPacientes);
  
  let pacientesHTML = '';
  
  arrayPacientes.forEach((paciente) => {
    const pacienteHTML = `
      <div>
        <h3>${paciente.nombre} ${paciente.apellido}</h3>
        <p>DNI: ${paciente.dni}</p>
        <p>Peso: ${paciente.peso} kg</p>
        <p>Altura: ${paciente.altura} m</p>
        <hr>
      </div>
    `;
    
    pacientesHTML += pacienteHTML;
  });
  
  infoPacientes.innerHTML = pacientesHTML;
}

function mostrarIMCPaciente(dni) {
  const paciente = arrayPacientes.find((paciente) => paciente.dni === dni);
  
  if (paciente) {
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