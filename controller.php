<?php
// hacemos una conexion
$mysqli = new mysqli("localhost", "root", "", "cursos");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
header('Content-Type: application/json');
$data = file_get_contents('php://input');
$datos = json_decode($data, true);
$control = $datos['control'];

//insertamos usuario
if ($control == 3) {
    if ($datos['nombreU']) {
        $respuesta2 = $datos['nombreU'];
        $sql = "INSERT INTO usuarios (nombre_u) VALUES ('$respuesta2')";
        $insertarU = $mysqli->query($sql);
        $respuesta = [
            'status' => 'succses',
            'mensaje' => 'Se registro correctamente: ' . $respuesta2
        ];
    } else {
        $respuesta = [
            'status' => 'error',
            'mensaje' => 'No se recibieron datos válidos'
        ];
    }
    // insertamos curso
} elseif ($control == 2) {
    if ($datos['nombreC']) {
        $respuesta2 = $datos['nombreC'];
        $respuesta3 = $datos['descripcionC'];
        $sql = "INSERT INTO curso (nombre_c, descripcion) VALUES ('$respuesta2', '$respuesta3')";
        $insertarC = $mysqli->query($sql);
        $respuesta = [
            'status' => 'succses',
            'mensaje' => 'Se registro correctamente: ' . $respuesta2
        ];
    } else {
        $respuesta = [
            'status' => 'error',
            'mensaje' => 'No se recibieron datos válidos'
        ];
    }
    //insertamos inscripcion
} elseif ($control == 1) {

    if ($datos['cursoI']  && $datos['alumnoI']) {
        $respuesta2 = $datos['cursoI'];
        $respuesta3 = $datos['alumnoI'];
        $sql = "INSERT INTO inscripciones (id_ic, id_iu) VALUES ($respuesta2, $respuesta3)";
        $insertarI = $mysqli->query($sql);
        $respuesta = [
            'status' => 'succses',
            'mensaje' => 'Se registro correctamente: '
        ];
    } else {
        $respuesta = [
            'status' => 'error',
            'mensaje' => 'No se recibieron todos los datos de inscrpcion'
        ];
    }
    //realizamos una consulta a usuarios y desplegamos en el modal
} elseif ($control == 4) {
    $respuesta = [];
    $sql = "SELECT * FROM usuarios";
    $resultado = $mysqli->query($sql);
    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $respuesta[] = $row;
        }
    }
    //realizamos una consulta a cursos y desplegamos en el modal
    $sql = "SELECT * FROM curso";
    $resultado2 = $mysqli->query($sql);
    if ($resultado2->num_rows > 0) {
        while ($row = $resultado2->fetch_assoc()) {
            $respuesta2[] = $row;
        }
    }
    $respuesta = [
        'uno' => $respuesta,
        'dos' => $respuesta2
    ];
    //realizamos una consulta a Inscripciones y desplegamos en el modal
} elseif ($control == 5) {
    $respuesta = [];
    $sql = "SELECT id_i, nombre_c, descripcion, nombre_u FROM inscripciones JOIN curso ON id_ic=id_c JOIN usuarios ON id_iu=id_u";
    $resultado = $mysqli->query($sql);
    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $respuesta[] = $row;
        }
    }
} elseif ($control == 6) {
    //realizamos una consulta a cursos
    $respuesta = [];
    $sql = "SELECT * FROM curso";
    $resultado = $mysqli->query($sql);
    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $respuesta[] = $row;
        }
    }
} elseif ($control == 7) {
     //realizamos una consulta a usuarios
    $respuesta = [];
    $sql = "SELECT * FROM usuarios";
    $resultado = $mysqli->query($sql);
    if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
            $respuesta[] = $row;
        }
    }
     //borramos una inscripcion
} elseif ($control == 8) {
    $respuesta = $datos['botonEE'];
    $respuesta2 = substr($respuesta, 1);
    $respuesta3 = substr($respuesta, 0, 1);
    if ($respuesta3 == 'D') {
        $sql = "DELETE FROM inscripciones WHERE id_i = '$respuesta2'";
        $resultado = $mysqli->query($sql);
        if ($resultado) {
            $respuesta = [
                'status' => 'Bien',
                'mensaje' => 'Se elimino corrctamente',
                'con' => '1'
            ];
        } else {
            $respuesta = [
                'status' => 'Error',
                'mensaje' => 'Algo salio mal'
            ];
        }
    } elseif ($respuesta3 == 'U') {
//actualizamos una inscripcion
        $respuesta = [];
        //mostramos los usuarios
        $sql = "SELECT * FROM usuarios";
        $resultado = $mysqli->query($sql);
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $respuesta[] = $row;
            }
        }

        $respuesta2 = [];
        //mostramos los curos
        $sql = "SELECT * FROM curso";
        $resultado = $mysqli->query($sql);
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $respuesta2[] = $row;
            }
        }


        $respuesta = [
            'con' => '2',
            'uno' => $respuesta,
            'dos' => $respuesta2

        ];
    }
} elseif ($control == 9) {
// actualizamos las inscripciones
    if ($datos['cursoI']  && $datos['alumnoI']) {
        $respuesta2 = $datos['cursoI'];
        $respuesta3 = $datos['alumnoI'];
        $respuesta4 = $datos['id_i'];
        $respuesta4 = substr($respuesta4, 1);
        $sql = "UPDATE inscripciones SET id_ic = '$respuesta2', id_iu = '$respuesta3' WHERE id_i = $respuesta4";
        $insertarI = $mysqli->query($sql);
        if ($insertarI) {
            $respuesta = [
                'status' => 'Bien',
                'mensaje' => 'Se Modifico corrctamente',
                'con' => '1'
            ];
        } else {
            $respuesta = [
                'status' => 'Error',
                'mensaje' => 'Algo salio mal'. $mysqli->error
            ];
        }

    }
}elseif ($control == 10) {
    //eliminamos un curso
    $respuesta = $datos['botonEE'];
    $respuesta2 = substr($respuesta, 1);
    $respuesta3 = substr($respuesta, 0, 1);
    if ($respuesta3 == 'D') {
        $sql = "DELETE FROM curso WHERE id_c = '$respuesta2'";
        $resultado = $mysqli->query($sql);
        if ($resultado) {
            $respuesta = [
                'status' => 'Bien',
                'mensaje' => 'Se elimino corrctamente',
                'con' => '1'
            ];
        } else {
            $respuesta = [
                'status' => 'Error',
                'mensaje' => 'Algo salio mal'
            ];
        }
    } elseif ($respuesta3 == 'U') {
        // mostramos el curso especifico
        $respuesta = [];
        $sql = "SELECT * FROM curso WHERE id_c = '$respuesta2'";
        $resultado = $mysqli->query($sql);
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $respuesta[] = $row;
            }
        }

        $respuesta = [
            'con' => '2',
            'uno' => $respuesta

        ];
    }
}elseif ($control == 11) {
// actualizamos un curso 
    if ($datos['nombrec']  && $datos['descripcion']) {
        $respuesta2 = $datos['nombrec'];
        $respuesta3 = $datos['descripcion'];
        $respuesta4 = $datos['id_c'];
        $respuesta4 = substr($respuesta4, 1);
        $sql = "UPDATE curso SET nombre_c = '$respuesta2', descripcion = '$respuesta3' WHERE id_c = $respuesta4";
        $insertarI = $mysqli->query($sql);
        if ($insertarI) {
            $respuesta = [
                'status' => 'Bien',
                'mensaje' => 'Se Modifico corrctamente',
                'con' => '1'
            ];
        } else {
            $respuesta = [
                'status' => 'Error',
                'mensaje' => 'Algo salio mal'. $mysqli->error
            ];
        }
       
    }
}elseif ($control == 12) {
    $respuesta = $datos['botonEE'];
    $respuesta2 = substr($respuesta, 1);
    $respuesta3 = substr($respuesta, 0, 1);
    if ($respuesta3 == 'D') {
        //eliminamos un uisuario
        $sql = "DELETE FROM usuarios WHERE id_u = '$respuesta2'";
        $resultado = $mysqli->query($sql);
        if ($resultado) {
            $respuesta = [
                'status' => 'Bien',
                'mensaje' => 'Se elimino corrctamente',
                'con' => '1'
            ];
        } else {
            $respuesta = [
                'status' => 'Error',
                'mensaje' => 'Algo salio mal'
            ];
        }
    } elseif ($respuesta3 == 'U') {
        $respuesta = [];
        //seleccionamos un usuarioo 
        $sql = "SELECT * FROM usuarios WHERE id_u = '$respuesta2'";
        $resultado = $mysqli->query($sql);
        if ($resultado->num_rows > 0) {
            while ($row = $resultado->fetch_assoc()) {
                $respuesta[] = $row;
            }
        }

        $respuesta = [
            'con' => '2',
            'uno' => $respuesta

        ];
    }
}elseif ($control == 13) {
// actualizamos un usuario
    if ($datos['nombreu']) {
        $respuesta2 = $datos['nombreu'];
        $respuesta3 = $datos['id_u'];
        $respuesta3 = substr($respuesta3, 1);
        $sql = "UPDATE usuarios SET nombre_u = '$respuesta2' WHERE id_u = $respuesta3";
        $insertarI = $mysqli->query($sql);
        if ($insertarI) {
            $respuesta = [
                'status' => 'Bien',
                'mensaje' => 'Se Modifico corrctamente',
                'con' => '1'
            ];
        } else {
            $respuesta = [
                'status' => 'Error',
                'mensaje' => 'Algo salio mal'. $mysqli->error
            ];
        }
       
    }
}

