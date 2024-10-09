/*     aqui desplegamos los modulos de inscripciones y mostramos las inscripciones */

$(document).ready(function () {
    $("#inscripcionesNav").click(function () {
        const datos = {
            control: '5'
        };
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {
                $('#TablaIns').html('<tr hidden></tr>');
                control = 0;
                response.forEach(function (inscripcion) {
                    control = control + 1;
                    $('#TablaIns').append(
                        `<tr><th>${control}</th><td>${inscripcion.nombre_c}</td><td>${inscripcion.descripcion}</td><td>${inscripcion.nombre_u}</td><td><button class="accion btn btn-warning" id="U${inscripcion.id_i}"> Editar </button></td><td><button id="D${inscripcion.id_i}" class="accion btn btn-danger"> Eliminar </button></td></tr>`

                    );
                });
                /* ocultamos las demas paginas para que todo sea en un archivo html*/
                console.log(response);
                $('#oculto').fadeIn(1000);
                $("#idInscrpciones").show(750);
                $("#idCurso").hide();
                $("#idUsuario").hide();
            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos."
                  });
            }
        });

    });

/*     aqui desplegamos el modal de inscrpicones y le insertamos valores para actualizar  */
    $('#BotonesIEE').on('click', '.accion', function () {
        var id = $(this).attr('id');
        const datos = {
            control: '8',
            botonEE: id
        }
        console.log(datos.botonEE);
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {

                if (response.con == 1) {
                    console.log(response.con);
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Eliminado correctamnete!",
                        icon: "success"
                      });
                } else if (response.con == 2) {
                    $('#id_i').html(`<input id="id_iii" name="id_iii" value="${datos.botonEE}" hidden>`);
                    $('#seleccionCU').html(`<option value="${response.cursoA}">Selecciona un curso</option>`);
                    response.dos.forEach(function (curso) {
                        $('#seleccionCU').append(`<option value="${curso.id_c}">${curso.nombre_c} </option>`);
                    });
                    $('#seleccionCU').append(`<option value="${datos.botonEE}" hidden>id</option>`);

                    $('#seleccionUU').html('<option value="">Selecciona un curso</option>');
                    response.uno.forEach(function (curso) {
                        $('#seleccionUU').append(`<option value="${curso.id_u}">${curso.nombre_u} </option>`);
                    });
                    $('#modalIU').modal('show');

                }
            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown, response) {
                console.error('Error:', textStatus, errorThrown);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos."
                  });


            }
        });
    });

/*     aqui desplegamos los modulos de curos y mostramos las curos */
    $("#cursosNav").click(function () {
        const datos = {
            control: '6'
        };
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {
                $('#TablaCur').html('<tr hidden></tr>');
                control = 0;
                response.forEach(function (cursos) {
                    control = control + 1;
                    $('#TablaCur').append(
                        `<tr><th>${control}</th><td>${cursos.nombre_c}</td><td>${cursos.descripcion}</td><td> <button class="accion btn btn-warning" id="U${cursos.id_c}"> Editar </button></td><td><button id="D${cursos.id_c}" class="accion btn btn-danger"> Eliminar </button></td></tr>`

                    );
                });
                /* ocultamos las demas paginas para que todo sea en un archivo html*/
                $('#oculto').fadeIn(1000);
                $("#idCurso").show(750);
                $("#idUsuario").hide();
                $("#idInscrpciones").hide();
            },
            /* en caso de error manda mensaje */
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos."
                  });
            }
        });

    });

/*     aqui desplegamos el modal de curos y le insertamos valores para actualizar  */
    $('#BotonesCEE').on('click', '.accion', function () {
        var id = $(this).attr('id');
        const datos = {
            control: '10',
            botonEE: id
        }
        console.log(datos.botonEE);
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {

                if (response.con == 1) {
                    console.log(response.con);
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Eliminado correctamnete!",
                        icon: "success"
                      });
                } else if (response.con == 2) {
                    console.log(response.uno);
                    $('#id_ic').html(`<input id="id_icu" name="id_icu" value="${datos.botonEE}" hidden>`);
                    $('#nombreCU').html(`<input id="nombreCUU" name="nombreCUU" type="text" class="form-control"  value="${response.uno[0].nombre_c}">`);
                    $('#descripcionCU').html(`<textarea id="descripcionCUU" name="descripcionCUU" class="form-control" rows="4" cols="50" >${response.uno[0].descripcion}</textarea>`);
                    $('#modalCU').modal('show');

                }
            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos."
                  });


            }
        });
    });





/*     aqui desplegamos los modulos de usuarios y mostramos las usuarios */

    $("#usuariosNav").click(function () {
        const datos = {
            control: '7'
        };
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {
                $('#TablaUsu').html('<tr hidden></tr>');
                control = 0;
                response.forEach(function (usuarios) {
                    control = control + 1;
                    $('#TablaUsu').append(
                        `<tr><th>${control}</th><td>${usuarios.nombre_u}</td><td><button class="accion btn btn-warning" id="U${usuarios.id_u}"> Editar </button></td><td><button id="D${usuarios.id_u}" class="accion btn btn-danger"> Eliminar </button></td></tr>`
                    );
                });
                /* ocultamos las demas paginas para que todo sea en un archivo html*/
                $('#oculto').fadeIn(1000);
                $("#idUsuario").show(750);
                $("#idCurso").hide();
                $("#idInscrpciones").hide();
            },
            /* en caso de error manda mensaje */
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos."
                  });
            }
        });

    });




