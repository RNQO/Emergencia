function validarFormulario(datos) {
  if (
    !datos.nombre || !datos.edad || !datos.genero || !datos.documento ||
    !datos.sintomas || !datos.gravedad || !datos.tratamiento ||
    !datos.medicamentos || !datos.examenes
  ) {
    mostrarMensaje("Por favor, complete todos los campos.", false);
    return false;
  }

  if (isNaN(datos.edad) || datos.edad <= 0) {
    mostrarMensaje("Edad debe ser un número mayor a 0.", false);
    return false;
  }

  if (datos.documento.length < 5) {
    mostrarMensaje("Documento debe tener al menos 5 caracteres.", false);
    return false;
  }

  if (datos.gravedad === "critico") {
    mostrarMensaje("⚠️ Paciente en estado crítico registrado.", true);
  } else {
    mostrarMensaje("", true);
  }

  return true;
}



function agregarPaciente(paciente) {
}
