# ---------- Build Frontend ----------
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend package.json and install deps
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source and build
COPY frontend .
RUN npm run build


# ---------- Production Image ----------
FROM node:20-alpine

WORKDIR /app

# Install backend dependencies (including devDependencies to run 'npm run build')
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy backend source
COPY backend ./backend

# Build backend
RUN cd backend && npm run build

# Copy built frontend into backend/public
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Set production environment
ENV NODE_ENV=production

WORKDIR /app/backend

EXPOSE 5001

# Run the compiled code
CMD ["node", "--trace-uncaught", "dist/index.js"]
