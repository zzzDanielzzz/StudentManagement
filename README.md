# 📚 API para la Aplicación de Educación

## ✨ Descripción

Esta API proporciona funcionalidades esenciales para la gestión de una aplicación educativa, incluyendo autenticación de usuarios, administración de cursos y gestión de perfiles para estudiantes y profesores.

## 🛠️ Tecnologías Utilizadas

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**

---
## 📦 Instalación

1. Clona el repositorio:

```CMD
git clone https://github.com/zzzDanielzzz/StudentManagement.git
```

2. Instalar las dependencias:

```CMD
npm install
```

3. Iniciar el servidor:

```CMD
npm run dev
---
## 📑 Endpoints Disponibles

### 🔐 Autenticación

#### **Registrar Estudiante**

- **URL:** `/studentManagement/v1/auth/registerStudent`  
- **Método:** `POST`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "name": "string",
    "surname": "string",
    "userName": "string",
    "email": "string",
    "phone": "string",
    "password": "string",
    "profilePicture": "file"
  }
  ```

---

#### **Registrar Profesor**

- **URL:** `/studentManagement/v1/auth/registerTeacher`  
- **Método:** `POST`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "name": "string",
    "surname": "string",
    "userName": "string",
    "email": "string",
    "phone": "string",
    "password": "string",
    "profilePicture": "file"
  }
  ```

---

#### **Iniciar Sesión**

- **URL:** `/studentManagement/v1/auth/login`  
- **Método:** `POST`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

---

### 👥 Gestión de Usuarios

#### **Listar Usuario por ID**

- **URL:** `/studentManagement/v1/user/findUser/:uid`  
- **Método:** `GET`  

---

#### **Listar Todos los Usuarios**

- **URL:** `/studentManagement/v1/user/`  
- **Método:** `GET`  

---

#### **Actualizar Contraseña**

- **URL:** `/studentManagement/v1/user/updatePassword/:uid`  
- **Método:** `PATCH`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "newPassword": "string"
  }
  ```

---

### 🎓 Funcionalidades para Estudiantes

#### **Inscribirse en un Curso**

- **URL:** `/studentManagement/v1/user/enroll/:uid`  
- **Método:** `POST`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "courseId": "string"
  }
  ```
  *Nota: Colocar el ID del curso como valor del campo `courseId`.*

---

#### **Ver Cursos Inscritos**

- **URL:** `/studentManagement/v1/user/courses/:uid`  
- **Método:** `GET`  

---

#### **Actualizar Perfil**

- **URL:** `/studentManagement/v1/user/updateProfile/:uid`  
- **Método:** `PUT`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "name": "string",
    "surname": "string",
    "userName": "string",
    "email": "string",
    "phone": "string"
  }
  ```

---

#### **Eliminar Perfil**

- **URL:** `/studentManagement/v1/user/deleteUser/:uid`  
- **Método:** `DELETE`  

---

### 👨‍🏫 Funcionalidades para Profesores

#### **Ver Cursos Impartidos**

- **URL:** `/studentManagement/v1/user/teacherCourses/:uid`  
- **Método:** `GET`  

---

#### **Crear Curso**

- **URL:** `/studentManagement/v1/course/createCourse`  
- **Método:** `POST`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "name": "string",
    "description": "string",
    "teacher": "string"
  }
  ```
  *Nota: Colocar el `uid` del profesor como valor del campo `teacher`.*

---

#### **Actualizar Curso**

- **URL:** `/studentManagement/v1/course/updateCourse/:id`  
- **Método:** `PUT`  
- **Cuerpo de la solicitud:**

  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```

---

#### **Eliminar Curso**

- **URL:** `/studentManagement/v1/course/deleteCourse/:id`  
- **Método:** `DELETE`  

---












