run:
	cd js && yarn build
	cp -R js/build/* src/web/
	cargo run

run_frontend:
	cd js && yarn dev

run_backend:
	cargo run