uniform float time;
uniform float progress;
uniform float rotation;
uniform float lineWidth;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec4 resolution;
varying vec2 vUv;
varying vec4 vPosition;

float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
    return step(threshold, value);
  #endif  
}


vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

float line(vec2 uv){
  float u = 0.;

  u = aastep(0.1, uv.x);

  return u;
}


void main() {

  vec2 newUV = gl_FragCoord.xy / resolution.xy;

  newUV = rotate(newUV, rotation);

  //repeat
  newUV = vec2(fract( (newUV.x + newUV.y)*15.),newUV.y);

  gl_FragColor = vec4(vec3(line(newUV)), 1.);
}