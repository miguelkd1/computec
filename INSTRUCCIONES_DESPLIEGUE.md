# Instrucciones para Desplegar React con XAMPP

## Requisitos Previos
- XAMPP instalado y funcionando
- Node.js instalado
- El proyecto en `C:\xampp\htdocs\proyectoTecnica`

## Método 1: Desarrollo (Recomendado para trabajar)

### 1. Iniciar XAMPP
- Abre el panel de control de XAMPP
- Inicia **Apache** y **MySQL**
- Verifica que ambos estén en verde

### 2. Iniciar el Backend PHP
- El backend ya está accesible en: `http://localhost/proyectoTecnica/public_html/backend/`
- No necesitas hacer nada más, Apache ya sirve los archivos PHP

### 3. Iniciar React en modo desarrollo
```bash
# Abre una terminal (PowerShell o CMD)
cd C:\xampp\htdocs\proyectoTecnica\public_html\frontend
npm install  # Solo la primera vez
npm run dev
```
- React se abrirá en `http://localhost:5173`
- Los cambios se actualizan automáticamente

### 4. Acceder a la aplicación
- Frontend React: `http://localhost:5173`
- Backend PHP: `http://localhost/proyectoTecnica/public_html/backend/`

## Método 2: Producción (Para desplegar final)

### 1. Compilar React
```bash
cd C:\xampp\htdocs\proyectoTecnica\public_html\frontend
npm run build
```
Esto creará una carpeta `dist` con los archivos optimizados.

### 2. Mover archivos compilados
Copia el contenido de la carpeta `dist` a:
`C:\xampp\htdocs\proyectoTecnica\public_html\frontend\dist\`

### 3. Crear archivo .htaccess
En `C:\xampp\htdocs\proyectoTecnica\public_html\frontend\dist\` crea un archivo `.htaccess`:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /proyectoTecnica/public_html/frontend/dist/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /proyectoTecnica/public_html/frontend/dist/index.html [L]
</IfModule>
```

### 4. Actualizar las URLs en el código
Antes de compilar, cambia las URLs en los archivos de React:
```javascript
// De:
'http://localhost/proyectoTecnica/public_html/backend/api/...'
// A:
'/proyectoTecnica/public_html/backend/api/...'
```

### 5. Acceder a la aplicación en producción
`http://localhost/proyectoTecnica/public_html/frontend/dist/`

## Configuración de la Base de Datos

### 1. Importar la base de datos
- Abre phpMyAdmin: `http://localhost/phpmyadmin`
- Crea una base de datos llamada `sistema_computec`
- Importa el archivo `sistema_computec.sql`

### 2. Verificar credenciales
En `public_html/backend/config/database.php`:
```php
private $host = "localhost";
private $db_name = "sistema_computec";
private $username = "root";
private $password = "";  // Vacío por defecto en XAMPP
```

## Solución de Problemas Comunes

### Error de CORS
Si tienes errores de CORS, asegúrate de que todos los archivos PHP tengan:
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
```

### Error 404 en las APIs
Verifica que las URLs coincidan con la estructura de carpetas:
- La API está en: `/proyectoTecnica/public_html/backend/api/`
- No olvides incluir `/proyectoTecnica/` en la ruta

### Puerto ocupado
Si el puerto 5173 está ocupado, React usará otro. Revisa la terminal para ver qué puerto está usando.

## Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build

# Ver la compilación localmente
npm run preview
```

## Estructura del Proyecto
```
C:\xampp\htdocs\proyectoTecnica\
├── public_html/
│   ├── backend/          # PHP APIs
│   │   ├── api/
│   │   ├── config/
│   │   └── models/
│   └── frontend/         # React App
│       ├── src/
│       ├── dist/         # Archivos compilados (producción)
│       └── package.json
└── sistema_computec.sql  # Base de datos
``` 