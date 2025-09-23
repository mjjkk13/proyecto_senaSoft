# 📚 Plataforma de Cursos Online con Dashboard de Administración

![Laravel](https://img.shields.io/badge/Laravel-v12-red?style=flat&logo=laravel)  
![React](https://img.shields.io/badge/React-v18-blue?style=flat&logo=react)  
![Docker](https://img.shields.io/badge/Docker-ready-blue?style=flat&logo=docker)  
![License](https://img.shields.io/badge/License-MIT-green?style=flat)  
![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow?style=flat)

Proyecto de preparación para la competencia de desarrollo **Senasoft**.  
La aplicación simula una plataforma educativa de streaming tipo **Netflix**, desarrollada con **Laravel (backend)** y **React (frontend)**, con dashboard administrativo, control de rutas y despliegue con Docker.

---

## 📋 Tabla de contenidos
- [Descripción General](#-descripción-general)
- [Funcionalidades](#%EF%B8%8F-funcionalidades)
- [Tecnologías](#%EF%B8%8F-tecnologías-utilizadas)
- [Estructura del Proyecto](#%F0%9F%93%82-estructura-del-proyecto)
- [Ejecución del Proyecto](#%E2%96%B6%EF%B8%8F-ejecución-del-proyecto)
  - [Requisitos previos](#-requisitos-previos)
  - [Pasos (con Docker)](#-pasos-con-docker)
  - [Pasos (sin Docker / local)](#-pasos-sin-docker--local)
- [Pruebas](#%F0%9F%90%8A-pruebas)
- [Preview](#%F0%9F%93%B8-preview)
- [Estado del Proyecto](#%F0%9F%93%8C-estado-del-proyecto)
- [Contribución](#%EF%B8%8F-contribución)
- [Autor](#%F0%91%89%F0%9F%92%8B-autor)
- [Licencia](#%F0%9F%93%9A-licencia)

---

## 🚀 Descripción General

Plataforma web full-stack para cursos online con:
- Catálogo tipo streaming con carruseles dinámicos.
- Vista de detalle de curso y lecciones.
- Roles de usuario: **estudiante** y **administrador**.
- Control estricto de rutas y permisos.
- Dashboard administrativo con reportes y gráficas interactivas.
- Pruebas, documentación y despliegue mediante Docker.

---

## 🛠️ Funcionalidades

- Catálogo con carruseles dinámicos y filtros.
- Páginas de detalle por curso, con lista de lecciones y progreso.
- Autenticación y autorización por roles.
- Dashboard admin: métricas, gráficos interactivos y gestión CRUD de cursos/usuarios.
- API RESTful en Laravel; frontend SPA en React.
- Pruebas automatizadas (PHPUnit / Jest).
- Contenedorizado con Docker para desarrollo y despliegue.

---

## 🧩 Tecnologías utilizadas

**Frontend**
- React (V18)
- TailwindCSS / ShadCN UI / Daisyui

**Backend**
- Laravel 12V (PHP 8.1+)
- MySQL o PostgreSQL

**Dev / Ops**
- Docker & Docker Compose
- PHPUnit (backend), Jest (frontend)

---

## 📂 Estructura del Proyecto

```plaintext
/EduStream   -> React (interfaz principal y dashboard) y Laravel (API REST y lógica de negocio)
```

---

## ▶️ Ejecución del Proyecto

### 🔧 Requisitos previos

- Git
- Node.js v18+
- npm o pnpm
- PHP 8.1+ y Composer (si vas a correr Laravel localmente)
- Docker & Docker Compose (recomendado)
- Base de datos: MySQL o PostgreSQL (si no usas Docker)

---


1. Clonar el repositorio:
   ```bash
   git clone https://github.com/mjjkk13/proyecto_senaSoft.git
   cd EduStream
   ```
2. Descargar dependencias y activar el APP KEY:
   ```bash
   npm install
   composer install
   php artisan key:generate
   ```
3. Copiar ejemplos de variables de entorno (si aplica):
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
4. Crear enlace simbólico para public (render de img)
```bash
php artisan storage:link
```

<!--4. Levantar todo con Docker Compose:
   ```bash
   docker-compose up --build -d
   ```
5. Ejecutar migraciones y seeders (desde el contenedor del backend):
   ```bash
   docker-compose exec backend php artisan key:generate
   docker-compose exec backend php artisan migrate --seed
   ```
6. Acceder:
   - Frontend: `http://localhost:3000`
   - Backend (API): `http://localhost:8000`
   - Base de datos (ej. MySQL): puerto según `docker-compose.yml` (p. ej. 3306)

---
-->
### 🖥️ Pasos (sin Docker — ejecución local)
#### Laravel y React con Inersia.js
```bash

cd EduStream
composer install
npm install
cp .env.example .env
# configurar .env (DB, APP_URL, etc.)
php artisan key:generate
php artisan migrate --seed
composer run dev # modo desarrollo
```
<!--
#### Frontend (React)
```bash
cd frontend
npm install
# si usas .env ajustar variables (API_URL, etc.)
npm run dev      # modo desarrollo (Vite / Create React App depende del stack)
# o
npm run build    # para producción
```

> Nota: Ajusta los comandos `npm run dev` / `npm run build` según la configuración específica de tu proyecto.

---

## 🧪 Pruebas

### Backend (Laravel / PHPUnit)
```bash
# con Docker
docker-compose exec backend php artisan test

# local
cd backend
composer install
php artisan test
# o
vendor/bin/phpunit
```

//### Frontend (Jest / Testing Library)
```bash
cd frontend
npm install
npm test
# o
npm run test:watch
```

> Añade pruebas E2E (Cypress / Playwright) si decides incorporarlas más adelante.

---

//## 📸 Preview

A continuación tienes un bloque con **placeholder** para imágenes y un diagrama de arquitectura en Mermaid.  
Sustituye `docs/preview.png` por tus capturas o mockups cuando las tengas.

```markdown
![Preview de la plataforma](docs/preview.png)
```
-->
<!--
```mermaid
flowchart LR
  A[Usuario (Web)] |Navega| F(Frontend - React)
  F |Consume API| B[Backend - Laravel]
  B  C[(Base de Datos - MySQL/Postgres)]
  B  D[Servicios: Auth, Storage, Jobs]
  F  E[Dashboard Admin]
  subgraph Docker
    F
    B
    C
  end
  -->
```

---

## 📌 Estado del Proyecto

```
🔹 Estado: En desarrollo
🔹 Roadmap corto:
  - [x] Estructura del repo y scaffolding
  - [x] Autenticación y roles
  - [ ] Catálogo y carruseles dinámicos
  - [ ] Dashboard con gráficas interactivas
  - [ ] Pruebas completas y CI
  - [ ] Despliegue final con Docker en producción
```

---

## 🤝 Contribución

¡Gracias por querer contribuir! Sigue este flujo:

1. Haz **fork** del repo.
2. Crea una rama (`feature/nombre-descriptivo` o `fix/descripcion`).
3. Realiza cambios con commits claros.
4. Sincroniza con el repo original y abre **Pull Request** describiendo cambios y pruebas.
5. Mantén tu PR pequeño y enfocado; incluye capturas o tests cuando aplique.

**Checklist de PR**

- [ ] Código formateado y lint pasado.
- [ ] Tests relevantes añadidos/actualizados.
- [ ] Documentación actualizada (README, /docs).
- [ ] Pruebas manuales ejecutadas en entorno local o Docker.

---

## 👤 Autor

- **Mariana Jiménez**  
- Preparación para competencia **Senasoft**  
- GitHub: [mjjkk13](https://github.com/mjjkk13)

---

## 📝 Licencia

Licencia MIT — revisa el archivo `LICENSE` para detalles.

---
