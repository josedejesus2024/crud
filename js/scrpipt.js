/*     aqui desplegamos los modulos de inscripciones y mostramos las inscripciones */

$(document).ready(function () {

    /* VAriables para mostrar */

    const urlParams = new URLSearchParams(window.location.search);
    recargar = urlParams.get('recargar');
    if (recargar == 1) {
        //aqui recargamos si agrega una nueva inscripcion, elimina o actualiza una inscrpipcion
        setTimeout(function () {
            $('#inscripcionesNav').click();
        }, 200);
    } else if (recargar == 2) {
        //aqui recargamos si agrega una nueva cursos, elimina o actualiza un curso
        setTimeout(function () {
            $('#cursosNav').click();
        }, 200);
    } else if (recargar == 3) {
        //aqui recargamos si agrega una nueva usuario, elimina o actualiza un usuario
        setTimeout(function () {
            $('#usuariosNav').click();
        }, 200);
    }


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
                        icon: "error"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const recargar = 1;
                            window.location = `/crud?recargar=${recargar}`;
                            console.log('Respuesta:', response.mensaje);
                        }
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
                        icon: "error"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const recargar = 2;
                            window.location = `/crud?recargar=${recargar}`;
                            console.log('Respuesta:', response.mensaje);
                        }
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
                        icon: "error"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const recargar = 3;
                            window.location = `/crud?recargar=${recargar}`;
                            console.log('Respuesta:', response.mensaje);
                        }
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


                $('#nombreU').val('');
                $('#cerrarU').click();

                Swal.fire({
                    title: "Regitrado!",
                    text: "Regitro correctamnete!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const recargar = 3;
                        window.location = `/crud?recargar=${recargar}`;
                        console.log('Respuesta:', response.mensaje);
                    }
                });


            },
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.mensaje
                });
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

                $('#nombreC').val('');
                $('#descripcionC').val('');
                $('#cerrarC').click();
                Swal.fire({
                    title: "Registrado!",
                    text: "Registrado correctamnete!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const recargar = 2;
                        window.location = `/crud?recargar=${recargar}`;
                        console.log('Respuesta:', response.mensaje);
                    }
                });
            },
            /* en caso de error manda mensaje */
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.mensaje
                });
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
        console.log(datos.control);
        console.log(datos.cursoI);
        console.log(datos.alumnoI);

        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function (response) {

                Swal.fire({
                    title: "Bien!",
                    text: "Registado Correctamente!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const recargar = 1;
                        window.location = `/crud?recargar=${recargar}`;
                        console.log('Respuesta:', response.mensaje);
                        console.log('Respuesta:', response.seg1);
                        console.log('Respuesta:', response.seg2);
                        console.log('Respuesta:', response.seg3);
                    }
                });


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
        console.log(datos.control);
        console.log('curso ', datos.cursoI);
        console.log('alumno', datos.alumnoI);
        console.log('alumno', datos.id_i);
        $.ajax({
            url: 'controller.php',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            /*recibimos respuesta del json que enviamos al controlador php */
            success: function (response) {
                console.log('Respuesta:', response);

                Swal.fire({
                    title: "Actualizado!",
                    text: "Actualizado correctamnete!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const recargar = 1;
                        window.location = `/crud?recargar=${recargar}`;
                        console.log('holaaa chuy');
                        console.log('Respuesta:', response.mensaje);
                        console.log('Respuesta:', response.seg1);
                        console.log('Respuesta:', response.seg2);
                        console.log('Respuesta:', response.seg3);
                    }
                });

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
                Swal.fire({
                    title: "Actualizado!",
                    text: "Actualizado correctamnete!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const recargar = 2;
                        window.location = `/crud?recargar=${recargar}`;
                        console.log('Respuesta:', response.mensaje);
                    }
                });
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

                Swal.fire({
                    title: "Actualizado!",
                    text: "Actualizado correctamnete!",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        const recargar = 3;
                        window.location = `/crud?recargar=${recargar}`;
                        console.log('Respuesta:', response.mensaje);
                    }
                });

            },
            /* en caso de error manda mensaje */
            error: function (textStatus, errorThrown) {
                console.error('Error:', textStatus, errorThrown);
                $('#cerrarUU').click();
            }
        });
    });


});
