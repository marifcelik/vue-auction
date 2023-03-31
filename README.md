# Software Case

Merhaba. Bu proje, bir açık artırma web uygulamasıdır. Node.js ve Vue.js kullanılarak geliştirilmiştir. Kullanıcıların üyelik yapabileceği, oturum açıp kapatabileceği ve teklifleri canlı olarak takip edebileceği bir yapıdadır. Uygulama çalıştırıldığında ortam değişkeni olarak verilen süreden (varsayılan 5 dakika) geri sayıma başlar. Kullanıcılara fiyat verebileceği 3 adet statik ürün sunar.

## Kurulum
### Container
Dockerfile ile ayrı ayrı containerlar halinde çalıştırmak için;
```sh
# backend
cd backend
docker build -t backend .
docker run --rm -d -p 5048:5048 --name server backend

# frontend
cd frontend
docker build -t frontend .
docker run --rm -d -p 5173:80 --name client frontend
```
> Back-end in çalışabilmesi için MongoDB ve Redis containerlarının varsayılan portlarda ayağa kalkmış olması gerekiyor.

<br />

### docker compose
Öncelikle, `docker-compose.yml` dosyasının bulunduğu, uygulamanın ana dizinine gitmelisiniz.
```sh
docker compose up
```
komutu ile containerları ayağa kaldırabilirsiniz. Gerekli ortam değişkenleri yml dosyasının içine dahil edilmiştir.

## Bir adım daha var !
Kullanıcı oturum bilgisinin, tarayıcı üzerinde `sessionid` adlı cookie ile iletilmesi ve tarayıcıların bu cookileri sadece https üzerinden kabul etmesi nedeniyle back-end ve front-end tarafında SSL kullanmam gerekti. Kullandığım sertifika doğrulanmış bir sertifika olmadığı için tarayıcılar sunucu-istemci arasındaki haberleşmeyi engelleyebiliyor. 

Bunun önüne geçmek için Google Chrome' da `chrome://flags/#allow-insecure-localhost` adresinden ilgili ayarın açılması gerekmekte.  
Firefox' ta bu işlem şu şekilde yapılabilir :
* Uygulama Menüsü > Ayarlar > Gizlilik & Güvenlik
* Güvenlik > Sertifikalar > Sertifikaları Göster
* Sunucular > Ayrıcalık Tanı
* *Sunucu adresini girin (https://localhost:5048)* > Sertifikayı Al
* Güvenlik ayrıcalığını doğrula

> SSL sertifikası olmadan tarayıcının cookie yi kabul etmesi mümkün değil. Oturum bilgisini LocalStroge' de tutmak doğru bir yöntem olmadığı için bu ek yapılandırma gerekti.

Bu adımlardan sonra uygulama https://localhost:7073 adresinde çalışacaktır. 
<br />
<br />

#### registrationKey: 4f6d4d38e0d5a4c387339c62a60766f7eca4ca9c2a4418c1e8049e3691942453