PROJECT=hammerspace

install:
	npm install

dev:
	$(MAKE) up
	$(MAKE) build
	npm run dev

build: 
	npm run build

up:
	docker compose -p $(PROJECT) up -d --remove-orphans

down:
	docker compose -p $(PROJECT) down --remove-orphans

logs:
	docker compose -p $(PROJECT) logs -t -f

reset-database:
	$(MAKE) down
	sudo rm -d -r -f ./mongo-data

reset-dev:
	$(MAKE) reset-database
	$(MAKE) dev
