// const socket = io();

const botonEnviar = document.getElementById('btn_enviar_productos')
const btn_enviar_mensajes = document.getElementById('btn_enviar_mensajes')
const title_input = document.getElementById('title_input');
const price_input = document.getElementById('price_input');
const email_input = document.getElementById('email_input');
const mensaje_chat_input = document.getElementById('mensaje_chat_input');
const btn_logueo = document.getElementById('btn_logueo');
const container_view_logueo = document.getElementById('container_view_logueo');
const formulario_login = document.getElementById('formulario_login');
const username = document.getElementById('username');

const mostrarProductos = (data) => {
    console.log(data);
    const productosMostrar = data.map(e => {
        return `<tr>
            <td>${e.title}</td>
            <td>${e.price}</td>
        </tr><br>`
    })

    const mensajeHTML = `
    <tr>
        <th>Title</th>
        <th>Price</th>
    </tr><br>
    ${productosMostrar}
    ` 
    const productosListado = document.getElementById('productosListado')
    productosListado.innerHTML = mensajeHTML;
}

const mostrarChat = data => {
    console.log(data);
    const mensajesMostrar = data.map(e => {
        return `<div>
            <span style="color:blue;">${e.email}</span>
            <span style="color:brown;">${e.fecha}</span>
            <span style="color:green;">${e.mensaje}</span>
        </div>`
    })

    const mensajeHTMLChat = mensajesMostrar;

    const historial_mensajes = document.getElementById('historial_mensajes')
    historial_mensajes.innerHTML = mensajeHTMLChat;
}



botonEnviar.addEventListener('click', e => {
    if(title_input.value && price_input.value){
        const mensaje = {
            title : title_input.value,
            price : price_input.value
        }
        console.log(mensaje);
        socket.emit('nuevoMensaje',mensaje);
    }
    else{
        alert("Ingrese productos");
    }
})


btn_enviar_mensajes.addEventListener('click', e => {
    if(email_input.value && mensaje_chat_input.value){
        const mensaje = {
            email : email_input.value,
            mensaje : mensaje_chat_input.value
        }
        console.log(mensaje);
        socket.emit('nuevoMensajeChat',mensaje);
        email_input.value = '';
        mensaje_chat_input.value = '';
    }
    else{
        alert("Ingrese mensajes del chat");
    }
})

// socket.on('mensajesActualizados', data => {
//     mostrarProductos(data);
// })

// socket.on('mensajesActualizadosChat', data => {
//     mostrarChat(data);
// })


const nuevaSession = () => {
    formulario_login.style.display = "none";

    console.log("Comprobando");

    let pEncabezado = document.createElement("p");
    let btn_deslogueo = document.createElement("button")

    pEncabezado.append(`Bienvenido ${username.value}`);
    btn_deslogueo.append("Deslogueo");

    container_view_logueo.append(pEncabezado,btn_deslogueo);
}

btn_logueo.addEventListener('click',nuevaSession);
// btn_logueo.onclick = nuevaSession();