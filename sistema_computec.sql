-- =====================================================
-- SISTEMA DE GESTIÓN COMPUTEC - BASE DE DATOS MYSQL
-- =====================================================
-- Creado para: Sistema integral de gestión
-- Incluye: Usuarios, Clientes, Productos, Servicios, Ventas, etc.
-- =====================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_computec;
USE sistema_computec;

-- Configurar el charset
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- TABLA: TIPO_USUARIO
-- Descripción: Tipos de usuarios del sistema
-- =====================================================
CREATE TABLE tipo_usuario (
    id_tipo_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    permisos JSON,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: USUARIOS
-- Descripción: Usuarios del sistema
-- =====================================================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    id_tipo_usuario INT NOT NULL,
    ultimo_acceso TIMESTAMP NULL,
    intentos_fallidos INT DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario),
    INDEX idx_email (email),
    INDEX idx_activo (activo),
    INDEX idx_tipo_usuario (id_tipo_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: MODULOS
-- Descripción: Módulos del sistema
-- =====================================================
CREATE TABLE modulos (
    id_modulo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_modulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    url VARCHAR(200),
    icono VARCHAR(50),
    orden INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_activo (activo),
    INDEX idx_orden (orden)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: ASIGNACION_MODULO
-- Descripción: Asignación de módulos a usuarios
-- =====================================================
CREATE TABLE asignacion_modulo (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_modulo INT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_modulo) REFERENCES modulos(id_modulo) ON DELETE CASCADE,
    UNIQUE KEY unique_usuario_modulo (id_usuario, id_modulo),
    INDEX idx_usuario (id_usuario),
    INDEX idx_modulo (id_modulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: PROVEEDORES
-- Descripción: Proveedores de productos
-- =====================================================
CREATE TABLE proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_empresa VARCHAR(200) NOT NULL,
    contacto VARCHAR(150),
    telefono VARCHAR(20),
    email VARCHAR(150),
    direccion TEXT,
    categoria VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_nombre_empresa (nombre_empresa),
    INDEX idx_activo (activo),
    INDEX idx_categoria (categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: CLIENTES
-- Descripción: Clientes del sistema
-- =====================================================
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    documento VARCHAR(20) UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(150),
    direccion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_cliente ENUM('persona', 'empresa') DEFAULT 'persona',
    id_usuario INT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_documento (documento),
    INDEX idx_nombre_apellido (nombre, apellido),
    INDEX idx_tipo_cliente (tipo_cliente),
    INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: PRODUCTOS
-- Descripción: Productos disponibles
-- =====================================================
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    precio_compra DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    precio_venta DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock_minimo INT DEFAULT 0,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_proveedor INT,
    activo BOOLEAN DEFAULT TRUE,
    codigo_barras VARCHAR(50),
    imagen VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_proveedor) REFERENCES proveedores(id_proveedor),
    INDEX idx_nombre (nombre),
    INDEX idx_categoria (categoria),
    INDEX idx_activo (activo),
    INDEX idx_codigo_barras (codigo_barras)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: INVENTARIO
-- Descripción: Control de inventario de productos
-- =====================================================
CREATE TABLE inventario (
    id_inventario INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    stock_actual INT NOT NULL DEFAULT 0,
    stock_disponible INT NOT NULL DEFAULT 0,
    stock_reservado INT NOT NULL DEFAULT 0,
    ubicacion VARCHAR(100),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    movimiento VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    UNIQUE KEY unique_producto (id_producto),
    INDEX idx_stock_actual (stock_actual),
    INDEX idx_ubicacion (ubicacion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: SERVICIOS
-- Descripción: Servicios técnicos prestados
-- =====================================================
CREATE TABLE servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_servicio VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega TIMESTAMP NULL,
    estado ENUM('recibido', 'en_proceso', 'esperando_repuestos', 'terminado', 'entregado', 'cancelado') DEFAULT 'recibido',
    costo DECIMAL(10,2) DEFAULT 0.00,
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_estado (estado),
    INDEX idx_fecha_ingreso (fecha_ingreso),
    INDEX idx_cliente (id_cliente),
    INDEX idx_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: VENTAS
-- Descripción: Registro de ventas
-- =====================================================
CREATE TABLE ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_usuario INT NOT NULL,
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    impuestos DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia', 'credito') NOT NULL,
    estado ENUM('pendiente', 'pagado', 'cancelado', 'devuelto') DEFAULT 'pendiente',
    numero_factura VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_fecha_venta (fecha_venta),
    INDEX idx_estado (estado),
    INDEX idx_metodo_pago (metodo_pago),
    INDEX idx_numero_factura (numero_factura)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: DETALLE_VENTA
-- Descripción: Detalle de productos vendidos
-- =====================================================
CREATE TABLE detalle_venta (
    id_detalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    INDEX idx_venta (id_venta),
    INDEX idx_producto (id_producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: CITAS
-- Descripción: Citas programadas con clientes
-- =====================================================
CREATE TABLE citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_cita DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    tipo_cita VARCHAR(100),
    descripcion TEXT,
    estado ENUM('programada', 'confirmada', 'en_curso', 'completada', 'cancelada', 'no_asistio') DEFAULT 'programada',
    recordatorio BOOLEAN DEFAULT FALSE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_fecha_cita (fecha_cita),
    INDEX idx_estado (estado),
    INDEX idx_cliente (id_cliente),
    INDEX idx_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: GARANTIAS
-- Descripción: Garantías de servicios y ventas
-- =====================================================
CREATE TABLE garantias (
    id_garantia INT AUTO_INCREMENT PRIMARY KEY,
    id_servicio INT NULL,
    id_venta INT NULL,
    tipo_garantia VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    descripcion TEXT,
    estado ENUM('vigente', 'vencida', 'utilizada', 'cancelada') DEFAULT 'vigente',
    observaciones TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio),
    FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
    INDEX idx_estado (estado),
    INDEX idx_fecha_vencimiento (fecha_vencimiento),
    INDEX idx_servicio (id_servicio),
    INDEX idx_venta (id_venta),
    CHECK (id_servicio IS NOT NULL OR id_venta IS NOT NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: REPORTES
-- Descripción: Reportes generados del sistema
-- =====================================================
CREATE TABLE reportes (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_reporte VARCHAR(100) NOT NULL,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    periodo_inicio DATE,
    periodo_fin DATE,
    parametros JSON,
    archivo VARCHAR(255),
    estado ENUM('generando', 'completado', 'error') DEFAULT 'generando',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_tipo_reporte (tipo_reporte),
    INDEX idx_fecha_generacion (fecha_generacion),
    INDEX idx_estado (estado),
    INDEX idx_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLA: MOVIMIENTOS_INV
-- Descripción: Movimientos de inventario
-- =====================================================
CREATE TABLE movimientos_inv (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_movimiento ENUM('entrada', 'salida', 'ajuste', 'transferencia') NOT NULL,
    cantidad INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    motivo VARCHAR(200),
    referencia VARCHAR(100),
    stock_anterior INT,
    stock_nuevo INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    INDEX idx_producto (id_producto),
    INDEX idx_fecha (fecha),
    INDEX idx_tipo_movimiento (tipo_movimiento),
    INDEX idx_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Insertar tipos de usuario básicos
INSERT INTO tipo_usuario (nombre_tipo, descripcion, permisos) VALUES
('Administrador', 'Acceso completo al sistema', '{"all": true}'),
('Vendedor', 'Acceso a ventas y clientes', '{"ventas": true, "clientes": true}'),
('Técnico', 'Acceso a servicios y reparaciones', '{"servicios": true, "inventario": "read"}'),
('Supervisor', 'Acceso de supervisión', '{"reportes": true, "usuarios": "read"}'),
('Asistente Administrativo', 'Acceso a citas y documentos', '{"citas": true, "documentos": "read"}'),
('Cliente', 'Acceso a su portal de cliente', '{"portal_cliente": true}');

-- Insertar módulos del sistema
INSERT INTO modulos (nombre_modulo, descripcion, url, icono, orden) VALUES
('Dashboard', 'Panel principal del sistema', '/dashboard', 'dashboard', 1),
('Usuarios', 'Gestión de usuarios', '/usuarios', 'users', 2),
('Clientes', 'Gestión de clientes', '/clientes', 'user-group', 3),
('Productos', 'Gestión de productos', '/productos', 'package', 4),
('Servicios', 'Gestión de servicios técnicos', '/servicios', 'tools', 5),
('Ventas', 'Gestión de ventas', '/ventas', 'shopping-cart', 6),
('Inventario', 'Control de inventario', '/inventario', 'warehouse', 7),
('Citas', 'Programación de citas', '/citas', 'calendar', 8),
('Reportes', 'Generación de reportes', '/reportes', 'chart-bar', 9),
('Configuración', 'Configuración del sistema', '/configuracion', 'settings', 10);

-- Usuario administrador por defecto (password: admin123)
INSERT INTO usuarios (nombre, apellido, email, password, id_tipo_usuario) VALUES
('Admin', 'Sistema', 'admin@computec.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1);

-- Activar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- TRIGGERS PARA AUDITORÍA
-- =====================================================

-- Trigger para actualizar inventario después de venta
DELIMITER //
CREATE TRIGGER tr_actualizar_inventario_venta
    AFTER INSERT ON detalle_venta
    FOR EACH ROW
BEGIN
    UPDATE inventario 
    SET stock_actual = stock_actual - NEW.cantidad,
        stock_disponible = stock_disponible - NEW.cantidad
    WHERE id_producto = NEW.id_producto;
    
    -- Registrar movimiento
    INSERT INTO movimientos_inv (id_producto, id_usuario, tipo_movimiento, cantidad, motivo, referencia)
    SELECT NEW.id_producto, v.id_usuario, 'salida', NEW.cantidad, 'Venta', CONCAT('Venta #', NEW.id_venta)
    FROM ventas v WHERE v.id_venta = NEW.id_venta;
END//
DELIMITER ;

-- =====================================================
-- VISTAS ÚTILES
-- =====================================================

-- Vista de productos con stock bajo
CREATE VIEW v_productos_stock_bajo AS
SELECT 
    p.id_producto,
    p.nombre,
    p.categoria,
    i.stock_actual,
    p.stock_minimo,
    pr.nombre_empresa as proveedor
FROM productos p
LEFT JOIN inventario i ON p.id_producto = i.id_producto
LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
WHERE i.stock_actual <= p.stock_minimo AND p.activo = TRUE;

-- Vista de ventas del día
CREATE VIEW v_ventas_hoy AS
SELECT 
    v.id_venta,
    v.numero_factura,
    CONCAT(c.nombre, ' ', c.apellido) as cliente,
    CONCAT(u.nombre, ' ', u.apellido) as vendedor,
    v.total,
    v.metodo_pago,
    v.estado,
    v.fecha_venta
FROM ventas v
LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
WHERE DATE(v.fecha_venta) = CURDATE();

-- Vista de servicios pendientes
CREATE VIEW v_servicios_pendientes AS
SELECT 
    s.id_servicio,
    CONCAT(c.nombre, ' ', c.apellido) as cliente,
    s.tipo_servicio,
    s.descripcion,
    s.fecha_ingreso,
    s.estado,
    CONCAT(u.nombre, ' ', u.apellido) as tecnico
FROM servicios s
JOIN clientes c ON s.id_cliente = c.id_cliente
JOIN usuarios u ON s.id_usuario = u.id_usuario
WHERE s.estado IN ('recibido', 'en_proceso', 'esperando_repuestos');

-- =====================================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_ventas_fecha_estado ON ventas(fecha_venta, estado);
CREATE INDEX idx_servicios_estado_fecha ON servicios(estado, fecha_ingreso);
CREATE INDEX idx_clientes_nombre_completo ON clientes(nombre, apellido);
CREATE INDEX idx_productos_categoria_activo ON productos(categoria, activo);

COMMIT;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
-- Base de datos creada exitosamente
-- Total de tablas: 15
-- Incluye: Triggers, Vistas, Índices y datos iniciales
-- ===================================================== 