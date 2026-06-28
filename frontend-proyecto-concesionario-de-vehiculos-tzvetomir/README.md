# Frontend - Concesionario de Vehiculos

Aplicacion web desarrollada como proyecto final de bootcamp para la gestion y visualizacion de vehiculos en un concesionario.

Incluye:

- catalogo publico con filtros y ordenacion
- autenticacion (registro e inicio de sesion)
- panel admin con dashboard
- gestion de vehiculos asociados al usuario autenticado
- estilos responsive para movil, tablet, laptop y escritorio

## Tecnologias

- React 19
- Vite 8
- React Router DOM 7
- JavaScript (ES Modules)
- CSS
- ESLint

## Requisitos

- Node.js 20 o superior
- npm 10 o superior
- API backend disponible y accesible

## Variables de entorno

Crea un archivo `.env` en la raiz del proyecto con:

```env
VITE_API_URL=https://backend-proyecto-concesionario-de.onrender.com/api
```

Nota:

- La variable debe apuntar a la URL base del backend sin barra final adicional.

## Instalacion y ejecucion

```bash
npm install
npm run dev
```

La app se inicia por defecto en:

- http://localhost:5173

## Scripts disponibles

```bash
npm run dev      # entorno de desarrollo
npm run build    # build de produccion
npm run preview  # previsualizar build local
npm run lint     # analisis de lint
```

## Estructura principal

```text
src/
	components/        # UI reutilizable (header, footer, cards, filtros, formularios)
	context/           # estado global de autenticacion y persistencia local
	data/              # datos de apoyo
	hooks/             # hooks de logica (filtro/orden)
	layouts/           # layouts principal y admin
	pages/             # vistas publicas y admin
	routes/            # definicion de rutas
	services/          # cliente HTTP para auth y vehiculos
```

## Rutas

### Publicas

- `/` - Home
- `/catalogo` - Listado general de vehiculos
- `/catalogo/:id` - Detalle de vehiculo
- `*` - Not Found

### Autenticacion

- `/auth/login`
- `/auth/register`

### Admin

- `/admin` - Dashboard
- `/admin/vehiculos` - Garaje de usuario (vehiculos asociados a la cuenta)

## Autenticacion y sesion

La sesion se gestiona con contexto global:

- guarda `token` y `user` en localStorage
- expone `isAuthenticated`, `setAuthSession` y `logout`

El frontend envia `Authorization: Bearer <token>` en operaciones protegidas de vehiculos (crear, editar y eliminar).

## Modulo de vehiculos

### Catalogo

- consume datos desde API
- aplica filtros por categoria/combustible
- ordena por marca y por año
- usa lectura sin cache para reflejar altas/bajas recientes

### Garaje en admin

- muestra vehiculos asociados al usuario autenticado
- permite crear, editar y eliminar
- incluye confirmacion para borrado
- muestra mensajes de estado (exito/error)

### Permisos

- el comportamiento final depende del backend
- si la API requiere permisos admin y el usuario no los tiene, devolvera error de acceso denegado

## Dashboard admin

Incluye:

- saludo personalizado
- acceso rapido a gestion de vehiculos
- acceso rapido al catalogo publico

## Responsive

La interfaz esta ajustada para:

- escritorio grande
- laptop
- tablet
- movil

Se optimizaron especialmente:

- header y navegacion
- grillas de vehiculos
- formularios
- modales de admin
- footer

## Build y despliegue

Build local:

```bash
npm run build
```


## Autor

Proyecto final de Tzvetomir para Neoland Web Development.
