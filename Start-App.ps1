# ═══════════════════════════════════════════════════════════════════════════════
#                         LEARN ENGLISH A1 - APP LAUNCHER
# ═══════════════════════════════════════════════════════════════════════════════

$Host.UI.RawUI.WindowTitle = "Learn English A1 - Starting..."

# Colors
$accent = "Cyan"
$success = "Green"
$warning = "Yellow"
$error = "Red"

function Show-Logo {
    Clear-Host
    Write-Host ""
    Write-Host "  ╔═══════════════════════════════════════════════════════════════════╗" -ForegroundColor $accent
    Write-Host "  ║                                                                   ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "██╗     ███████╗ █████╗ ██████╗ ███╗   ██╗" -ForegroundColor White -NoNewline
    Write-Host "              ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "██║     ██╔════╝██╔══██╗██╔══██╗████╗  ██║" -ForegroundColor White -NoNewline
    Write-Host "              ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "██║     █████╗  ███████║██████╔╝██╔██╗ ██║" -ForegroundColor White -NoNewline
    Write-Host "              ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "██║     ██╔══╝  ██╔══██║██╔══██╗██║╚██╗██║" -ForegroundColor White -NoNewline
    Write-Host "              ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "███████╗███████╗██║  ██║██║  ██║██║ ╚████║" -ForegroundColor White -NoNewline
    Write-Host "              ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝" -ForegroundColor White -NoNewline
    Write-Host "              ║" -ForegroundColor $accent
    Write-Host "  ║                                                                   ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "███████╗███╗   ██╗ ██████╗ ██╗     ██╗███████╗██╗  ██╗" -ForegroundColor Yellow -NoNewline
    Write-Host "    ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "██╔════╝████╗  ██║██╔════╝ ██║     ██║██╔════╝██║  ██║" -ForegroundColor Yellow -NoNewline
    Write-Host "    ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "█████╗  ██╔██╗ ██║██║  ███╗██║     ██║███████╗███████║" -ForegroundColor Yellow -NoNewline
    Write-Host "    ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "██╔══╝  ██║╚██╗██║██║   ██║██║     ██║╚════██║██╔══██║" -ForegroundColor Yellow -NoNewline
    Write-Host "    ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "███████╗██║ ╚████║╚██████╔╝███████╗██║███████║██║  ██║" -ForegroundColor Yellow -NoNewline
    Write-Host "    ║" -ForegroundColor $accent
    Write-Host "  ║   " -ForegroundColor $accent -NoNewline
    Write-Host "╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝╚══════╝╚═╝  ╚═╝" -ForegroundColor Yellow -NoNewline
    Write-Host "    ║" -ForegroundColor $accent
    Write-Host "  ║                                                                   ║" -ForegroundColor $accent
    Write-Host "  ║                        " -ForegroundColor $accent -NoNewline
    Write-Host "★ A1 LEVEL ★" -ForegroundColor Magenta -NoNewline
    Write-Host "                              ║" -ForegroundColor $accent
    Write-Host "  ║              " -ForegroundColor $accent -NoNewline
    Write-Host "Ingliz tili o'rganish ilovasi" -ForegroundColor Gray -NoNewline
    Write-Host "                    ║" -ForegroundColor $accent
    Write-Host "  ║                                                                   ║" -ForegroundColor $accent
    Write-Host "  ╚═══════════════════════════════════════════════════════════════════╝" -ForegroundColor $accent
    Write-Host ""
}

function Show-Step {
    param([string]$Step, [string]$Message)
    Write-Host "  [$Step] " -ForegroundColor $accent -NoNewline
    Write-Host $Message -ForegroundColor White
}

function Show-Success {
    param([string]$Message)
    Write-Host "  [✓] " -ForegroundColor $success -NoNewline
    Write-Host $Message -ForegroundColor $success
}

function Show-Warning {
    param([string]$Message)
    Write-Host "  [!] " -ForegroundColor $warning -NoNewline
    Write-Host $Message -ForegroundColor $warning
}

function Show-Error {
    param([string]$Message)
    Write-Host "  [✗] " -ForegroundColor $error -NoNewline
    Write-Host $Message -ForegroundColor $error
}

# ═══════════════════════════════════════════════════════════════════════════════
#                              MAIN STARTUP SEQUENCE
# ═══════════════════════════════════════════════════════════════════════════════

Show-Logo

Write-Host "  ─────────────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "                         STARTUP SEQUENCE" -ForegroundColor $accent
Write-Host "  ─────────────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# Step 1: Navigate to project directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath
Show-Step "1/5" "Setting project directory..."
Show-Success "Directory: $scriptPath"
Write-Host ""

# Step 2: Check Node.js
Show-Step "2/5" "Checking Node.js installation..."
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Show-Success "Node.js $nodeVersion found"
    } else {
        throw "Node.js not found"
    }
} catch {
    Show-Error "Node.js is not installed!"
    Show-Warning "Please install Node.js from https://nodejs.org"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host ""

# Step 3: Check/Install dependencies
Show-Step "3/5" "Checking dependencies..."
if (-not (Test-Path "node_modules")) {
    Show-Warning "node_modules not found. Installing dependencies..."
    Write-Host ""
    npm install
    if ($LASTEXITCODE -ne 0) {
        Show-Error "Failed to install dependencies!"
        Read-Host "Press Enter to exit"
        exit 1
    }
    Show-Success "Dependencies installed successfully"
} else {
    Show-Success "Dependencies already installed"
}
Write-Host ""

# Step 4: Find available port
Show-Step "4/5" "Finding available port..."
$defaultPort = 5173
$port = $defaultPort

# Check if default port is in use
$portInUse = Get-NetTCPConnection -LocalPort $defaultPort -ErrorAction SilentlyContinue
if ($portInUse) {
    Show-Warning "Port $defaultPort is in use, Vite will auto-select another port"
}
Show-Success "Target port: $defaultPort (Vite will find available port if busy)"
Write-Host ""

# Step 5: Start the server
Show-Step "5/5" "Starting development server..."
Write-Host ""
Write-Host "  ─────────────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

$Host.UI.RawUI.WindowTitle = "Learn English A1 - Running"

Write-Host "  " -NoNewline
Write-Host "🚀 " -NoNewline
Write-Host "Server starting... Browser will open automatically!" -ForegroundColor $success
Write-Host ""
Write-Host "  " -NoNewline
Write-Host "📝 " -NoNewline
Write-Host "Press " -ForegroundColor Gray -NoNewline
Write-Host "Ctrl+C" -ForegroundColor Yellow -NoNewline
Write-Host " to stop the server" -ForegroundColor Gray
Write-Host ""
Write-Host "  ═══════════════════════════════════════════════════════════════════════" -ForegroundColor DarkGray
Write-Host ""

# Start Vite dev server with auto-open
npm run dev -- --open

# If server stops, show message
Write-Host ""
Write-Host "  ─────────────────────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host "  Server stopped." -ForegroundColor $warning
Write-Host ""
$Host.UI.RawUI.WindowTitle = "Learn English A1 - Stopped"
Read-Host "  Press Enter to close"
