#!/bin/sh
set -e

echo "Aguardando banco de dados..."
until pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER; do
  sleep 2
done

echo "Rodando migrações..."
npm run migration:run

echo "Iniciando a aplicação..."
npm run start:prod
