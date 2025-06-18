<?php
include_once '../config/database.php';
include_once '../models/user.php';
include_once '../models/client.php';

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$client = new Client($db);

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->nombre) &&
    !empty($data->apellido) &&
    !empty($data->email) &&
    !empty($data->password)
) {
    $user->nombre = $data->nombre;
    $user->apellido = $data->apellido;
    $user->email = $data->email;
    $user->password = $data->password;
    $user->id_tipo_usuario = 6; // ID para 'Cliente'

    if($user->register()) {
        $client->nombre = $data->nombre;
        $client->apellido = $data->apellido;
        $client->email = $data->email;
        $client->id_usuario = $user->id_usuario;

        if ($client->create()) {
            http_response_code(201);
            echo json_encode(["message" => "Cliente registrado exitosamente."]);
        } else {
            http_response_code(503);
            // Consider deleting the created user if client creation fails
            echo json_encode(["message" => "No se pudo crear el cliente."]);
        }
    } else {
        http_response_code(503);
        echo json_encode(["message" => "No se pudo registrar el usuario. El email ya puede estar en uso."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Datos incompletos."]);
}
?> 