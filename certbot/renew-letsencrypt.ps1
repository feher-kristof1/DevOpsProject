$ErrorActionPreference = 'Stop'

$frontendDomain = 'feher-kristof1-matchresults-frontend.jcloud.jedlik.cloud'

Write-Host 'Renewing certificates (if due)...'
docker compose run --rm certbot renew --webroot -w /var/www/certbot

Write-Host 'Syncing renewed certificate into ingress/certs...'
docker compose run --rm certbot sh -lc "cp /etc/letsencrypt/live/$frontendDomain/fullchain.pem /etc/nginx/certs/fullchain.pem && cp /etc/letsencrypt/live/$frontendDomain/privkey.pem /etc/nginx/certs/privkey.pem"

Write-Host 'Reloading ingress...'
docker compose exec ingress nginx -s reload

Write-Host 'Renewal flow completed.'
