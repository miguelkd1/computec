<?php
class Appointment {
    private $conn;
    private $table_name = "citas";

    public $id_cita;
    public $id_cliente;
    public $id_usuario;
    public $fecha_cita;
    public $hora_inicio;
    public $hora_fin;
    public $tipo_cita;
    public $descripcion;
    public $estado;

    public function __construct($db) {
        $this->conn = $db;
    }

    function read() {
        $query = "SELECT 
                    c.id_cita,
                    c.fecha_cita,
                    c.hora_inicio,
                    c.tipo_cita,
                    c.estado,
                    CONCAT(cl.nombre, ' ', cl.apellido) as cliente,
                    CONCAT(u.nombre, ' ', u.apellido) as tecnico
                  FROM " . $this->table_name . " c
                  JOIN clientes cl ON c.id_cliente = cl.id_cliente
                  JOIN usuarios u ON c.id_usuario = u.id_usuario
                  ORDER BY c.fecha_cita DESC, c.hora_inicio DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?> 