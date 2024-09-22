Set-Locatioin '~/desktop/quizstar-portal/compose'
printf '\nremoving containers if present\n\n'
docker-compose -f docker-compose.yml down -v
printf '\ncreating containers\n\n'
docker-compose -f docker-compose.yml up -d
Start-Sleep 20
printf '\nrestarting app container\n'
docker restart app-service
docker-compose ps