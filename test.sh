npm link ../config-leaf

echo "cynd1Lauper\n" | npm run encrypt
echo "cynd1Lauper\n" | npm run decrypt

comm -3 config.js config.copy.js | wc -c | exit
