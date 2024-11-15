# Build script for VegWiz
Write-Host "Building VegWiz solution..." -ForegroundColor Green

# Build Core project first
Write-Host "Building Core project..." -ForegroundColor Yellow
dotnet build ../VegWiz.Core/VegWiz.Core.csproj

# Build Infrastructure project
Write-Host "Building Infrastructure project..." -ForegroundColor Yellow
dotnet build ../VegWiz.Infrastructure/VegWiz.Infrastructure.csproj

# Build API project
Write-Host "Building API project..." -ForegroundColor Yellow
dotnet build ../VegWiz.API/VegWiz.API.csproj

Write-Host "Build complete!" -ForegroundColor Green