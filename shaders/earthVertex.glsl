varying vec2 vertexUv;
varying vec3 vertexNormal;

void main() {
    // if this 3d geometry was mapped onto a plane - what would the coorinates of this vertex be on that plane?
    // that is what the passed in uv value stores
    // we are passing it into the frag shader through a varying
    vertexUv = uv;
    // the normal is the direction this vertex is pointing in 3D space
    // need to normalize vertexNormal passed in to the fragment shader ANY time we use a normal
    // this allows the vertex to be projected onto the 2D screen correctly
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}