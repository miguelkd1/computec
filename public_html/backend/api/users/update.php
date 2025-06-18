<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Manejar solicitud OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../../config/database.php';
include_once '../../models/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->id_usuario) &&
    !empty($data->nombre) &&
    !empty($data->apellido) &&
    !empty($data->email)
) {
    $user->id_usuario = $data->id_usuario;
    $user->nombre = $data->nombre;
    $user->apellido = $data->apellido;
    $user->email = $data->email;
    
    // La contraseña es opcional en actualización
    if (!empty($data->password)) {
        $user->password = $data->password;
    }
    
    if (!empty($data->id_tipo_usuario)) {
        $user->id_tipo_usuario = $data->id_tipo_usuario;
    }

    if ($user->update()) {
        http_response_code(200);
        echo json_encode(array("message" => "Usuario actualizado exitosamente."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "No se pudo actualizar el usuario."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "No se puede actualizar el usuario. Datos incompletos."));
}
?> 