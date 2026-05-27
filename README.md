# 🏢 OfficeWork - Sistema de Gestión de Espacios Coworking

Una aplicación web moderna, interactiva y premium para la gestión y visualización de espacios de coworking, enfocada en la simplicidad, un diseño visual cautivador y una experiencia de usuario fluida.

[![React](https://img.shields.io/badge/React-19.2-20232a.svg?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff.svg?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.1-ffca28.svg?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

🔗 **Demo Online:** [https://officeworkweb.netlify.app/](https://officeworkweb.netlify.app/)

---

## 🚀 Descripción del Proyecto

**OfficeWork** es una plataforma dinámica diseñada para facilitar la exploración y administración de espacios de coworking ubicados en casas reformadas del centro de la ciudad. Permite a los usuarios encontrar el lugar ideal para trabajar según la localización (casas) y tipo de espacio, mientras que proporciona a los administradores herramientas robustas en tiempo real para gestionar la oferta, horarios y disponibilidad diaria.

---

## ✨ Funcionalidades Principales

### 🔍 Experiencia de Usuario e Interacción (Frontend)
- **Filtro Avanzado por Casas:** Descubre espacios segmentados por las distintas locaciones disponibles: **Fleming**, **Iturraspe**, **España** y **Colón**.
- **Filtro por Tipo y Estado:** Filtra dinámicamente por oficinas privadas, salas de reuniones, salas de eventos o consulta únicamente los espacios disponibles.
- **Calendario de Disponibilidad en Tiempo Real:** Modal interactivo para clientes que muestra con precisión qué días del mes actual o posterior están libres (en verde) u ocupados (en rojo).
- **Indicadores de Turnos/Horarios:** Información visual clara sobre la disponibilidad horaria del espacio por turnos (*Mañana*, *Mediodía*, *Tarde*).
- **Diseño Premium y Responsivo:** Interfaz moderna y estilizada con Tailwind CSS que ofrece una excelente experiencia visual tanto en dispositivos móviles como en pantallas de escritorio, enriquecida con micro-animaciones y efectos de hover suaves.

### 🛡️ Panel de Administración (Gestión y Control)
- **Autenticación Segura:** Acceso restringido al panel de gestión mediante Firebase Authentication.
- **CRUD Completo de Espacios:** Permite crear, editar y eliminar oficinas o salas en tiempo real con persistencia en Firebase Firestore.
- **Asignación de Locación:** Selector directo de la dirección física (casa) para cada espacio.
- **Gestión Horaria:** Selección de turnos de disponibilidad horaria mediante casillas de verificación.
- **Calendario Interactivo de Ocupación:** Calendario interactivo integrado en el formulario de administración que permite al gestor marcar o desmarcar fechas específicas como ocupadas con un solo clic.

---

## 🛠️ Tecnologías y Arquitectura

- **Core & Runtime:** React 19 (Hooks, Context API para estado global de autenticación) y Vite.
- **Estilos y UI:** Tailwind CSS (diseño responsivo, sombras personalizadas, transiciones fluidas) y PostCSS.
- **Base de Datos & Backend:** Firebase Firestore (Base de datos NoSQL en tiempo real).
- **Seguridad y Reglas:** Reglas de seguridad personalizadas en Firestore para permitir lectura pública y limitar la escritura únicamente al administrador autenticado.
- **Enrutamiento:** React Router v7 para la navegación segura entre la página de inicio, login y el panel administrador.

---

## 📊 Estructura de Datos (Firestore)

Cada documento de la colección `espacios` se define con la siguiente estructura:

```json
{
  "name": "Oficina Norte Premium",
  "type": "oficina",
  "typeLabel": "Oficina privada",
  "direccion": "Fleming",
  "desc": "Espacio luminoso con mobiliario de alta gama y capacidad adaptable.",
  "available": true,
  "dim": "18 m²",
  "cap": "Hasta 4 personas",
  "orientation": "Frente norte",
  "light": "Luz natural",
  "features": ["WiFi dedicado", "Escritorios modulares", "Aire frío/calor"],
  "color": "#E8F0EE",
  "horarios": ["mañana", "tarde"],
  "occupiedDates": ["2026-05-28", "2026-05-29"]
}
```

---

## 📁 Estructura del Proyecto

```
OfficeWork-Proyecto/
├── src/
│   ├── components/       # Componentes reutilizables (Calendar, Route Guards)
│   ├── context/          # Contexto de Autenticación de Firebase
│   ├── firebase/         # Archivos de configuración de Firebase SDK
│   ├── pages/            # Vistas principales (Administrador, Login, Registro)
│   ├── services/         # Consultas y mutaciones a Firebase Firestore
│   ├── App.jsx           # Componente principal con enrutador y HomePage
│   ├── index.css         # Directivas globales de Tailwind CSS
│   └── main.jsx          # Punto de entrada de la aplicación
├── public/               # Recursos estáticos públicos
├── firestore.rules       # Reglas de seguridad para Firestore
├── tailwind.config.js    # Configuración de diseño y colores de Tailwind
└── package.json          # Dependencias y scripts del proyecto
```

---

## 🔧 Configuración del Entorno Local

Sigue estos pasos para ejecutar la aplicación en tu entorno de desarrollo local:

### 1. Prerrequisitos
- Node.js (v16.0.0 o superior)
- npm o yarn

### 2. Clonar el repositorio
```bash
git clone https://github.com/FranMonzoni/OfficeWork-Proyecto.git
cd OfficeWork-Proyecto
```

### 3. Instalar Dependencias
```bash
npm install
```

### 4. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto (puedes tomar como base `.env.example`) y completa las credenciales de tu proyecto Firebase:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

### 5. Iniciar el Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible por defecto en `http://localhost:5173`.

---

## 🤝 Contribución

1. Haz un **Fork** del repositorio.
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza tus cambios y haz un commit descriptivo: `git commit -m 'feat: agregar nueva funcionalidad'`.
4. Sube la rama a tu repositorio: `git push origin feature/nueva-funcionalidad`.
5. Abre un **Pull Request** detallando tus modificaciones.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
