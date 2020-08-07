SRCROOT = "/Users/heeh/Projects/CS184/pathtracer-plus-plus/pathtracer-plus-plus/"
TARGET_BUILD_DIR = ""
CONTENTS_FOLDER_PATH = ""

cd $SRCROOT/Shaders
/usr/local/bin/glslangValidator -V shader.vert
/usr/local/bin/glslangValidator -V shader.frag

mkdir $TARGET_BUILD_DIR/$CONTENTS_FOLDER_PATH/Shaders
mv vert.spv $TARGET_BUILD_DIR/$CONTENTS_FOLDER_PATH/Shaders/vert.spv
mv frag.spv $TARGET_BUILD_DIR/$CONTENTS_FOLDER_PATH/Shaders/frag.spv
