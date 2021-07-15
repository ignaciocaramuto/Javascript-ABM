//Declaracion clase contacto
class Contacto{
    constructor(id, nombre, apellido, telefono){
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.telefono = telefono
    }
}
//Declaracion variables
let id = 0
let contactos = []
let idCapturado = ''

const formulario = document.getElementById('formulario')
const formularioEditar = document.getElementById('formularioEditar')
const cuerpoDeLaTabla = document.querySelector('tbody')

const nombre = document.getElementById('txtNombre')
const apellido = document.getElementById('txtApellido')
const telefono = document.getElementById('txtTelefono')

const nombreEditar = document.getElementById('editarNombre')
const apellidoEditar = document.getElementById('editarApellido')
const telefonoEditar = document.getElementById('editarTelefono')

//Metodos ABM
const crearContacto = (nombre, apellido, telefono) =>{
    const contacto = new Contacto(id, nombre, apellido, telefono)
    contactos.push(contacto)
    console.log(contactos)
    id++

    renderizarTabla()
}

const editarContacto = () => {
    contactos.forEach(contacto => {
        if(contacto.id == idCapturado){
            contacto.nombre = nombreEditar.value
            contacto.apellido = apellidoEditar.value
            contacto.telefono = telefonoEditar.value
        }
    })
    renderizarTabla()
}

const eliminarContacto = (id) => {
    contactos = contactos.filter(contacto => contacto.id != id)
    renderizarTabla()
}

//Event listeners 
formulario.addEventListener('submit', (evento) => {
    crearContacto(nombre.value, apellido.value, telefono.value)

    evento.preventDefault()
    formulario.reset()
})

formularioEditar.addEventListener('submit', (evento) => {
    editarContacto()
    evento.preventDefault()
    formularioEditar.reset()
})

cuerpoDeLaTabla.addEventListener('click', (evento) => {
    if(evento.target.classList.contains("btn-warning")){
        const idContacto = evento.target.parentNode.parentNode.children[0].innerHTML
        const nombreContacto = evento.target.parentNode.parentNode.children[1].innerHTML
        const apellidoContacto = evento.target.parentNode.parentNode.children[2].innerHTML
        const telefonoContacto = evento.target.parentNode.parentNode.children[3].innerHTML

        idCapturado = idContacto
        nombreEditar.value = nombreContacto
        apellidoEditar.value = apellidoContacto
        telefonoEditar.value = telefonoContacto
    }
})

//Metodo para mostrar la tabla
const renderizarTabla = () => {
    cuerpoDeLaTabla.innerHTML = ''
    contactos.forEach(contacto => {
        cuerpoDeLaTabla.innerHTML += 
        `<tr  class="text-center">
        <td>${contacto.id}</td>
        <td>${contacto.nombre}</td>
        <td>${contacto.apellido}</td>
        <td>${contacto.telefono}</td>
        <td>
            <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEditarContacto">Editar</button>
            <button onClick="eliminarContacto('${contacto.id}')" class="btn btn-danger">Borrar</button>
        </td>
        </tr>`
    });
}