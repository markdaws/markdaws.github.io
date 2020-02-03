rm -rf output/*
mkdir output/images
cp docs/images/* output/images
asciidoctor -D output docs/index.adoc