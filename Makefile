run:
	cd js && yarn build
	cp -R js/build src/web
	cargo run