/*     aqui desplegamos el modal de usuarios y le insertamos valores para actualizar  */
    $('#BotonesUEE').on('click', '.accion', function () {
        var id = $(this).attr('id');
        const datos = {
            control: '12',
            botonEE: id
        }
        console.log(datos.botonEE);
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {

                if (response.con == 1) {
                    console.log(response.con);
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Eliminado correctamnete!",
                        icon: "success"
                      });
                } else if (response.con == 2) {
                    console.log(response.uno);
                    console.log(response.uno[0].nombre_u);
                    $('#id_ic').html(`<input id="id_iuu" name="id_iuu" value="${datos.botonEE}" hidden>`);
                    $('#nombreUU').html(`<input id="nombreUUU" name="nombreUUU" type="text" class="form-control"  value="${response.uno[0].nombre_u}">`);
                    $('#modalUU').modal('show');

                }
            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos."
                  });

            }
        });
    });






/* ocultamos las demas paginas para que todo sea en un archivo html*/
    $("#NuevoC").click(function () {
        $('#modalC').modal('show');
    });

/* ocultamos las demas paginas para que todo sea en un archivo html*/
    $("#NuevoU").click(function () {
        $('#modalU').modal('show');
    });

/*     enviamos formulario de usuarios*/

    $('#formU').on('submit', function (event) {
        event.preventDefault();
        const datos = {
            control: $('#controlU').val(),
            nombreU: $('#nombreU').val()
        };
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                 /*recibimos respuesta del json que enviamos al controlador php */
                console.log('Respuesta:', response);
                alert(response.mensaje);
                $('#nombreU').val('');
                $('#cerrarU').click();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                alert('No se registro: ' + response.mensaje);
                $('#nombreU').val('');
                $('#cerrarU').click();
            }
        });
    });
/*     enviamos formulario de curos*/
    $('#formC').on('submit', function (event) {
        event.preventDefault();
        //console.log('holaa');
        const datos = {
            control: $('#controlC').val(),
            nombreC: $('#nombreC').val(),
            descripcionC: $('#descripcionC').val()
        };
        console.log('holaa2');
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                 /*recibimos respuesta del json que enviamos al controlador php */
                console.log('Respuesta:', response);
                alert(response.mensaje);
                $('#nombreC').val('');
                $('#descripcionC').val('');
                $('#cerrarC').click();
            },
            /* en caso de error manda mensaje */
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                alert('No se registro: ' + response.mensaje);
                $('#nombreC').val('');
                $('#descripcionC').val('');
                $('#cerrarC').click();
            }
        });
    });
/*     desplegamos modal de inscripciones*/
    $('#NuevoI').click(function () {
        const datos = {
            control: '4'
        };
        //console.log('hola');
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                 /*recibimos respuesta del json que enviamos al controlador php */
                //var cursos  =JSON.parse(response);
                $('#seleccionC').html('<option value="">Selecciona un Alumno</option>');
                response.uno.forEach(function (curso) {
                    if (!curso.id_u) {
                        console.log('bien');
                    }
                    $('#seleccionC').append(
                        `<option value="${curso.id_u}">${curso.nombre_u} </option>`
                    );
                });
                $('#seleccionU').html('<option value="">Selecciona un curso</option>');
                response.dos.forEach(function (curso) {
                    $('#seleccionU').append(
                        `<option value="${curso.id_c}">${curso.nombre_c} </option>`
                    );
                });
                $('#modalI').modal('show');

            },
            /* en caso de error manda mensaje */
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos."
                  });
            }
        });
    });
/*     enviamos formulario de  inscripciones*/
    $('#formI').on('submit', function (event) {
        event.preventDefault();
        const datos = {
            control: $('#controlI').val(),
            cursoI: $('#seleccionC').val(),
            alumnoI: $('#seleccionU').val()
        };
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {
                 /*recibimos respuesta del json que enviamos al controlador php */
                console.log('Respuesta:', response.mensaje);
                alert('registro exitoso');
                $('#cerrarI').click();
                //window.location='/crud';
            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                $('#cerrarI').click();
            }
        });
    });
/*     desplegamos modal de usuarios*/
    $('#formIU').on('submit', function (event) {
        event.preventDefault();
        const datos = {
            control: $('#controlIU').val(),
            cursoI: $('#seleccionCU').val(),
            alumnoI: $('#seleccionUU').val(),
            id_i: $('#id_iii').val()
        };
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {
                console.log('Respuesta:', response);

                alert('Actualizacion exitoso');
                $('#cerrarIU').click();

            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                $('#cerrarIU').click();
            }
        });
    });

/*     desplegamos modal de actualizacion de cursos*/
    $('#formCU').on('submit', function (event) {
        event.preventDefault();
        const datos = {
            control: $('#controlCU').val(),
            nombrec: $('#nombreCUU').val(),
            descripcion: $('#descripcionCUU').val(),
            id_c: $('#id_icu').val()
        };
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {

                alert('Actualizacion exitoso');
                $('#cerrarCU').click();

            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                $('#cerrarCU').click();
            }
        });
    });
/*     desplegamos modal actualizacion de usuarios */
    $('#formUU').on('submit', function (event) {
        event.preventDefault();
        const datos = {
            control: $('#controlUU').val(),
            nombreu: $('#nombreUUU').val(),
            id_u: $('#id_iuu').val()
        };
        console.log(datos.control);
        console.log(datos.nombreu);
        console.log(datos.id_u);
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
             /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {

                alert(response.mensaje);
                $('#cerrarUU').click();

            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                $('#cerrarUU').click();
            }
        });
    });


});
