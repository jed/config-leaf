# link locally so that `npm run` works correctly
npm link ../config-leaf

# encrypt using the password `cynd1Lauper`
echo "cynd1Lauper" | npm run encrypt

# decrypt using the password `cynd1Lauper`
echo "cynd1Lauper" | npm run decrypt

# diff the two files, and exit with its length
comm -3 config.json config.copy.json | wc -c | exit

# encyrpt using a password stored in the ENV_PW environmental variable
npm run encrypt_env

# decrypt using a password stored in the ENV_PW environmental variable
npm run decrypt_env

# diff the two files, and exit with its length
comm -3 config.json config.copy.json | wc -c | exit
