#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;

layout(location = 0) out vec4 outColor;

void main() {
    outColor = texture(texSampler, fragTexCoord);
}




/*
#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 0) uniform UniformBufferObject {
  int width;
  int height;
  float iTime;
};


layout(location = 0) in vec2 fragCoord;
layout(location = 0) out vec4 fragColor;


#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .01


float GetDist(vec3 p) {
  vec4 s = vec4(0, 1, 6, 1);
  float sphereDist =  length(p-s.xyz)-s.w;
  float planeDist = p.y;
  float d = min(sphereDist, planeDist);
  return d;
}

float RayMarch(vec3 ro, vec3 rd) {
  float dO=0.;
  for(int i=0; i<MAX_STEPS; i++) {
    vec3 p = ro + rd*dO;
    float dS = GetDist(p);
    dO += dS;
    if(dO>MAX_DIST || dS<SURF_DIST) break;
  }
  return dO;
}

vec2 iResolution = vec2(600.0, 600.0);

void main()
{
  vec2 uv = vec2(fragCoord.x, -fragCoord.y);
  vec3 col = vec3(0);
  vec3 ro = vec3(0, 1, 0);
  vec3 rd = normalize(vec3(uv.x, uv.y, 1));
  float d = RayMarch(ro, rd);
  col = vec3(d);
  col /= 7.;
  fragColor = vec4(col,1.0);
}
*/
