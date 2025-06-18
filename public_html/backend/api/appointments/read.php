<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../models/appointment.php';

$database = new Database();
$db = $database->getConnection();

$appointment = new Appointment($db);

$stmt = $appointment->read();
$num = $stmt->rowCount();

if ($num > 0) {
    $appointments_arr = array();
    $appointments_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $appointment_item = array(
            "id_cita" => $id_cita,
            "fecha_cita" => $fecha_cita,
            "hora_inicio" => $hora_inicio,
            "tipo_cita" => $tipo_cita,
            "estado" => $estado,
            "cliente" => $cliente,
            "tecnico" => $tecnico
        );
        array_push($appointments_arr["records"], $appointment_item);
    }

    http_response_code(200);
    echo json_encode($appointments_arr);
} else {
    http_response_code(404);
    echo json_encode(
        array("message" => "No se encontraron citas.")
    );
}
?> 