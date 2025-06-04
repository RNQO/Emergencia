// Variables para sesión
const STORAGE_SESSION_KEY = "session_active_user";
const STORAGE_PACIENTES_KEY = "pacientes_emergencias";

// Detectar si ya hay sesión activa al cargar
window.onload = () => {
  const usuarioActivo = localStorage.getItem(STORAGE_SESSION_KEY);
  if (usuarioActivo) {
    authSection.style.display = 'none';
    pacientesSection.style.display = 'block';
    cargarPacientes();
    actualizarContadores();
  }
};

// Al hacer login exitoso guardar sesión
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
    localStorage.setItem(STORAGE_SESSION_KEY, usuario); // Guardar sesión
    mostrarMensaje("", true);
    authSection.style.display = 'none';
    pacientesSection.style.display = 'block';
    cargarPacientes();
    actualizarContadores();
    form.reset();
  } else {
    mostrarMensaje("Credenciales incorrectas o usuario no registrado.", false);
  }
}

// Logout (agrega un botón en HTML si quieres)
function logout() {
  localStorage.removeItem(STORAGE_SESSION_KEY);
  pacientesSection.style.display = 'none';
  authSection.style.display = 'block';
  pacientes = [];
  tabla.innerHTML = "";
  mostrarMensaje("", true);
}

// Cargar pacientes desde localStorage
function cargarPacientes() {
  const datos = localStorage.getItem(STORAGE_PACIENTES_KEY);
  pacientes = datos ? JSON.parse(datos) : [];
  mostrarPacientes();
}

// Guardar pacientes en localStorage
function guardarPacientes() {
  localStorage.setItem(STORAGE_PACIENTES_KEY, JSON.stringify(pacientes));
}

// Al enviar formulario, evitar recarga y agregar paciente
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    edad: parseInt(document.getElementById('edad').value),
    genero: document.getElementById('genero').value,
    documento: document.getElementById('documento').value.trim(),
    sintomas: document.getElementById('sintomas').value.trim(),
    gravedad: document.getElementById('gravedad').value,
    tratamiento: document.getElementById('tratamiento').value.trim(),
    medicamentos: document.getElementById('medicamentos').value.trim(),
    examenes: document.getElementById('examenes').value,
  };

  if (!validarFormulario(datos)) return;

  pacientes.push(datos);
  guardarPacientes();
  mostrarPacientes();
  actualizarContadores();
  form.reset();
});

// Mostrar pacientes en tabla con colores y ordenados por gravedad
function mostrarPacientes() {
  // Ordenar según gravedad: critico > urgente > moderado > leve
  const ordenGravedad = { critico: 1, urgente: 2, moderado: 3, leve: 4 };
  pacientes.sort((a, b) => ordenGravedad[a.gravedad] - ordenGravedad[b.gravedad]);

  tabla.innerHTML = "";
  pacientes.forEach((paciente, i) => {
    const tr = document.createElement('tr');
    tr.className = paciente.gravedad;

    tr.innerHTML = `
      <td>${paciente.nombre}</td>
      <td>${paciente.edad}</td>
      <td>${paciente.genero}</td>
      <td>${paciente.documento}</td>
      <td>${paciente.sintomas}</td>
      <td>${paciente.gravedad.charAt(0).toUpperCase() + paciente.gravedad.slice(1)}</td>
      <td>${paciente.tratamiento}</td>
      <td>${paciente.medicamentos}</td>
      <td>${paciente.examenes}</td>
      <td><button class="btn btn-sm btn-danger" onclick="eliminarPaciente(${i})">Eliminar</button></td>
    `;
    tabla.appendChild(tr);
  });
}

// Actualizar contador por gravedad
function actualizarContadores() {
  const conteo = { critico: 0, urgente: 0, moderado: 0, leve: 0 };
  pacientes.forEach(p => {
    conteo[p.gravedad]++;
  });
  contadorCritico.textContent = `Crítico: ${conteo.critico}`;
  contadorUrgente.textContent = `Urgente: ${conteo.urgente}`;
  contadorModerado.textContent = `Moderado: ${conteo.moderado}`;
  contadorLeve.textContent = `Leve: ${conteo.leve}`;
}

// Eliminar paciente por índice
function eliminarPaciente(index) {
  pacientes.splice(index, 1);
  guardarPacientes();
  mostrarPacientes();
  actualizarContadores();
}

// Validar formulario (igual que antes)
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
