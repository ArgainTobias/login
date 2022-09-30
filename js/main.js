const iniciarSesion = document.querySelector(".login__iniciarSesion");
const botonIniciar = document.querySelector('.boton-iniciar');
const mailIniciar = document.querySelector('#mail-iniciar');
const passIniciar = document.querySelector('#pass-iniciar');
const aCreateUna = document.querySelector('.a-create-una');
const resultadoIniciar = document.createElement('p');
let errorIniciar = [];

const crearCuenta = document.querySelector('.login__crearCuenta');
const aIniciaSesion = document.querySelector('.a-inicia-sesion');
const botonCrear = document.querySelector('.boton-crear');
const nombreCrear = document.querySelector('#nombre-crear');
const mailCrear = document.querySelector('#mail-crear');
const passCrear = document.querySelector('#pass-crear');
const confimacionPassCrear = document.querySelector('#confirmacion-pass-crear');
const iconoOjo = document.querySelectorAll('.pass-ojo');

const data = JSON.parse(localStorage.getItem("MIS_USUARIOS")) || usuarios;
let misUsuarios = new Usuarios(data);

const validacionIniciar = () => {

    if(mailIniciar.value.indexOf('@') != -1 && mailIniciar.value.indexOf('.') != -1 && mailIniciar.value.length > 6  && passIniciar.value.length >= 6){
        
        let estaRegistrado = misUsuarios.usuarios.some((usuario)=>usuario.mail == mailIniciar.value);
        let estaContraseña = misUsuarios.usuarios.some((usuario)=>usuario.password == passIniciar.value);

        if(estaRegistrado && estaContraseña){
            errorIniciar[0] = false;
            return errorIniciar
        }
        else if (estaRegistrado && !estaContraseña){
            errorIniciar[0] = true
            errorIniciar[1] = 'Contraseña incorrecta';
            return errorIniciar
        }
        else{
            errorIniciar[0] = true
            errorIniciar[1] = 'No se ha encontrado un usuario con ese email';
            return errorIniciar
        }
    }
    else{
        errorIniciar[0] = true;
        errorIniciar[1] = 'Debe completar ambos campos';
        return errorIniciar;
    }
}

const funcionalidadIniciarSesion = () => {
    console.log(misUsuarios)
    botonIniciar.addEventListener('click',(e) => {
        e.preventDefault();
        errorIniciar = validacionIniciar();
        if(errorIniciar[0]){
            resultadoIniciar.textContent = errorIniciar[1];
            resultadoIniciar.classList.remove("green")
            resultadoIniciar.classList.add('red');
            iniciarSesion.appendChild(resultadoIniciar);
        }
        else{
            resultadoIniciar.textContent = 'Sesión iniciada correctamente';
            resultadoIniciar.classList.remove('red');
            resultadoIniciar.classList.add('green');
            iniciarSesion.appendChild(resultadoIniciar);
        }
    });

    aCreateUna.addEventListener('click', (e) => {
        e.preventDefault();
        crearCuenta.setAttribute('style', 'display:grid;');
        iniciarSesion.setAttribute('style', 'display:none;');
        resultadoIniciar.classList.remove('green');
        resultadoIniciar.classList.remove('red');
        errorIniciar = [];
        resultadoIniciar.textContent = errorIniciar[1];
    });
    
    iconoOjo.forEach((icono)=>{
        icono.addEventListener('click', (e) => {
            e.preventDefault();
            if(icono.previousElementSibling.id === 'pass-crear'){
                if(passCrear.type === 'password'){
                    passCrear.removeAttribute('type');
                    passCrear.setAttribute('type', 'text');
                }
                else{
                    passCrear.removeAttribute('type');
                    passCrear.setAttribute('type', 'password');
                }
            }
            else if(icono.previousElementSibling.id === 'pass-iniciar'){
                if(passIniciar.type === 'password'){
                    passIniciar.removeAttribute('type');
                    passIniciar.setAttribute('type', 'text');
                }
                else{
                    passIniciar.removeAttribute('type');
                    passIniciar.setAttribute('type', 'password');
                }
            }
            else{
                if(confimacionPassCrear.type === 'password'){
                    confimacionPassCrear.removeAttribute('type');
                    confimacionPassCrear.setAttribute('type', 'text');
                }
                else{
                    confimacionPassCrear.removeAttribute('type');
                    confimacionPassCrear.setAttribute('type', 'password');
                }
            }
        })
    })  
};

const funcionalidadCrearCuenta = () => {

    botonCrear.addEventListener('click', (e) => {
        e.preventDefault();
        if(nombreCrear.value.length != 0 && passCrear.value.length >= 6 && passCrear.value === confimacionPassCrear.value && mailCrear.value.indexOf("@") != -1 && mailCrear.value.indexOf(".") != -1){
            let estaMailCrear = misUsuarios.usuarios.some((usuario) => usuario.mail === mailCrear.value);
            if(estaMailCrear){
                resultadoIniciar.textContent = 'El email ya se encuentra registrado';
                resultadoIniciar.classList.remove('green');
                resultadoIniciar.classList.add('red');
                crearCuenta.appendChild(resultadoIniciar);
            }
            else{
                let usuario = {
                    nombre: nombreCrear.value,
                    mail : mailCrear.value,
                    password : passCrear.value,
                }
                misUsuarios.addUsuario(usuario);
                misUsuarios.guardar();
                resultadoIniciar.textContent = 'Su cuenta ha sido creada correctamente';
                resultadoIniciar.classList.remove('red')
                resultadoIniciar.classList.add('green');
                crearCuenta.appendChild(resultadoIniciar);
            }
        }
        else{
            resultadoIniciar.textContent = 'Por favor revise sus datos';
            resultadoIniciar.classList.remove('green');
            resultadoIniciar.classList.add('red')
            crearCuenta.appendChild(resultadoIniciar);
        }
    })

    aIniciaSesion.addEventListener('click', (e) => {
        e.preventDefault();
        iniciarSesion.setAttribute('style', 'display:grid;');
        crearCuenta.setAttribute('style', 'display:none;');
        resultadoIniciar.classList.remove('green');
        resultadoIniciar.classList.remove('red');
    })
    
}


const init = () => {
    funcionalidadCrearCuenta();
    funcionalidadIniciarSesion();
} 

init();