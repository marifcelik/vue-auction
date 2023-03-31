# kartaca software case / backend

## Kullanım
> Sunucunun doğru çalışabilmesi için MongoDB veritabanının `27017` portunu ve Redis veritabanının `6379` portunu kullanarak çalışması gerekiyor.

Projeyi yerel olarak test etmek için;
```sh
pnpm i
pnpm start:dev
```
komutlarını çalıştırabilirsiniz. Sunucu varsayılan olarak `5048` portunu dinlemeye başlar.

### config
<br />

| Değer        | Açıklama                                                     | Varsayılan                  |
|--------------|--------------------------------------------------------------|---------------------------|
| ORIGIN       | Uygulamanın kabul edeceği kaynak adresleri (aralarında bir boşluk olacak şekilde) belirler.        | `https://localhost:5173 https://localhost:7073` |
| HOST         | Uygulamanın çalışacağı ana bilgisayar adını belirler.         | `localhost`                |
| PORT         | Uygulamanın dinleyeceği port numarasını belirler.             | `5048`                     |
| DB           | Kullanılacak veritabanının adını belirler.                    | `kartaca`                  |
| DB_HOST      | Veritabanı sunucusunun adresini belirler.                      | `127.0.0.1`                |
| DB_PORT      | Veritabanı sunucusunun port numarasını belirler.               | `27017`                    |
| DB_CONN_STR  | Veritabanı bağlantı dizgisini belirler.            | `mongodb://${DB_HOST}:${DB_PORT}/${DB}` |
| REDIS_HOST   | Redis sunucusunun adresini belirler.                           | `localhost`                |
| REDIS_PORT   | Redis sunucusunun port numarasını belirler.                    | `6379`                     |
| SECRET       | Kullanılacak oturum kimlik bilgisi gizli anahtarını belirler. | `do not use secret like this` |
| COOKIE_NAME  | Oturum kimlik bilgisinin çerez adını belirler.                 | `sessionid`                |
| COOKIE_MAXAGE| Oturum kimlik bilgisinin çerez ömrünü belirler. (ms cinsinden)  | `1000 * 60 * 60 * 24` (1 gün) |
| COUNTDOWN    | Oturum zaman aşımı süresini belirler (saniye cinsinden).        | `300`                      |
