varying vec2 vertexUv;

void main() {
    // if this 3d geometry was mapped onto a plane - what would the coorinates of this vertex be on that plane?
    // that is what the passed in uv value stores
    // we are passing it into the frag shader through a varying
    vertexUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}