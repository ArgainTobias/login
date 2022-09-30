class Usuarios {
  constructor(usuarios) {
    this.usuarios = usuarios;
  }

  addUsuario(usuario) {
    this.usuarios.push(usuario);
  }

  guardar() {
    localStorage.setItem("MIS_USUARIOS", JSON.stringify(this.usuarios));
  }
}

class UsuarioLogeado {
  constructor(usuarioLogeado){
    this.usuarioLogeado = usuarioLogeado;
  }

  guardar(){
    localStorage.setItem("USUARIO_LOGEADO", JSON.stringify(this.usuarioLogeado));
  }
}