.PHONY: build
build:
	docker-compose build
	docker-compose run backend rails db:migrate db:seed

.PHONY: start
start:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose down
