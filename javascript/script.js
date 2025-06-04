
const form = document.getElementById('formularioPaciente');
const tabla = document.getElementById('tablaPacientes').querySelector('tbody');
const authSection = document.getElementById('authSection');
const pacientesSection = document.getElementById('pacientesSection');
const mensajeAuth = document.getElementById('mensajeAuth');

const contadorCritico = document.getElementById('contadorCritico');
const contadorUrgente = document.getElementById('contadorUrgente');
const contadorModerado = document.getElementById('contadorModerado');
const contadorLeve = document.getElementById('contadorLeve');

let pacientes = [];


function registrar() {
  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value;
  const esMedico = document.getElementById('esMedico').checked;

  if (!usuario || clave.length < 6) {
    mostrarMensaje("Usuario (CI) obligatorio y contraseña mínimo 6 caracteres.", false);
    return;
  }

  if (!esMedico) {
    mostrarMensaje("Solo médicos pueden registrarse.", false);
    return;
  }


  if (localStorage.getItem(`user_${usuario}`)) {
    mostrarMensaje("El usuario ya está registrado.", false);
    return;
  }

  localStorage.setItem(`user_${usuario}`, clave);
  mostrarMensaje("✅ Registro exitoso. Ahora puede iniciar sesión.", true);
}


function login() {
  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value;
  const esMedico = document.getElementById('esMedico').checked;

  if (!usuario || clave.length < 6) {
    mostrarMensaje("Ingrese usuario y contraseña válidos.", false);
    return;
  }

  if (!esMedico) {
    mostrarMensaje("Solo médicos pueden iniciar sesión.", false);
    return;
  }

  const guardado = localStorage.getItem(`user_${usuario}`);
  if (guardado && guardado === clave) {
    mostrarMensaje("", true);
    authSection.style.display = 'none';
    pacientesSection.style.display = 'block';
    form.reset();
    actualizarContadores();
  } else {
    mostrarMensaje("Credenciales incorrectas o usuario no registrado.", false);
  }
}

function mostrarMensaje(msg, exito) {
  mensajeAuth.textContent = msg;
  mensajeAuth.className = exito ? 'mt-3 text-success' : 'mt-3 text-danger';
}


function validarFormulario(datos) {
  if (
    !datos.nombre || !datos.edad || !datos.genero || !datos.documento ||
    !datos.sintomas || !datos.gravedad || !datos.tratamiento ||
    !datos.medicamentos || !datos.examenes
  ) {
    alert("Por favor, complete todos los campos.");
    return false;
  }

  if (isNaN(datos.edad) || datos.edad <= 0) {
    alert("Edad debe ser un número mayor a 0.");
    return false;
  }

  if (datos.documento.length < 5) {
    alert("Documento debe tener al menos 5 caracteres.");
    return false;
  }

  if (datos.gravedad === "critico") {
    alert("⚠️ Paciente en estado crítico registrado.");
  }

  return true;
}


function agregarPaciente(paciente) {
}

  return true;
}
