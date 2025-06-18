<?php
class Client {
    private $conn;
    private $table_name = "clientes";

    public $id_cliente;
    public $nombre;
    public $apellido;
    public $email;
    public $id_usuario;

    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET nombre=:nombre, apellido=:apellido, email=:email, id_usuario=:id_usuario, tipo_cliente='persona'";
        
        $stmt = $this->conn->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->email = htmlspecialchars(strip_tags($this->email));

        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id_usuario", $this->id_usuario);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?> 