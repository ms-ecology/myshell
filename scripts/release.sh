if [ -z "$1" ]; then
  type='patch'
else
  type=$1
fi

npm version $type -m '[release] '$type': @%s' && git push # use github-action to publish