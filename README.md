# 📦 Kanri - Stock Service

**Descripción:**  
Microservicio encargado de registrar las entradas y salidas de stock por producto.

## 🚀 Tecnologías utilizadas
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod
- Dotenv

## 🧱 Modelo principal
- `StockEntry`
- `StockExit`

## 📦 Comandos útiles

```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev