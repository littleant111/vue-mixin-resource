local:
	npm run dev

build:
	npm run build
	sed -i 's/_.*_/_$(shell date +%s)_/g' public/index.html
