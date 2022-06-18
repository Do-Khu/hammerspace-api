PROJECT=hammerspace

install:
	npm install
dev:
	$(MAKE) up
	$(MAKE) build
	npm run dev
build: 
	npm run build
reset-database:
	rm -d -r -f ./mongo-data
up:
	docker compose -p $(PROJECT) up -d

down:
	docker compose -p $(PROJECT) down --remove-orphans

logs:
	docker compose -p $(PROJECT) logs -t -f

