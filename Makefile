run-gateway:
	cd api-gateway
	$(MAKE) dev

build-docker:
	docker build . -t api-gateway

up-database:
	cd api-gateway
	$(MAKE) up

run:
	$(MAKE) up-database
	$(MAKE) build-docker
	docker run -p 9152:9152 -d api-gateway:latest