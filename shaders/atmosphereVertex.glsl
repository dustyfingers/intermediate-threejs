varying vec3 vertexNormal;

void main() {
    // the normal is the direction this vertex is pointing in 3D space
    // need to normalize vertexNormal passed in to the fragment shader fix bug with backside being more lit than front side!
    // this allows the vertex to be projected onto the 2D screen correctly
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}