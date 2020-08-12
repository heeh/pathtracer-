#version 450
#extension GL_ARB_separate_shader_objects : enable


layout(binding = 0) uniform UniformBufferObject {
  mat4 model;
  mat4 view;
  mat4 proj;
} ubo;


layout(points) in;
layout(triangle_strip, max_vertices = 12) out;


void AddQuad(vec4 center, vec4 dy, vec4 dx) {
  gl_Position = center + (dx - dy);
  EmitVertex();
  gl_Position = center + (-dx - dy);
  EmitVertex();
  gl_Position = center + (dx + dy);
  EmitVertex();
  gl_Position = center + (-dx + dy);
  EmitVertex();
  EndPrimitive();
}

void main() {
  vec4 center = gl_in[0].gl_Position;

  mat4 mvp = ubo.proj * ubo.view * ubo.model;
  vec4 dx = mvp[0] / 2.0f;
  vec4 dy = mvp[1] / 2.0f;
  vec4 dz = mvp[2] / 2.0f;
  
  AddQuad(center + dx, dy, dz);
  AddQuad(center - dx, dz, dy);
  AddQuad(center + dy, dz, dx);
  AddQuad(center - dy, dx, dz);
  AddQuad(center + dz, dx, dy);
  AddQuad(center - dz, dy, dx);
}
