uniform sampler2D globeTexture;

varying vec2 vertexUv;

void main() {
    gl_FragColor = vec4(texture2D(globeTexture, vertexUv));
}