<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
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

if (!empty($data->id_usuario)) {
    $user->id_usuario = $data->id_usuario;

    if ($user->delete()) {
        http_response_code(200);
        echo json_encode(array("message" => "Usuario eliminado exitosamente."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "No se pudo eliminar el usuario."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "No se puede eliminar el usuario. ID no proporcionado."));
}
?> 