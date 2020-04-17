git config --local user.name "$GIT_USERNAME"
git config --local user.email "$GIT_EMAIL"
git log --format=%h -1
export TRAVIS_TAG=${TRAVIS_TAG:-$(git log --format=%h -1)}
docker build -t $DOCKER_USERNAME/front-end:$TRAVIS_TAG .
docker push $DOCKER_USERNAME/front-end:$TRAVIS_TAG