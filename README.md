# 🏢 OfficeWork - Sistema de Gestión de Espacios Coworking

Una aplicación web moderna, interactiva y premium para la gestión y visualización de espacios de coworking, enfocada en la simplicidad, un diseño visual cautivador y una experiencia de usuario fluida.

[![React](https://img.shields.io/badge/React-19.2-20232a.svg?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff.svg?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.1-ffca28.svg?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

🔗 **Web Online:** [https://officeworkweb.netlify.app/](https://officeworkweb.netlify.app/)

---

## 🚀 Descripción del Proyecto

**OfficeWork Web** es una plataforma dinámica diseñada para facilitar la exploración y administración de espacios de coworking ubicados en casas reformadas del centro de la ciudad. Permite a los usuarios encontrar el lugar ideal para trabajar según la localización y tipo de espacio, mientras que proporciona a los administradores herramientas robustas en tiempo real para gestionar la oferta, horarios y disponibilidad diaria.

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
