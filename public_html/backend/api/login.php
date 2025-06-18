<?php
include_once '../config/database.php';
include_once '../models/user.php';

header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password)) {
    $user->email = $data->email;
    
    $stmt = $user->login();
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (password_verify($data->password, $row['password'])) {
            http_response_code(200);
            echo json_encode([
                "message" => "Login exitoso.",
                "user" => [
                    "id" => $row['id_usuario'],
                    "id_cliente" => $row['id_cliente'],
                    "nombre" => $row['nombre'],
                    "apellido" => $row['apellido'],
                    "email" => $row['email'],
                    "rol" => $row['nombre_tipo']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Credenciales incorrectas."]);
        }
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Usuario no encontrado."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Datos incompletos."]);
}
?> 