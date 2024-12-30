printf '\nremoving containers if present\n\n'
docker-compose down -v

printf '\ncreating containers\n\n'
docker-compose up -d

printf '\nrestarting app container\n'
Start-Sleep 30
docker restart app-service

docker-compose ps