class Pacientes {
    constructor(nombre, apellido, dni, peso, altura) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.peso = peso;
      this.altura = altura;
    }
  }

  const pacienteReinaldo = new Pacientes('Reinaldo', 'Cordones', 12345678, 73, 1.69);
  const pacienteRebecca = new Pacientes('Rebecca', 'Cordones', 87654321, 25, 1.43);
  const pacienteVeronica = new Pacientes('Veronica', 'Suarez', 1234567, 77, 1.89);
  const pacienteFelipe = new Pacientes('Felipe', 'Jacome', 12345679, 58, 1.63);
  
  const arrayPacientes = [];
  
  arrayPacientes.push(pacienteReinaldo);
  arrayPacientes.push(pacienteRebecca);
  arrayPacientes.push(pacienteVeronica);
  arrayPacientes.push(pacienteFelipe);
  
  console.log(arrayPacientes);
  
  //Función con el menú de opciones:
  
  function menu() {
    alert('Bienvenido al control de riesgo Cardiovascular');
    let opcion = parseInt(
      prompt(
        'Ingrese una opción: \n 1) Registro de paciente \n 2) Indice de masa corporal \n 3) Salir'
      )
    );
    return opcion;
  }

  //Función para registrar un paciente:

function registroPaciente() {
  let nombre = prompt('Ingrese el nombre del paciente: ');
  let apellido = prompt('Ingrese el apellido del paciente: ');
  let dni = parseInt(prompt('Ingrese el DNI del paciente: '));
  let peso = parseInt(prompt('Ingrese el peso del paciente: '));
  let altura = parseInt(prompt('Ingrese la altura del paciente en metros: '));
  let paciente = new Pacientes(nombre, apellido, dni, peso, altura);
  arrayPacientes.push(paciente);
  console.log(arrayPacientes);
}

//Función para calcular indice de masa corporal

function calcularIMC() {
  let dni = parseInt(prompt("Ingrese DNI del paciente"));
  let paciente = arrayPacientes.find((paciente) => paciente.dni === dni);

  if (paciente) {
    let peso = paciente.peso;
    let altura = paciente.altura;
    let resultado = peso / (altura ** 2);

    let nacimiento = parseInt(prompt("Ingrese su año de nacimiento"));
    let edad = 2023 - nacimiento;
    alert(`Hola ${paciente.nombre}, tienes ${edad} años de edad`);

    if (edad >= 35) {
      alert('Analizaremos tu riesgo cardiovascular');
      switch (true) {
        case resultado < 18.5: {
          alert(`${paciente.nombre}, tu índice de masa corporal es ${resultado.toFixed(2)}, estás bajo de peso`);
          break;
        }
        case resultado >= 18.5 && resultado < 25: {
          alert(`${paciente.nombre}, tu índice de masa corporal es ${resultado.toFixed(2)}, tu peso es normal`);
          break;
        }
        case resultado >= 25 && resultado < 30: {
          alert(`${paciente.nombre}, tu índice de masa corporal es ${resultado.toFixed(2)}, estás por encima de un peso normal`);
          break;
        }
        default: {
          alert(`${paciente.nombre}, tu índice de masa corporal es ${resultado.toFixed(2)}, tienes sobrepeso, debes bajar de peso por tu salud`);
          break;
        }
      }
    } else {
      alert("No te encuentras en edad de riesgo cardiovascular");
    }
  } else {
    alert("No se encontró al paciente en la lista");
  }
}

//Función para salir del programa:

function salir() {
  alert('Gracias por utilizar nuestro análisis ');
}

//Ejecuto el programa:

let opcion;

while (opcion !== 3) {
  opcion = menu();
  switch (opcion) {
    case 1:
      registroPaciente();
      break;
    case 2:
      calcularIMC();
      break;
    case 3:
      salir();
      break;
    default:
      alert('Opción incorrecta');
      break;
  }
}