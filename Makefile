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

.PHONY: backend-test
backend-test:
	docker-compose run backend rspec

.PHONY: frontend-test
frontend-test:
	docker-compose run frontend yarn test --coverage --watchAll=false
