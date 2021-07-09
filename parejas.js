Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
var contador = 0;
var ganadas = 0;
var victorias = 0;
var dibujos = ['telefono', 'mochila', 'bolis', 'mesa', ]


let arrayDeCartas = () => {
    return Array.from(document.getElementsByClassName('carta'));
}

let arrayDeReveladas = () => {
    return Array.from(document.querySelectorAll('.revelado:not(.emparejado)'));
}

let reparteCartas = () => {
    let misCartas = arrayDeCartas()
    let dibujosDoble = []
    dibujos.forEach(dibujo => {
        dibujosDoble.push(dibujo)
        dibujosDoble.push(dibujo)
    })


    for (var i = 0; i < misCartas.length; i++) {
        let randomIndex = Math.floor(Math.random() * dibujosDoble.length)
        misCartas[i].classList.add(dibujosDoble[randomIndex])
        dibujosDoble.splice(randomIndex, 1)
    }
}



let buscaParejas = function() {
    cartasReveladas = arrayDeReveladas()
    clasesReveladas = []
    for (let i = 0; i < cartasReveladas.length; i++) {
        const element = cartasReveladas[i];
        clases = Array.from(element.classList)
        clases.remove('carta')
        clases.remove('revelado')
        console.log(clases)
        clasesReveladas[i] = clases[0]
    }
    console.log(clasesReveladas)
    if (clasesReveladas[0] == clasesReveladas[1]) {
        cartasReveladas[0].classList.add('emparejado')
        cartasReveladas[1].classList.add('emparejado')
        console.log('Bien hecho!!!')
        ganadas++
        //clasesReveladas[i] = clases[0]
        //arrayDeReveladas().classList.remove('carta')
    }
    if (ganadas == 4) {
        console.log('Fin del juego')
        victorias++
        alert('lleva '+ victorias+ ' victorias')
        
    } else {
        setTimeout(()=>{
        console.log('Oh npooooo')
        console.log()
        reveladas = arrayDeReveladas()
        for (let i = 0; i < reveladas.length; i++) {
            reveladas[i].classList.remove('revelado')
            clasesReveladas[i] = clases[0]
        }},500);
    }
}

function reinicia() {
    console.log('re ini sia')
    let misCartas = arrayDeCartas()
    misCartas.forEach(carta => {
        carta.classList.remove('revelado')
        carta.classList.remove('emparejado')
        dibujos.forEach(dibujo => {
            carta.classList.remove(dibujo)
        })
    }) 
    contador = 0
    ganadas = 0
    reparteCartas()
}

let alClickar = function() {
    if (this.classList.contains('revelado')) {
        console.log("Aquesta carta jha está revelada, no hay más que descubrir")
        return
    }
    this.classList.add('revelado')
    contador++
    console.log(`contador: ${contador}`)
    if (contador == 2) {
        console.log("Buskame pareja")
        buscaParejas()
        contador = 0
    }
}


let pulsa = () => {
    arrayDeCartas().forEach(carta => {
        carta.onclick = alClickar
    })
    resetButton = document.getElementById('reinicia')
    resetButton.onclick = reinicia
}

let main = () => {
    pulsa()
    reparteCartas()
}

window.onload = main
//var misCartas = Array.from(document.getElementsByClassName("carta"));
//
//  for (var i = misCartas.length -1; i>=0; i--) {
//    let misCartas = misCartas[i]
//  misCartas.classList.add("revelado")
//}