docker compose up -d --build
sleep 2
curl -k -X POST -H 'Content-Type: application/json' -d '{"name":"-","surname":"-","email":"ad@mail.com","username":"user1","password":"123123"}' https://localhost:5048/user/create
sleep 1
curl -k -X POST -H 'Content-Type: application/json' -d '{"name":"-","surname":"-","email":"us@mail.com","username":"user2","password":"123123"}' https://localhost:5048/user/create

echo -e '\ntamamlandı'