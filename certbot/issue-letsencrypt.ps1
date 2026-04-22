param(
    [Parameter(Mandatory = $true)]
    [string]$Email
)

$ErrorActionPreference = 'Stop'

$frontendDomain = 'feher-kristof1-matchresults-frontend.jcloud.jedlik.cloud'
$backendDomain = 'feher-kristof1-matchresults-backend.jcloud.jedlik.cloud'

Write-Host 'Ensuring ingress and challenge path are reachable...'
docker compose up -d ingress

docker compose run --rm certbot certonly `
  --webroot -w /var/www/certbot `
  --email $Email --agree-tos --no-eff-email `
  -d $frontendDomain -d $backendDomain

Write-Host 'Installing issued certificate into ingress/certs...'
docker compose run --rm certbot sh -lc "cp /etc/letsencrypt/live/$frontendDomain/fullchain.pem /etc/nginx/certs/fullchain.pem && cp /etc/letsencrypt/live/$frontendDomain/privkey.pem /etc/nginx/certs/privkey.pem"

Write-Host 'Reloading ingress with trusted certificate...'
docker compose exec ingress nginx -s reload

Write-Host 'Done. HTTPS now uses the Let\'s Encrypt certificate.'
