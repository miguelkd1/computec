<?php
class User {
    private $conn;
    private $table_name = "usuarios";

    public $id_usuario;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $id_tipo_usuario;

    public function __construct($db) {
        $this->conn = $db;
    }

    function login() {
        $query = "SELECT 
                    u.id_usuario, u.nombre, u.apellido, u.email, u.password, 
                    tu.nombre_tipo, c.id_cliente
                  FROM " . $this->table_name . " u
                  JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
                  LEFT JOIN clientes c ON u.id_usuario = c.id_usuario
                  WHERE u.email = :email";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $this->email);
        $stmt->execute();
        return $stmt;
    }

    function read() {
        $query = "SELECT u.id_usuario, u.nombre, u.apellido, u.email, tu.nombre_tipo 
                  FROM " . $this->table_name . " u
                  JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id_tipo_usuario
                  ORDER BY u.nombre";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function register() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET nombre=:nombre, apellido=:apellido, email=:email, password=:password, id_tipo_usuario=:id_tipo_usuario";
        
        $stmt = $this->conn->prepare($query);

        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":id_tipo_usuario", $this->id_tipo_usuario);

        if ($stmt->execute()) {
            $this->id_usuario = $this->conn->lastInsertId();
            return true;
        }

        return false;
    }

    function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET nombre = :nombre,
                      apellido = :apellido,
                      email = :email";
        
        // Solo actualizar la contraseña si se proporciona
        if (!empty($this->password)) {
            $query .= ", password = :password";
        }
        
        // Solo actualizar el tipo de usuario si se proporciona
        if (!empty($this->id_tipo_usuario)) {
            $query .= ", id_tipo_usuario = :id_tipo_usuario";
        }
        
        $query .= " WHERE id_usuario = :id_usuario";
        
        $stmt = $this->conn->prepare($query);

        // Sanitizar datos
        $this->nombre = htmlspecialchars(strip_tags($this->nombre));
        $this->apellido = htmlspecialchars(strip_tags($this->apellido));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->id_usuario = htmlspecialchars(strip_tags($this->id_usuario));

        // Bind de parámetros
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":apellido", $this->apellido);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":id_usuario", $this->id_usuario);

        if (!empty($this->password)) {
            $this->password = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(":password", $this->password);
        }
        
        if (!empty($this->id_tipo_usuario)) {
            $this->id_tipo_usuario = htmlspecialchars(strip_tags($this->id_tipo_usuario));
            $stmt->bindParam(":id_tipo_usuario", $this->id_tipo_usuario);
        }

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id_usuario = ?";
        
        $stmt = $this->conn->prepare($query);
        
        $this->id_usuario = htmlspecialchars(strip_tags($this->id_usuario));
        
        $stmt->bindParam(1, $this->id_usuario);
        
        if ($stmt->execute()) {
            return true;
        }
        
        return false;
    }
}
?> 