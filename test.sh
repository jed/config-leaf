# link locally so that `npm run` works correctly
npm link ../config-leaf

# encrypt using the password `cynd1Lauper`
echo "cynd1Lauper" | npm run encrypt

sleep 1

# decrypt using the password `cynd1Lauper`
echo "cynd1Lauper" | npm run decrypt

sleep 1

# diff the two files, and exit with its length
comm -3 config.json config.copy.json | wc -c | exit
