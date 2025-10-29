# PowerShell script to push project to GitHub
# Usage: .\push-to-github.ps1 -RepoName "mohra-artistry-web" -Username "your-username"

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoName,
    
    [Parameter(Mandatory=$true)]
    [string]$Username
)

Write-Host "🚀 جاري رفع المشروع على GitHub..." -ForegroundColor Green

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "⚠️  Remote 'origin' موجود بالفعل. جاري حذفه..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote repository
$remoteUrl = "https://github.com/$Username/$RepoName.git"
Write-Host "📦 إضافة remote repository: $remoteUrl" -ForegroundColor Cyan
git remote add origin $remoteUrl

# Push to GitHub
Write-Host "⬆️  رفع الملفات إلى GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ تم رفع المشروع بنجاح!" -ForegroundColor Green
    Write-Host "🔗 رابط المشروع: https://github.com/$Username/$RepoName" -ForegroundColor Green
} else {
    Write-Host "❌ حدث خطأ أثناء الرفع. تأكد من:" -ForegroundColor Red
    Write-Host "   1. قمت بإنشاء المستودع على GitHub باسم: $RepoName" -ForegroundColor Yellow
    Write-Host "   2. اسم المستخدم صحيح: $Username" -ForegroundColor Yellow
    Write-Host "   3. أنت مسجل دخول على GitHub في المتصفح" -ForegroundColor Yellow
}

