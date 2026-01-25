# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

posToy is a Point of Sale (POS) demo application built with ASP.NET Core 3.1 backend and Angular 8 frontend. It supports barcode scanning via keyboard input for adding products to transactions.

## Build and Run Commands

### Backend (.NET Core)
```bash
cd posToy
dotnet restore
dotnet build
dotnet run
```

### Frontend (Angular)
```bash
cd posToy/ClientApp
npm install
npm start          # Dev server at http://localhost:4200
npm run build      # Build to dist/
npm run build:ssr  # Server-side rendering build
```

### Testing and Linting
```bash
cd posToy/ClientApp
npm test           # Unit tests via Karma
npm run e2e        # End-to-end tests via Protractor
npm run lint       # Run linter
```

### Docker
```bash
docker build -f posToy/Dockerfile -t postoy .
```

## Architecture

### Backend Structure (posToy/)
- **Controllers/**: API endpoints
  - `ProductController.cs` - Product CRUD and barcode lookup (`/product`, `/product/byBarcode/{barcode}`)
- **Models/**: Data models (Product with Id, Name, Price, ImageUrl, Barcode)
- **Startup.cs**: Configures SPA services, routes, and Angular CLI integration

### Frontend Structure (posToy/ClientApp/src/app/)
- **home/**: Main POS view - displays products, handles transactions, barcode scanning via `(document:keypress)` event
- **payment/**: Payment dialog component using Angular Material dialog
- **nav-menu/**: Navigation component

### Key Integration Points
- Angular is served by ASP.NET Core via `spa.UseAngularCliServer()` in development
- Production builds serve Angular from `ClientApp/dist/`
- API base URL is injected into Angular components via `@Inject('BASE_URL')`

### UI Framework
Angular Material with modules: Card, GridList, List, Icon, Table, Button, Dialog, ProgressSpinner
