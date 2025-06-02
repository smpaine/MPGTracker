export NODE_OPTIONS=--openssl-legacy-provider
ng build --configuration=production --base-href "/spaine/MPGTracker/" --output-path /usr/local/var/www/vhosts/nameniap.com/spaine/MPGTracker/

cd /usr/local/var/www/vhosts/nameniap.com/spaine/MPGTracker/
chgrp www .htaccess favicon.ico apple-touch-icon.png

