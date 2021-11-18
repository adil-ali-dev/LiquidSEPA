
ROOT_FILES=(build/*)
JS_FILES=(build/static/js/*)
ASS_FILES=(build/static/css/*)
FONT_FILES=(build/static/media/*)

for file in "${JS_FILES[@]} ${ASS_FILES[@]} "${FONT_FILES[@]} 
do
   echo "cache -> ${file}"
done
mkdir build
yarn
yarn build

regex="([a-zA-Z_0-9]+)-([0-9a-z]+)\.(.*)"

for file in "${JS_FILES[@]} ${ASS_FILES[@]} "${FONT_FILES[@]} 
do
   if [[ $file =~ $regex ]]
   then
	filename="${BASH_REMATCH[1]}"
	hash="${BASH_REMATCH[2]}"
	ext="${BASH_REMATCH[3]}"

	if test -n "$(find ./build -name "${filname}-[0-9a-z]*\.${ext}" ! -name "${filename}-${hash}*")"
	then
		echo "${file}"
	fi
   fi
done

pwd

ls -la
rm -rf /code/build/*
cp -r * /code/build/

