//variables
const enviarBtn = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
//validacion con exprecion regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

eventListener();
function eventListener() {
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    // campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //reiniciar formulario
    resetBtn.addEventListener('click', resetearFormulario);

    //enviar email
    formulario.addEventListener('submit', enviarEmail);

}

//funciones
function iniciarApp() {
    enviarBtn.disable = true;
    enviarBtn.classList.add('cursor-not-allowed', 'opacity-50');
}

// valida campos de formularios 
function validarFormulario(e) {

    if (e.target.value.length > 0) {
        //Eliminar los errores
        const error = document.querySelector('p.error');
        // selecc. etiqueta P que tenga clase error
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');

    }

    if (e.target.type === 'email') {
        if (er.test(email.value)) {
        //Eliminar los errores
        const error = document.querySelector('p.error');
        // selecc. etiqueta P que tenga clase error
        if (error) {
            error.remove();
         }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
        
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no Valido');
        }
    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        enviarBtn.disable = false;
        enviarBtn.classList.remove('cursor-not-allow', 'opacity-50');
    }

}

//Mensaje de Error
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0 ) {
        formulario.appendChild(mensajeError);
    }

    
}

//envia el email
function enviarEmail(e) {
    e.preventDefault();
    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    //despues de 3 seg ocultaar el spinner y mostrar mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        //mensaje dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10','p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        //inserta parrafo antes de spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();//eliminar el mensaje
            resetearFormulario();
        }, 5000);

    }, 3000);

}

//funcion resetea formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}




