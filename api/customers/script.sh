

docker build -t $DOCKER_USERNAME/customers:$TRAVIS_TAG .
docker push $DOCKER_USERNAME/customers:$TRAVIS_TAG