#!/bin/bash
# Script de envio automático pré-configurado para Taiwansz

echo "=========================================="
echo " 🚀 Enviando Nosso Grande Dia SaaS "
echo " Usuário: Taiwansz"
echo " Repositório: https://github.com/Taiwansz/nosso-grande-dia"
echo "=========================================="

USERNAME="Taiwansz"
TOKEN="${GITHUB_TOKEN:-${1:-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}}"
REPO_DIR="/root/nosso-grande-dia"

cd "$REPO_DIR" || exit 1

git add .
git commit -m "feat: add interactive table management and Supabase integration"
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
