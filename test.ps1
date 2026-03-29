# Uranus Chat App Test Script
# This script sets up and starts the Uranus chat application for testing
#
# Usage:
# .\test.ps1                    # Run on default port 5000
# .\test.ps1 -Port 3000         # Run on port 3000
#
# To run this script:
# 1. Open PowerShell as Administrator
# 2. Set execution policy if needed: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# 3. Navigate to the project root: cd E:\Uranus\Uranus
# 4. Run: .\test.ps1 [-Port <port_number>]

param(
    [Parameter(Mandatory = $false)]
    [int]$Port = 5000
)

Write-Host "Setting up Uranus Chat App..." -ForegroundColor Cyan

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
Push-Location backend
npm install
Pop-Location

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
Push-Location frontend
npm install
Pop-Location

# Build frontend
Write-Host "Building frontend..." -ForegroundColor Yellow
Push-Location frontend
npm run build
Pop-Location

# Copy built frontend to backend public directory
Write-Host "Copying built frontend to backend..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "backend/public" -Force | Out-Null
Copy-Item -Path "frontend/dist/*" -Destination "backend/public/" -Recurse -Force

# Start the application
Write-Host "Starting Uranus Chat App..." -ForegroundColor Green
Write-Host "The app will be available at http://localhost:$Port" -ForegroundColor Green
$env:NODE_ENV = "production"
$env:PORT = $Port
npm start