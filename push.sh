#!/bin/bash
# Script de envio automático pré-configurado para Taiwansz

echo "=========================================="
echo " 🚀 Enviando Nosso Grande Dia SaaS "
echo " Usuário: Taiwansz"
echo " Repositório: https://github.com/Taiwansz/nosso-grande-dia"
echo "=========================================="

USERNAME="Taiwansz"
TOKEN="${GITHUB_TOKEN:-$1}"
REPO_DIR="/root/nosso-grande-dia"

cd "$REPO_DIR" || exit 1

git add .
git commit -m "feat: update Nosso Grande Dia platform with clean security"
if [ -n "$TOKEN" ]; then
    git remote remove origin 2>/dev/null
    git remote add origin "https://${TOKEN}@github.com/${USERNAME}/nosso-grande-dia.git"
fi

git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo "=========================================="
    echo " ✅ SUCESSO COMPLETO!"
    echo " Disponível em: https://github.com/Taiwansz/nosso-grande-dia"
    echo "=========================================="
fi
