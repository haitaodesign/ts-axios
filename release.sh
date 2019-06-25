#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION
read # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."


  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish

  npm publish

  fi
