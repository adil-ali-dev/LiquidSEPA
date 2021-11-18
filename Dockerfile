from node:14

workdir /build
copy . /
copy docker/entrypoint.sh /build
copy docker/.env /build

cmd bash entrypoint.sh


