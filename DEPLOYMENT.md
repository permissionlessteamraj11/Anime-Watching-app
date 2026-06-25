# Deployment Guide: AnimeVerse Pro

This guide provides instructions for deploying the AnimeVerse Pro platform in a production environment.

## 1. Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- PostgreSQL (if not using Docker)
- Redis (if not using Docker)
- S3-Compatible Storage (AWS S3, MinIO, etc.)
- Domain Name with SSL certificate

## 2. Environment Configuration

Create a `.env` file in the root directory and populate it with your production secrets:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/animeverse"

# Authentication
JWT_SECRET="your-super-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"

# Redis
REDIS_URL="redis://localhost:6379"

# Storage
S3_ENDPOINT="s3.amazonaws.com"
S3_ACCESS_KEY="your-access-key"
S3_SECRET_KEY="your-secret-key"
S3_BUCKET="animeverse-storage"

# Deployment
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

## 3. Docker Deployment (Recommended)

The easiest way to deploy is using Docker Compose.

1.  **Build and Start:**
    ```bash
    docker-compose up -d --build
    ```

This will spin up:
- Next.js Application (Port 3000)
- PostgreSQL Database
- Redis Cache

2.  **Run Migrations:**
    ```bash
    docker-compose exec app npx prisma migrate deploy
    ```

3.  **Seed Initial Data (Optional):**
    ```bash
    docker-compose exec app npx prisma db seed
    ```

## 4. Manual Deployment

If you prefer to deploy manually:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```

3.  **Build the Application:**
    ```bash
    npm run build
    ```

4.  **Start the Server:**
    ```bash
    npm start
    ```

## 5. Production Optimization

- **HLS Streaming:** Ensure your video storage (S3) is configured with a CDN (CloudFront/Cloudflare) for low-latency streaming.
- **Database Indexing:** Ensure indices are created for `slug`, `email`, and `id` fields (handled by Prisma).
- **Caching:** Redis is used for session management and API response caching. Monitor Redis memory usage.
- **Security:**
    - Use a reverse proxy like Nginx or Traefik with SSL (Let's Encrypt).
    - Set `NODE_ENV=production`.
    - Ensure `JWT_SECRET` is at least 32 characters long.

## 6. Scaling

AnimeVerse Pro is designed to be horizontally scalable:
- The stateless Next.js app can be replicated behind a load balancer.
- PostgreSQL can be scaled using read-replicas.
- Redis handles distributed state/caching.
- Static assets and videos should be served via CDN.
