#!/bin/bash
# =====================================================
# Aviation Intelligence Platform - Development Setup
# =====================================================

set -e

echo "🛩️  Aviation Intelligence Platform - Setup"
echo "==========================================="

# 1. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 2. Check if Docker is running
echo "🐳 Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# 3. Start Docker Supabase (dev/staging)
echo "🗄️  Starting Supabase containers..."
docker-compose up -d

# 4. Wait for Supabase to be ready
echo "⏳ Waiting for Supabase to be ready..."
sleep 10

# 5. Run database migrations
echo "🔄 Running database migrations..."
npm run db:migrate

# 6. Seed mock data
echo "🌱 Seeding database..."
npm run db:seed

# 7. Start development server
echo "🚀 Starting development server..."
echo ""
echo "Access points:"
echo "  - App:             http://localhost:3000"
echo "  - Supabase Studio: http://localhost:54323"
echo ""

npm run dev
