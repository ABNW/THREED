uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
varying vec4 vPosition;

float line(vec2 uv){
  float u = 0.;

  u = step(0.1, uv.x);

  return u;
}

void main() {

  vec2 newUV = vUv;
  newUV = vec2(fract(vUv.x*10.),vUv.y);

  gl_FragColor = vec4(vec3(line(newUV)), 1.);
}