echo json_encode($respuesta);

    









/*Estas las ocuparemos despues 

$sql = "SELECT id_i, nombre_c, descripcion, nombre_u FROM inscripciones JOIN curso ON id_ic=id_c JOIN usuarios ON id_iu=id_u";
$resultado = $mysqli->query($sql);
if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "id: " . $fila["id_i"] . "<br>";
        echo "curso: " . $fila["nombre_c"] . "<br>";
        echo "Nombre: " . $fila["nombre_u"] . "<br>";
        echo "<br><br>";
    }
}
echo "---------------------------------------------------------------------------------------------------<br>";
$sql = "SELECT * FROM curso";
$resultado = $mysqli->query($sql);
if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "id: " . $fila["id_c"] . "<br>";
        echo "nombre: " . $fila["nombre_c"] . "<br>";
        echo "descripcion: " . $fila["descripcion"] . "<br>";
        echo "<br><br>";
    }
}

echo " --------------------------------------------------------------------------------------------------- <br>";
$sql = "SELECT * FROM usuarios";
$resultado = $mysqli->query($sql);
if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        echo "id: " . $fila["id_u"] . "<br>";
        echo "nombre: " . $fila["nombre_u"] . "<br>";
        echo "<br><br>";
    }
}
*/

//mysqli_close($mysqli);
