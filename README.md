# Sistema de Gestión de Espacios Coworking

Una aplicación web moderna para gestionar y mostrar espacios de coworking usando React, Vite y Firebase Firestore.

## 🚀 Características

- **React + Vite**: Desarrollo rápido con Hot Module Replacement
- **Firebase Firestore**: Base de datos en tiempo real
- **Diseño Responsivo**: Adaptable a móviles y escritorio
- **UI Moderna**: Tarjetas de espacios con colores personalizados
- **Gestión de Espacios**: CRUD completo para espacios de coworking

## 📋 Estructura de Datos

### Colección `espacios`

Cada espacio tiene la siguiente estructura:

```json
{
  "name": "Oficina Norte",
  "type": "oficina",
  "typeLabel": "Oficina privada",
  "desc": "Descripción del espacio",
  "available": true,
  "dim": "18 m²",
  "cap": "Hasta 4 personas",
  "orientation": "Frente norte",
  "light": "Luz natural",
  "features": ["WiFi dedicado", "Escritorios modulares", "Aire frío/calor"],
  "color": "#E8F0EE"
}
```

## 🛠️ Configuración del Proyecto

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- Cuenta de Firebase

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd OfficeWork-Proyecto
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   - Copia `.env.example` a `.env`
   - Completa tus credenciales de Firebase:
     ```bash
     cp .env.example .env
     ```
   - Edita `.env` con tus valores reales de Firebase

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

### Configuración de Firebase

1. **Crear Proyecto Firebase**
   - Ve a [Firebase Console](https://console.firebase.google.com/)
   - Crea un nuevo proyecto
   - Habilita Firestore Database
   - Configura las reglas de seguridad según necesites

2. **Obtener Credenciales**
   - En Project Settings > Your apps
   - Agrega una app web
   - Copia la configuración a tu archivo `.env`

3. **Estructura de Firestore**
   - Crea la colección `espacios`
   - Agrega documentos con la estructura especificada arriba

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/     # Componentes de React
│   ├── firebase/       # Configuración de Firebase
│   ├── services/       # Servicios de Firestore
│   ├── App.jsx         # Componente principal
│   ├── App.css         # Estilos principales
│   └── main.jsx        # Punto de entrada
├── public/             # Archivos estáticos
├── .env.example        # Plantilla de variables de entorno
└── package.json        # Dependencias del proyecto
```

## 🔧 Servicios Disponibles

### EspaciosService
- `getEspacios()`: Obtiene todos los espacios
- `getEspaciosByType(type)`: Filtra por tipo
- `getEspaciosDisponibles()`: Solo espacios disponibles
- `addEspacio(espacio)`: Agrega nuevo espacio
- `updateEspacio(id, espacio)`: Actualiza espacio existente
- `deleteEspacio(id)`: Elimina espacio

## 🎨 Personalización

### Colores y Estilos
- Cada espacio puede tener su propio color (`color` field)
- Los estilos están en `src/App.css`
- Diseño responsivo con grid layout

### Tipos de Espacios
- `oficina`: Oficinas privadas
- `sala_reuniones`: Salas de reuniones
- `desk`: Escritorios individuales
- `area_comun`: Áreas comunes

## 🚀 Despliegue

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios
4. Commit: `git commit -m 'Agregar nueva funcionalidad'`
5. Push: `git push origin feature/nueva-funcionalidad`
6. Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.
