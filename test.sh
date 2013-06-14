# link locally so that `npm run` works correctly
npm link ../config-leaf

# encrypt using the password `cynd1Lauper`
echo "cynd1Lauper\n" | npm run encrypt

# decrypt using the password `cynd1Lauper`
echo "cynd1Lauper\n" | npm run decrypt

# diff the two files, and exit with its length
comm -3 config.json config.copy.json | wc -c | exit
