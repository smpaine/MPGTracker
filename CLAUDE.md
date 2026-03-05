# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (ng serve)
npm run build      # Build (output to dist/)
ng build --configuration production  # Production build
npm test           # Run unit tests (Karma/Jasmine)
npm run lint       # Lint with tslint
npm run e2e        # End-to-end tests (Protractor)
```

## Architecture

**MPGTracker** is an Angular 19 SPA for tracking vehicle fuel mileage. It connects to a backend REST API via `/api` (proxied in dev; configured in `src/environments/environment.ts`).

### Authentication Flow
- JWT-based auth via `AuthenticationService` (`src/app/_services/authentication.service.ts`)
- Token stored in `localStorage` under key `"token"`
- `JwtInterceptor` (`src/app/_helpers/jwt.interceptor.ts`) attaches `Authorization: Bearer <token>` to all HTTP requests
- `ErrorInterceptor` handles auth errors globally
- `AuthGuard` (`src/app/_guards/auth.guard.ts`) protects all routes except `/login` and `/logout`

### State Management Pattern
- `AppComponent` acts as a shared state container — it holds `selectedVehicle: Vehicle` and `showingStats: boolean` as public fields
- Child components receive `AppComponent` via constructor injection (`public mainApp: AppComponent`) to read/write shared state
- No NgRx or other state library is used

### Path Aliases
TypeScript path aliases are configured (via tsconfig) so imports use:
- `@/` → `src/app/`
- `@environments/` → `src/environments/`

### Directory Structure
- `src/app/_services/` — `AuthenticationService` (login/logout/token management)
- `src/app/_helpers/` — HTTP interceptors (JWT, error handling)
- `src/app/_guards/` — Route guards
- `src/app/_alert/` — Alert notification module (AlertService, AlertComponent)
- `src/app/_models/` — Auth-related models (User, JwtResponse)
- `src/app/models/` — Domain models (Vehicle, Mileage, VehicleStats)
- `src/app/services/` — Domain services (VehicleService, MileageService, UserService)
- `src/app/directives/` — Custom directives (OnlyNumber)

### Key Routes
| Path | Component | Notes |
|------|-----------|-------|
| `/mileages` | VehicleListComponent | Lists vehicles, shows mileage entries |
| `/mileages/:id` | VehicleListComponent | With pre-selected vehicle |
| `/vehicleStats/:id` | VehicleStatsComponent | Stats for a vehicle |
| `/vehicleSorting` | VehicleSortingComponent | Drag-and-drop sort order |
| `/addMileage/:vid` | MileageFormComponent | Add mileage entry |
| `/editMileage/:vid/:mid` | MileageFormComponent | Edit mileage entry |
| `/addVehicle` | AddVehicleComponent | Add new vehicle |
| `/manageUsers` | ManageUsersComponent | Admin: user management |

### API Endpoints (consumed)
- `POST /api/authenticate` — login
- `GET/POST/PUT /api/vehicles/` — list/update/add vehicles
- `POST /api/vehicles/sortUpdate` — update sort order
- `GET/PUT/DELETE /api/mileages/` — mileage CRUD
- `GET /api/mileages/vehicle/:vid` — mileages for a vehicle
- `GET /api/mileages/vehicle/stats/:vid` — stats for a vehicle

### UI Framework
Angular Material (deeppurple-amber theme) is used throughout. The `@angular-material-components/datetime-picker` package provides datetime picking (peer dep override applied in `package.json` for Angular 19 compatibility).

### FreeBSD Note
A `postinstall` script in `package.json` patches rollup with `@rollup/wasm-node` on FreeBSD. This is a no-op on other platforms.
