#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(binding = 1) uniform sampler2D texSampler;

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec2 fragTexCoord;
layout(location = 2) in vec3 fragCoord;

layout(location = 0) out vec4 outColor;


vec3 minp = vec3(-1.93, 0.0, 1.92);
vec3 maxp = vec3(1.92, 0.80, 1.93);

float march(vec3 ro, vec3 rd) {
  float t0 = 0.0;
  float t1 = 1000.0;

  float x0, x1, y0, y1, z0, z1;
  x0 = (minp.x - ro.x) / rd.x;
  x1 = (maxp.x - ro.x) / rd.x;
  y0 = (minp.y - ro.y) / rd.y;
  y1 = (maxp.y - ro.y) / rd.y;
  z0 = (minp.z - ro.z) / rd.z;
  z1 = (maxp.z - ro.z) / rd.z;  

  if (x0 > x1) {
    float temp = x0;
    x0 = x1;
    x1 = temp;
  }
  if (y0 > y1) {
    float temp = y0;
    y0 = y1;
    y1 = temp;
  }
  if (z0 > z1) {
    float temp = z0;
    z0 = z1;
    z1 = temp;
  }

  // Now we have (min,max) pairs
  float t0_cand = x0 > y0? (x0 > z0? x0 : z0) : (y0 > z0? y0 : z0);  // Want to get maximum of three
  float t1_cand = x1 < y1? (x1 < z1? x1 : z1) : (y1 < z1? y1 : z1);  // Want to get minimum of three

  if (t0_cand <= t1_cand) {
    t0 = t0_cand;
    t1 = t1_cand;
  }
  
  float endT = t1;
  float t = 0.0;
//  vec4 c = texture(texSampler, fragTexCoord);  
  while (t <= endT) {
    vec3 p = ro + rd * t;
    p = round(p * 100.0) / 100.0;
    // add intersection logic
    t += 0.1;
  }
  return 0.0;
}

//texture(texSampler, fragTexCoord);


float getLight(vec3 p) {
    vec3 lightPos = vec3(0, 1.0, 0.0);
  
    vec3 l = normalize(lightPos-p);
    vec3 n = getNormal(p);
    
    float dif = clamp(dot(n, l), 0., 1.);
    float d = RayMarch(p+n*SURF_DIST*2., l);
    if(d<length(lightPos-p)) dif *= .1;
    
    return dif;
}


void main() {
  //outColor = vec4(0.0,0.0,1.0, 1.0);
  //outColor = vec4(fragColor, 1.0);
  vec3 ro = vec3(0.5f, 0.0f, -2.0f);  // eye pos
  vec3 rd = normalize(vec3(fragCoord.x, fragCoord.y, 1.0));  // eye dir
  float d = march(ro, rd);
  float diffuse = getLight();
  
  outColor = texture(texSampler, fragTexCoord) + vec4(diffuse);
}
