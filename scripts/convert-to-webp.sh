#!/bin/bash

# Script para converter imagens PNG/JPG para WebP mantendo qualidade
# Requer: cwebp (npm install -g cwebp-bin ou apt install webp)

set -e

IMAGES_DIR="public/images"
QUALITY=85
BACKUP_DIR="public/images-backup"

echo "🎨 Iniciando conversão de imagens para WebP..."
echo "📁 Diretório: $IMAGES_DIR"
echo "🎯 Qualidade: $QUALITY"
echo ""

# Verificar se cwebp está instalado
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp não encontrado!"
    echo "📦 Instale com: sudo apt install webp (Linux) ou brew install webp (Mac)"
    exit 1
fi

# Criar backup
if [ ! -d "$BACKUP_DIR" ]; then
    echo "💾 Criando backup das imagens originais..."
    cp -r "$IMAGES_DIR" "$BACKUP_DIR"
    echo "✅ Backup criado em: $BACKUP_DIR"
    echo ""
fi

# Contador
TOTAL=0
CONVERTED=0
SKIPPED=0
FAILED=0

# Converter PNG e JPG para WebP
echo "🔄 Processando imagens..."
echo ""

for img in $(find "$IMAGES_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \)); do
    TOTAL=$((TOTAL + 1))
    WEBP_FILE="${img%.*}.webp"
    
    # Pular se WebP já existe e é mais recente
    if [ -f "$WEBP_FILE" ] && [ "$WEBP_FILE" -nt "$img" ]; then
        echo "⏭️  Pulando: $(basename $img) (WebP já existe)"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi
    
    echo "🖼️  Convertendo: $(basename $img)"
    
    if cwebp -q $QUALITY "$img" -o "$WEBP_FILE" > /dev/null 2>&1; then
        ORIGINAL_SIZE=$(du -h "$img" | cut -f1)
        WEBP_SIZE=$(du -h "$WEBP_FILE" | cut -f1)
        echo "   ✅ $ORIGINAL_SIZE → $WEBP_SIZE"
        CONVERTED=$((CONVERTED + 1))
    else
        echo "   ❌ Falha ao converter"
        FAILED=$((FAILED + 1))
    fi
    echo ""
done

# Relatório final
echo "================================"
echo "📊 RELATÓRIO DE CONVERSÃO"
echo "================================"
echo "Total de imagens: $TOTAL"
echo "✅ Convertidas: $CONVERTED"
echo "⏭️  Puladas: $SKIPPED"
echo "❌ Falhadas: $FAILED"
echo ""

if [ $CONVERTED -gt 0 ]; then
    echo "💡 Próximos passos:"
    echo "1. Teste o site com as imagens WebP"
    echo "2. Se tudo estiver ok, remova as PNGs:"
    echo "   find $IMAGES_DIR -type f \( -iname '*.png' -o -iname '*.jpg' \) -delete"
    echo "3. Atualize referências no código para usar WebP quando disponível"
    echo ""
    echo "📦 Backup original está em: $BACKUP_DIR"
fi

echo "✨ Conversão concluída!"
