# Proyecto Final FullStack - Veterinaria RollingVet 🐾

Este es el proyecto final del 3° módulo del curso FullStack de RollingCode, desarrollado por nuestro equipo haciendo uso del stack MERN (MongoDB, Express, React, Node.js). Consiste en una página web para gestión de una veterinaria, con funcionalidades para usuarios, productos, servicios, turnos y pagos.

---

## 📌 Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- Node.js v22.14.0
- MongoDB v8.0.11 (remota en Atlas)
- Git 2.48.1.windows.1

---

## 📌 Instrucciones de instalación

### 1. Clonar los repositorios

#### Frontend

```
git clone https://github.com/FacundoGabriel/vet-rolling-frontend.git
```

#### Backend

```
git clone https://github.com/FacundoGabriel/vet-rolling-backend.git
```

### 2. Instalar dependencias

#### Backend

```
cd ./vet-rolling-backend
npm install
```

#### Frontend

```
cd ./vet-rolling-frontend
npm install
```

---

## 📌 Configuración de variables de entorno

Debés crear un archivo `.env` tanto en el backend como en el frontend con la siguiente información:

### Backend

```
MONGO_ACCESS=
PORT=4000
FRONT_URL=http://localhost:5173
JWT_SECRET=
GMAIL_USER=
GMAIL_PASS=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
MP_API_TOKEN=
```

### Frontend

```
VITE_URL_BACK=http://localhost:4000
VITE_MP_PUBLIC_KEY=
```

---

## 📌 Cómo correr el proyecto

### Backend

```
cd ./vet-rolling-backend
npm run dev
```

### Frontend

```
cd ./vet-rolling-frontend
npm run dev
```

Abrir el navegador en:  
http://localhost:5173

---

## 📌 Usuarios de prueba

Podés iniciar sesión con los siguientes usuarios de prueba:

#### Usuario

Email: prueba@facundo.com  
Contraseña: 123456789

#### Veterinario

Email: cordobaalvaromaximiliano@gmail.com  
Contraseña: 123456789

#### Administrador

Email: gabriel@gabriel.com  
Contraseña: 123456789

---

## 📌 Tecnologías utilizadas

- Frontend: React, Vite, React-Bootstrap
- Backend: Node.js, Express, MongoDB, Mongoose

---

## 📌 Enlaces útiles

- [Repositorio Frontend](https://github.com/FacundoGabriel/vet-rolling-frontend)
- [Repositorio Backend](https://github.com/FacundoGabriel/vet-rolling-backend)
- [Mockup](https://excalidraw.com/#json=rDyBLOj2fDrCphAJ-c46a,MsjyIvRk4KIfWvncZQmBfA)

## 📌 Autores

- Victor Gabriel Fernández Medina - Scrum Master.
- Facundo Gabriel De La Cruz - Líder Técnico.
- Álvaro Maximiliano Córdoba - Desarrollador Fullstack.
- Leonardo Santillan Rearte - Desarrollador FullStack.
