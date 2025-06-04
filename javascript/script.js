function mostrarMensaje(msg, ok = false) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = msg;
  mensaje.className = ok ? "text-success text-center mb-3" : "text-danger text-center mb-3";
}

function registrar() {
  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value;
  const ci = document.getElementById('ci').value.trim();
  const esMedico = document.getElementById('esMedico').value;

  if (usuario === '' || clave.length < 6 || ci === '') {
    mostrarMensaje("Completa todos los campos correctamente.");
    return;
  }

  if (esMedico !== 'si') {
    mostrarMensaje("Solo los médicos pueden crear una cuenta.");
    return;
  }

  localStorage.setItem(`user_${usuario}`, JSON.stringify({ clave, ci }));
  mostrarMensaje("✅ Cuenta creada con éxito. Ahora puedes iniciar sesión.", true);
}

function login() {
  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value;
  const esMedico = document.getElementById('esMedico').value;

  const datos = localStorage.getItem(`user_${usuario}`);
  if (!datos) {
    mostrarMensaje("Usuario no encontrado.");
    return;
  }

  const { clave: claveGuardada } = JSON.parse(datos);

  if (claveGuardada === clave && esMedico === 'si') {
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('pacientesSection').style.display = 'block';
  } else {
    mostrarMensaje("Credenciales incorrectas o acceso denegado.");
  }
}
