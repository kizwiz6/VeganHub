# Build script for VeganHub
Write-Host "Building VeganHub solution..." -ForegroundColor Green

# Build Core project first
Write-Host "Building Core project..." -ForegroundColor Yellow
dotnet build ../VeganHub.Core/VeganHub.Core.csproj

# Build Infrastructure project
Write-Host "Building Infrastructure project..." -ForegroundColor Yellow
dotnet build ../VeganHub.Infrastructure/VeganHub.Infrastructure.csproj

# Build API project
Write-Host "Building API project..." -ForegroundColor Yellow
dotnet build ../VeganHub.API/VeganHub.API.csproj

Write-Host "Build complete!" -ForegroundColor Green