<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../models/service.php';

$database = new Database();
$db = $database->getConnection();

$service = new Service($db);

// Obtener el id_cliente de la URL
$service->id_cliente = isset($_GET['client_id']) ? $_GET['client_id'] : die();

$stmt = $service->readByClient();
$num = $stmt->rowCount();

if ($num > 0) {
    $services_arr = array();
    $services_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $service_item = array(
            "id_servicio" => $id_servicio,
            "tipo_servicio" => $tipo_servicio,
            "descripcion" => $descripcion,
            "fecha_ingreso" => $fecha_ingreso,
            "estado" => $estado,
            "tecnico" => $tecnico
        );
        array_push($services_arr["records"], $service_item);
    }

    http_response_code(200);
    echo json_encode($services_arr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No se encontraron servicios para este cliente.")
    );
}
?> 