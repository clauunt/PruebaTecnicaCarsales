# PruebaTecnicaCarsalesAPI — README (Backend)

Resumen

API en .NET 8 que actúa como BFF para la aplicación Angular, la cual consume la API pública de Rick and Morty y expone endpoints para personajes y episodios.

Estructura principal

- Controllers/: CharactersController.cs, EpisodesController.cs
- Services/: RickAndMortyService.cs
- Configuration/: RickAndMortyApiOptions.cs
- Middleware/: GlobalExceptionMiddleware.cs
- Dtos/, Models/, Extensions/, Utils/, Filters/, Pagination/  (mapas de DTOs, modelos, helpers y filtros de paginación)
- appsettings.json / appsettings.Development.json

Requisitos

- .NET SDK 8 instalado
- Opcional: Visual Studio 2022/2023 o Visual Studio Code

Configuración

- appsettings.json contiene:
  - RickAndMortyApi: BaseUrl
  - Pagination: DefaultPageSize y MaxPageSize
  - Cors: AllowedOrigins

- CORS: en Program.cs se registra la política "AllowAngularApp" que lee Cors:AllowedOrigins desde appsettings. Si el frontend usa otro puerto o dominio, agregar el origen a esa lista.

- HttpClient: se registra un HttpClient tipado para IRickAndMortyService usando las opciones de RickAndMortyApi para BaseAddress y Timeout.

Ejecutar en desarrollo (Windows)

1) Abrir PowerShell o terminal y situarse en la carpeta del proyecto:
   cd "...\backend\PruebaTecnicaCarsalesAPI\PruebaTecnicaCarsalesAPI"

2) Restaurar paquetes y ejecutar:
   dotnet restore
   dotnet run

- Swagger estará disponible cuando el entorno sea Development en /swagger.
- Por defecto la app usa HTTPS (UseHttpsRedirection en Program.cs). Si hay problemas con certificados de desarrollo, usar dotnet dev-certs como corresponda.

Archivo de launch / pruebas

- launchSettings.json contiene perfiles de ejecución y puertos para debugging.

Errores comunes y soluciones rápidas

- CORS blocked: añadir el origen del frontend a Cors:AllowedOrigins o ejecutar frontend en uno de los orígenes listados.
- Swagger no visible: asegurarse de configurar ASPNETCORE_ENVIRONMENT=Development o habilitar Swagger en producción si necesario.
- Timeouts al consumir la API externa: revisar BaseUrl en appsettings, o ajustar el Timeout registrado para HttpClient en Program.cs.

Notas de desarrollo

- La lógica de consumo externo se encuentra en Services/RickAndMortyService.cs y se configura mediante RickAndMortyApiOptions.
- Las clases en Extensions/ transforman modelos de la API externa a DTOs usados por los controllers.
- Utilizar las clases de Pagination/ para paginar respuestas desde los endpoints.