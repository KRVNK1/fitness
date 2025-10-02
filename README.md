## Установка

composer install
npm install
cp .env.example .env (заполнить последние два поля)
php artisan key:generate
php artisan migrate:fresh --seed

## Запуск

php artisan serve
npm run dev