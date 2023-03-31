## Ön Yüz / Front-end

Ön Yüz, Vue.js çatısı ve Vite aracı kullanılarak yazılmıştır. Stil işlemleri için TailwindCSS ve DaisyUI kullanılmıştır.

Tech Stack:

- Vue 3 (JavaScript)
- Vue Router
- Vuelidate
- TailwindCSS
- DaisyUI
- AutoAnimate

## Kullanım

Projeyi yerel olarak test etmek için;

```sh
pnpm i
pnpm run dev
```

komutlarını çalıştırabilirsiniz. Varsayılan olarak `5173` portunda çalışacak, sunucuya `5048` portunda istek atacaktır.

## Dockerfile
Uygulamayı, docker imajına çevirmek için, builder olarak `node:19.7-alpine`, sunucuya sunmak için `nginx:stable-alpine` imajlarını kullandım. 
Gerekli nginx konfigürasyonlarınıda imaj içine dahil ettim ve http' den https' e yönlendirme gerçekleştirdim.

## Adresler

| Endpoint      | Auth | Açıklama                      |
| ------------- | ---- | ----------------------------- |
| /             |      | Ana sayfa                     |
| /login        |      | Kullanıcı girişi              |
| /logout       | ✔    | Kullanıcı çıkışı              |
| /register     |      | Kullanıcı kaydı               |
| /products     | ✔    | Tüm ürünlerin listesi         |
| /products/:id | ✔    | Belirli ürünün teklif sayfası |
| /\*           |      | 404                           |


## Ortam Değişkenleri 
| Değer            | Açıklama                | Varsayılan          |
| ---------------- | ----------------------- | ------------------- |
| VITE_SERVER_HOST | Sunucunun adresi        | `https://localhost` |
| VITE_SERVER_PORT | Sunucunun port numarası | `5048`              |
