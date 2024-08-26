//Inicializacion de Variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timerInicial = 30;
let timer = 30;
let tiempoRegresivoId = null;

//Para usar audio
let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Generacion de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//Funciones
//Temporizador
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Time: ${timer} seconds`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000);
}

//Bloquear Tarjetas
function bloquearTarjetas(){
    for(let i = 0; i <= 15; i++ ){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i]}.png" alt="">`; 
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion Principal
function destapar(id){

    //Temporizador
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //Mostrar el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        //Para mostrar Imagenes
        tarjeta1.innerHTML = `<img src="./images/${primerResultado}.png" alt="">`;
        clickAudio.play(); 

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/${segundoResultado}.png" alt="">`; 

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movements: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar "Score"
            aciertos++;
            mostrarAciertos.innerHTML = `Score: ${aciertos}`;
            rightAudio.play();

            if(aciertos == 8){
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Score: ${aciertos}👻😨`;
                mostrarTiempo.innerHTML = `Fantastic 🎉 your time was ${timerInicial - timer} seconds`;
                mostrarMovimientos.innerHTML = `Movements: ${movimientos} 🎉😎🤞`;
            }

        }else{
            //Mostrar por un rato valores y volver a tapar
            wrongAudio.play();
            setTimeout(()=>{
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}