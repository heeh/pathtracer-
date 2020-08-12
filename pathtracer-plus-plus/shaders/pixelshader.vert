/*
#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec2 fragCoord;

vec2 positions[4] = vec2[](
    vec2(-1.0, -1.0),
    vec2(1.0, -1.0),
    vec2(-1.0, 1.0),
    vec2(1.0, 1.0)
                           );
void main() {
  gl_Position = vec4(positions[gl_VertexIndex], 0.0, 1.0);
  fragCoord = positions[gl_VertexIndex];
}
*/
