#!/bin/sh
# make_zip.sh (Person C)
# Makes submission.zip with the page URL and the demo video.
# Usage: ./scripts/make_zip.sh demo.mov

VIDEO="$1"
if [ -z "$VIDEO" ] || [ ! -f "$VIDEO" ]; then
  echo "Usage: ./scripts/make_zip.sh path/to/video"
  exit 1
fi

echo "https://mdieng123.github.io/nypd-white-black-hat/" > url.txt
rm -f submission.zip
zip -j submission.zip url.txt "$VIDEO"
rm url.txt
echo "Made submission.zip"
unzip -l submission.zip
