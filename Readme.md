# PruebaTecnicaCarsales — README

Proyectos:

- backend/: API en .NET 8 (PruebaTecnicaCarsalesAPI)
- frontend/: Aplicación Angular 19 (PruebaTecnicaCarsalesFRONT)

Resumen

- Backend: carpeta backend/PruebaTecnicaCarsalesAPI/PruebaTecnicaCarsalesAPI
  - Plataforma: .NET 8
  - Archivo principal: Program.cs
  - Configuración: appsettings.json (contiene BaseUrl de la API externa, paginación y Cors)
  - Swagger disponible en entorno de desarrollo.
  - CORS: orígenes permitidos definidos en appsettings.json.

- Frontend: carpeta frontend/PruebaTecnicaCarsalesFRONT
  - Plataforma: Angular 19
  - Entradas importantes: src/main.ts, src/main.server.ts (SSR), server.ts
  - package.json contiene scripts útiles: start (ng serve), build (ng build), watch, y serve:ssr para servir SSR
  - Archivos de entorno: src/environments/environment.ts y environment.development.ts

Requisitos

- .NET SDK 8
- Node.js (compatible con la versión usada en package.json)
- npm o yarn
- Angular CLI para desarrollo local: npm install -g @angular/cli

Cómo ejecutar en desarrollo

1) Backend (.NET 8)
   - Abrir terminal en: backend\PruebaTecnicaCarsalesAPI\PruebaTecnicaCarsalesAPI
   - Restaurar y ejecutar:
     - dotnet restore
     - dotnet run
   - Notas:
     - La API usa HTTPS por defecto (redirección habilitada en Program.cs).
     - Swagger estará disponible en entorno Development en /swagger.
     - Si el frontend corre en localhost:4200, la API ya permite ese origen según appsettings.json, si no, agregar origen.
     - API diseñada en IDE Visual Studio 2022.

2) Frontend (Angular 19)
   - Abrir terminal en: frontend\PruebaTecnicaCarsalesFRONT
   - Instalar dependencias:
     - npm install
   - Ejecutar en modo desarrollo:
     - npm start
     - Por defecto el servidor de desarrollo es http://localhost:4200

Configuración y puntos clave

- URL de la API externa está en backend/.../appsettings.json bajo RickAndMortyApi
- CORS se configura en Program.cs leyendo las orígenes permitidos desde appsettings.json
- Si cambias el puerto del frontend, actualiza Cors:AllowedOrigins en appsettings.json o añade el origen correspondiente.
- Archivos relevantes:
  - backend/.../Program.cs  -> configuración de servicios, HttpClient, CORS y middleware
  - backend/.../appsettings.json -> configuración central
  - frontend/.../package.json -> scripts y dependencias
  - frontend/.../src/main.server.ts y server.ts -> soporte SSR

Problemas comunes

- Error de CORS: verificar que el origen (ej. http://localhost:4200) esté en Cors:AllowedOrigins
- Swagger no visible: asegurarse de que ASPNETCORE_ENVIRONMENT esté en Development o que Swagger esté habilitado
- SSR: confirmar que se haya generado la build server antes de ejecutar el server.mjs

Contacto

- Correo: claudioandresulloacastro@gmail.com

