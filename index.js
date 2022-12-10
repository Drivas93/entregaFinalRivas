// Incorporación de datos desde HTML

const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const botonIngresar = document.getElementById("ingresar")
const divDatosUsuario = document.getElementById("datosUsuario")
const divBienvenida = document.getElementById("bienvenida")
const divStockProductos = document.getElementById("stockProductos")
const divCobertura = document.getElementById("cobertura")
const divSiguiente = document.getElementById("siguiente")
const divRandom = document.getElementById("random")


// Arreglo de stock
const arrayStock = [
    {
    producto: "Silla Eames",
    stock: "25",
    },
    {
    producto: "Recamara",
    stock: "30",
    },
    {
    producto: "Repisa",
    stock: "45",
    },
    {
    producto: "Escritorio",
    stock: "12",
    },
    {
    producto: "Buró",
    stock: "15",
    },
    {
    producto: "Sofá",
    stock: "25",
    },
    {
    producto: "Sofá Cama",
    stock: "7",
    },
    {
    producto: "Comedor",
    stock: "10",
    },
    {
    producto: "Librero",
    stock: "31",
    },
]

// arreglo de ciudades
const ciudades = [
    {
        nombre: "Guadalajara",
        cobertura: true
    },
    {
        nombre: "CDMX",
        cobertura: true
    },
    {
        nombre: "Montevideo",
        cobertura: false
    },
    {
        nombre: "Santiago de Chile",
        cobertura: true
    },
    {
        nombre: "Buenos Aires",
        cobertura: true
    },
    {
        nombre: "Curitiba",
        cobertura: false
    },
    {
        nombre: "Lima",
        cobertura: false
    },
    {
        nombre: "Bogotá",
        cobertura: true
    },

]


// Agrego evento 
botonIngresar.onclick = () => {
    if(inputNombre.value || inputApellido.value){
        const usuario = {
            nombre: inputNombre.value,
            apellido: inputApellido.value
        }
        // Guardo arreglo de usuario en localStorage junto con JSON para que sea usable
        localStorage.setItem("infoUsuario", JSON.stringify(usuario))
        // Quito información de bienvenida para movernos a siguiente segmento
        divDatosUsuario.remove()

        Swal.fire({
            title: `¡Binvenide ${usuario.nombre} ${usuario.apellido}!`,
            text:"Esto es un simulador de e-commerce",
            icon: "success",
        })

        // Agrego saludo con DOM en bienvenida
        const saludoH2= document.createElement("h2")
        saludoH2.innerText= `¡Binvenide ${usuario.nombre}, a nuestro simulador de e-commerce!`
        divBienvenida.append(saludoH2)

        consultaStock()

        const botonConsultar = document.getElementById("botonConsulta")
        botonConsultar.onclick = () => {
            const productoSeleccionado = document.getElementById("selectorStock").value
            const stockConsultado = arrayStock.find(producto => producto.producto === productoSeleccionado).stock
            const resultadoConsulta = document.createElement("p")
            resultadoConsulta.innerText = `El stock disponible para ${productoSeleccionado} es de ${stockConsultado}, ¡apúrate que se acaban!`
            divStockProductos.append(resultadoConsulta)

    
        }

        // const botonContinuar = document.getElementById("botonContinuar")
        // botonContinuar.onclick = () => {
        //     const textoCiudad= document.createElement("h2")
        //     textoCiudad.innerText= `Bien hecho ${usuario.nombre}, ahora ingresa tu ciudad para saber si tenemos cobertura`
        //     divCobertura.append(textoCiudad)
        //}

        cobertura()

        const botonCobertura = document.getElementById("botonCobertura")
        botonCobertura.onclick = () => {
            const ciudadSeleccionada = document.getElementById("selectorCiudad").value
            const coberturaSeleccionada = ciudades.find(nombre => nombre.nombre === ciudadSeleccionada).cobertura
            
            if(coberturaSeleccionada===false){
                Swal.fire({
                    title: `¡No contamos con envío!`,
                    text:"Espéranos próximamente",
                    icon: "error",
                })
            } else {

                Swal.fire({
                    title: `¡Contamos con envío!`,
                    text:"Gracias por confiar en nosotros",
                    icon: "success",
                })
            }

        }
        
        siguiente()
        const botonSiguiente = document.getElementById("botonSiguiente")
        botonSiguiente.onclick = () => {
            divCobertura.remove()
            divStockProductos.remove()
            divBienvenida.remove()
            botonSiguiente.remove()
            Swal.fire({
                title: `¡Gracias por tu compra!`,
                text:"Ahora veamos diferentes versiones de tu personaje favorito de Rick & Morty",
                icon: "info",
            })

            random()
            const botonRandom = document.getElementById("botonRandom")
            const inputName = document.getElementById("inputName")
            botonRandom.onclick = async () => {
                const infoApi = await fetch(`https://rickandmortyapi.com/api/character/?name=${inputName.value}`)
            
                const response = await infoApi.json()
                const personajes = response.results
                personajes.forEach(personaje =>{
                    const {name,image,species,type} = personaje
                    const li=document.createElement("li")
                    li.setAttribute("id","li")
                    li.innerHTML = `
                    <h2>${name}</h2>
                    <img src=${image}></img>
                    <p>${species}</p>
                    <p>${type}</p>
                    `
                    divRandom.append(li)
                })
        }
    }
    }
}

 // funcion consultar stock
 function consultaStock() {
    const copyInicial = document.createElement("p")
    copyInicial.innerText=("Seleccione el producto para consultar su existencia")

    const selectorStock = document.createElement("select")
    selectorStock.setAttribute("id","selectorStock")
    // opciones de selector desde array
        arrayStock.forEach(producto=>{
        const productoStock = document.createElement("option")
        productoStock.innerText = `${producto.producto}`
        selectorStock.append(productoStock)
        })
    // Boton de consulta
    const botonCalcular=document.createElement("button")
    botonCalcular.setAttribute("id","botonConsulta")
    botonCalcular.innerText = "CONSULTA INVENTARIO"


    divStockProductos.append(copyInicial,selectorStock,botonCalcular)
    }

    // funcion saber cobertura
    function cobertura() {
        const copyCiudad= document.createElement("h2")
        copyCiudad.innerText= `Bien hecho! ahora ingresa tu ciudad para saber si tenemos cobertura`

     const selectorCiudad = document.createElement("select")
     selectorCiudad.setAttribute("id","selectorCiudad")
        //Opciones desde array de ciudades
        ciudades.forEach(nombre =>{
            const ciudadOpcion = document.createElement("option")
            ciudadOpcion.innerText=`${nombre.nombre}`
            selectorCiudad.append(ciudadOpcion)
        }) 

        const botonCobertura = document.createElement("button")
        botonCobertura.setAttribute("id","botonCobertura")
        botonCobertura.innerText="CONSULTAR DISPONIBILIDAD DE ENVIO"





    divCobertura.append(copyCiudad,selectorCiudad,botonCobertura) 
    }

// Funcion siguiente 
function siguiente() {
    const botonSiguiente = document.createElement("button")
    botonSiguiente.setAttribute("id","botonSiguiente")
    botonSiguiente.innerText="Siguiente"

    divSiguiente.append(botonSiguiente)
}

function random (){
    const inputName = document.createElement("input")
    inputName.setAttribute("id","inputName")
    inputName.setAttribute("placeholder","Ingrese Personaje")

    const botonRandom = document.createElement("button")
    botonRandom.setAttribute("id","botonRandom")
    botonRandom.innerText="¡Quiero info de mi personaje favorito!"


    divRandom.append(inputName,botonRandom)
}