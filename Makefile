
clean:
	rm -rf dist client/dist

deps:
	go get ./...
	npm install -g webpack webpack-dev-server
	cd client && yarn install

dev.serve-backend:
	PORT=8081 GIN_MODE=debug go run server.go

dev.serve-client:
	cd client && NODE_ENV="dev" webpack-dev-server --progress --inline

dev.start:
	make deps
	make dev.serve-backend & make dev.serve-client

build:
	make deps
	mkdir -p client/dist dist dist/client/dist dist/keys
	
	cd client && NODE_ENV=production webpack -p	
	go build -o dist/server server.go
	
	cp -r client/dist dist/client
	cp -r keys dist

run: 
	cd dist && PORT=8080 GIN_MODE=release ./server
