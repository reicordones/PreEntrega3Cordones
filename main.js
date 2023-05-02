let nombre = prompt("Ingrese Nombre");
let nacimiento = parseInt(prompt("Ingrese su año de nacimiento"));

function indiceMasaCorporal(peso, estatura){
    return peso / (estatura * estatura)
}

let edad = 2023 - nacimiento;
alert(`Hola ${nombre} tienes ${edad} años de edad`);

if(edad >= 35){
    alert("Analizaremos tu riesgo cardiovascular")
    let peso = prompt("Ingresa tu peso en Kg")
    let estatura = prompt("Ingresa tu estatura en metros")
    let resultado = indiceMasaCorporal(peso, estatura);
    
    switch (true){
        case resultado < 18.5:
            alert(`${nombre} tu indice de masa corporal es ${resultado.toFixed(2)}, estás bajo de peso`);
            break;
        case resultado >= 18.5 && resultado < 25:
            alert(`${nombre} tu indice de masa corporal es ${resultado.toFixed(2)}, tu peso es normal`);
            break;
        case resultado >= 25 && resultado < 30:
            alert(`${nombre} tu indice de masa corporal es ${resultado.toFixed(2)}, estás por encima de un peso normal`);
            break;
        default:
            alert(`${nombre} tu indice de masa corporal es ${resultado.toFixed(2)}, tienes sobrepeso, debes bajar de peso por tu salud`);
            break;
    }
}else{
    alert("No te encuentras en edad de riesgo cardiovascular")
}