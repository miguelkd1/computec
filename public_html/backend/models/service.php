<?php
class Service {
    private $conn;
    private $table_name = "servicios";

    public $id_servicio;
    public $id_cliente;
    public $tipo_servicio;
    public $descripcion;
    public $fecha_ingreso;
    public $estado;
    public $tecnico;

    public function __construct($db) {
        $this->conn = $db;
    }

    function readByClient() {
        $query = "SELECT 
                    s.id_servicio, 
                    s.tipo_servicio, 
                    s.descripcion, 
                    s.fecha_ingreso, 
                    s.estado,
                    CONCAT(u.nombre, ' ', u.apellido) as tecnico
                  FROM " . $this->table_name . " s
                  JOIN usuarios u ON s.id_usuario = u.id_usuario
                  WHERE s.id_cliente = ?
                  ORDER BY s.fecha_ingreso DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id_cliente);
        $stmt->execute();
        return $stmt;
    }
}
?> 