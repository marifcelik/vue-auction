# kartaca software case / backend

Arka yüz, açık arttırma projesi için WebSocket Server ve API görevini üstlenmektedir. Veritabanı bağlantısı için MongoDB, oturum bilgilerinin saklanması için de Redis kullanılmıştır. Dil ve framework olarak Node.js (TypeScript) ve Express kullanılmıştır.
  
Kullanılan Tech stack:
* Node.js / Express
* TypeScript
* MongoDB / Mongoose
* Redis
* ws

Uygulama çalıştığı andan itibaren COUNTDOWN ortam değişkeninde verilen süreden itibaren geri sayıma başlar ve bunu istemciye iletir. 

## Kullanım
Projeyi yerel olarak test etmek için;

```sh
pnpm i
pnpm start:dev
```
komutlarını çalıştırabilirsiniz. Sunucu, varsayılan olarak `5048` portunu dinlemeye başlar.

> Sunucunun doğru çalışabilmesi için MongoDB veritabanının `27017` portunu ve Redis veritabanının `6379` portunu kullanarak çalışması gerekiyor.


<br />

## Dockerfile
Sunucu tarafında `node:19.7-alpine` imajını kullanarak ayağa kalkmaktadır.
> Aslında, build aldıktan sonra `gcr.io/distroless/nodejs:18-amd64` imajını kullanacaktım. Ancak WebSocket isteklerini karşılamada hata fırlattığı için klasik node imajına geri döndüm.

## API

| Endpoint              | Auth | HTTP Method | Argümanlar                                         | Açıklama                                                               |
| --------------------- | ---- | ----------- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| /product/             | ✔    | GET         | -                                                  | Tüm ürünleri döndürür                                                  |
| /product/:prodId      | ✔    | GET         | -                                                  | Verilen `prodId`'ye sahip ürünü döndürür                               |
| /user/create          |      | POST        | `name`, `surname`, `email`, `username`, `password` | Kullanıcı oluşturur                                                    |
| /user/get             | ✔    | GET         | -                                                  | Tüm kullanıcıları döndürür                                             |
| /auth/login           |      | POST        | `username`, `password`                             | Kullanıcı girişi yapar                                                 |
| /auth/logout          | ✔    | POST        | -                                                  | Kullanıcı çıkışı yapar                                                 |
| /auth/check           | ✔    | GET         | -                                                  | Kullanıcının giriş yapıp yapmadığını kontrol eder                      |
| /bid/create           | ✔    | POST        | `userId`, `productId`, `price`                     | Yeni bir teklif oluşturur                                              |
| /bid/get/p/:productId | ✔    | GET         | -                                                  | Verilen `productId`'ye sahip tüm teklifleri döndürür                   |
| /bid/get/u/:userId    | ✔    | GET         | -                                                  | Verilen `userId`'ye sahip kullanıcının yaptığı tüm teklifleri döndürür |

<br />

## Ortam Değişkenleri

<br />

| Değer         | Açıklama                                                                                    | Varsayılan                                      |
| ------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| ORIGIN        | Uygulamanın kabul edeceği kaynak adresleri (aralarında bir boşluk olacak şekilde) belirler. | `https://localhost:5173 https://localhost:7073` |
| HOST          | Uygulamanın çalışacağı ana bilgisayar adını belirler.                                       | `localhost`                                     |
| PORT          | Uygulamanın dinleyeceği port numarasını belirler.                                           | `5048`                                          |
| DB            | Kullanılacak veritabanının adını belirler.                                                  | `kartaca`                                       |
| DB_HOST       | Veritabanı sunucusunun adresini belirler.                                                   | `127.0.0.1`                                     |
| DB_PORT       | Veritabanı sunucusunun port numarasını belirler.                                            | `27017`                                         |
| DB_CONN_STR   | Veritabanı bağlantı dizgisini belirler.                                                     | `mongodb://${DB_HOST}:${DB_PORT}/${DB}`         |
| REDIS_HOST    | Redis sunucusunun adresini belirler.                                                        | `localhost`                                     |
| REDIS_PORT    | Redis sunucusunun port numarasını belirler.                                                 | `6379`                                          |
| SECRET        | Kullanılacak oturum kimlik bilgisi gizli anahtarını belirler.                               | `do not use secret like this`                   |
| COOKIE_NAME   | Oturum kimlik bilgisinin çerez adını belirler.                                              | `sessionid`                                     |
| COOKIE_MAXAGE | Oturum kimlik bilgisinin çerez ömrünü belirler. (ms cinsinden)                              | `1000 * 60 * 60 * 24` (1 gün)                   |
| COUNTDOWN     | Oturum zaman aşımı süresini belirler (saniye cinsinden).                                    | `300`                                           |
