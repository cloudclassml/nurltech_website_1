cp build_tmp/*.zip build_tmp/blocksy.zip

SSH_PATH="$HOME/.ssh"

mkdir -p "$SSH_PATH"
touch "$SSH_PATH/known_hosts"

chmod 700 "$SSH_PATH"
chmod 600 "$SSH_PATH/known_hosts"

ssh-add "$SSH_PATH/deploy_key"

ssh-keyscan -t rsa demo.creativethemes.com >> "$SSH_PATH/known_hosts"

scp ./build_tmp/blocksy.zip root@demo.creativethemes.com:/var/www/html/ci

ssh root@demo.creativethemes.com <<ENDSSH
cd /var/www/html/ci
ls
mkdir -p $(git rev-parse HEAD)
cd $(git rev-parse HEAD)
wp core download --allow-root
mysql -u root -e "create database ci$(git rev-parse HEAD)"
wp core config --dbhost=localhost --dbname=ci$(git rev-parse HEAD) --dbuser=root --dbpass="\$(cat ~/.dbpass)" --allow-root
wp core install --title="Happy debugging!" --admin_user="admin" --admin_password="123" --admin_email="email@email.com" --skip-email --url="https://demo.creativethemes.com/ci/$(git rev-parse HEAD)/" --allow-root
mv ../blocksy.zip wp-content/themes
cd wp-content/themes
unzip blocksy.zip
rm blocksy.zip
wp theme activate blocksy --allow-root
cd ../plugins
wget http://creativethemes.com/downloads/blocksy-companion.zip
unzip blocksy-companion.zip
rm blocksy-companion.zip
wp plugin activate blocksy-companion --allow-root
wp blocksy demo plugins --allow-root
wp blocksy demo options --allow-root
wp blocksy demo widgets --allow-root
wp blocksy demo content --allow-root
ENDSSH

echo "Created: https://demo.creativethemes.com/ci/$(git rev-parse HEAD)"
