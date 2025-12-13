# PruebaTecnicaCarsalesFRONT

Frontend en Angular para listar y explorar personajes y episodios. Incluye filtros, paginación, tarjetas reutilizables y un modal genérico para mostrar detalles.

---

## Resumen
Aplicación frontend que consume una API para mostrar listados paginados y filtrables de personajes y episodios. Permite ver detalles en un modal y cuenta con componentes reutilizables para acelerar el desarrollo.

---

## Requisitos
- Node.js >= 18.
- npm >= 9.
- Angular 19.

---

## Instalación
1. Clona el repositorio:
  ```bash
  git clone <repo-url>
  ```

2. Posicionarse en el frontend y dentro del proyecto:
  ```bash
  cd PruebaTecnicaCarsalesFRONT
  ```

3. Instala dependencias:
  ```bash
  npm install
  ```

---

## Ejecución en desarrollo
- Levantar servidor de desarrollo:
  ```bash
  npm start
  # o
  ng serve
  ```
- Abre la app en el navegador:
  http://localhost:4200/

Notas:
- Configura la URL base de la API en `src/environments/environment.ts` si la API está en otro host/puerto.
- Para producción: `npm run build` genera la carpeta `dist/`.

---

## Scripts útiles
- `npm start` — servidor de desarrollo (ng serve)
- `npm run build` — construir app para producción
- `npm test` — ejecutar tests (si están configurados)

---

## Estructura principal
- `src/app/features/characters` — lista y lógica de personajes
- `src/app/features/episodes` — lista y detalle de episodios (usa modal)
- `src/app/shared/components` — componentes reutilizables (card, filter, pagination, modal, loading)
- `src/app/core/services` — servicios para llamadas a la API
- `src/styles.scss` — estilos globales

---

## Componentes reutilizables
- `app-generic-card` — tarjeta visual para mostrar un ítem.
- `app-generic-filter` — tarjeta de filtros dinámica basada en una lista de campos.
- `app-generic-pagination` — paginador y selección de página.
- `app-generic-modal` — modal genérico para mostrar información.

---