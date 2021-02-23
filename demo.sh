curl -X POST -H "Content-Type: application/json" -d '{ "url": "https://3919d99b3077.ngrok.io/test1"}' http://localhost:3000/subscribe/topic1
curl -X POST -H "Content-Type: application/json" -d '{ "url": "https://3919d99b3077.ngrok.io/test2"}' http://localhost:3000/subscribe/topic1
curl -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:3000/publish/topic1