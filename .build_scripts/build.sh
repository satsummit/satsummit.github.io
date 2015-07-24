#!/usr/bin/env bash
set -e # halt script on error

if [ $TRAVIS_PULL_REQUEST = "false" ] && [ $TRAVIS_BRANCH = ${DEPLOY_BRANCH} ]; then
  echo "Building site"
  gulp prod
else
  echo "Not building, so long and thanks for all the fish!"
fi