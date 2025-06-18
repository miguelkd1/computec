<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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
    !empty($data->nombre) &&
    !empty($data->apellido) &&
    !empty($data->email) &&
    !empty($data->password) &&
    !empty($data->id_tipo_usuario)
) {
    $user->nombre = $data->nombre;
    $user->apellido = $data->apellido;
    $user->email = $data->email;
    $user->password = $data->password;
    $user->id_tipo_usuario = $data->id_tipo_usuario;

    if ($user->register()) {
        http_response_code(201);
        echo json_encode(array("message" => "Usuario creado exitosamente."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "No se pudo crear el usuario."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "No se puede crear el usuario. Datos incompletos."));
}
?> 