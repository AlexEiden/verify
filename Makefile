
clean:
	rm -rf dist client/dist

deps:
	go get ./...
	cd client && yarn install

dev.serve:
	go run server.go

dev.build:
	cd client && NODE_ENV=development webpack -d --progress

dev.build-prod:
	cd client && NODE_ENV=production webpack -p --progress

dev.watch:
	cd client && NODE_ENV=development webpack --watch --progress

dev.start:
	make dev.serve & make dev.watch

build:
	mkdir -p client/dist dist dist/client/dist dist/keys
	
	cd client && NODE_ENV=production webpack -p	
	go build -o dist/server server.go
	
	cp -r client/dist dist/client
	cp -r keys dist

run: 
	cd dist && ./server
