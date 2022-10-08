import * as THREE from 'three';

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    // adding anti-aliasing to renderer helps reduce jagged edges on geometry
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// matching the devices pixel ratio also helps produce the highest resolution image possible
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        5, // radius
        50, // # of width segments
        50 // # of height segments
    ),
    // new THREE.MeshBasicMaterial({
    //     // color: 0xff0000
    //     map: new THREE.TextureLoader().load('./img/globe_uv.jpg'),
    // })
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
    })
);

// add to scene
scene.add(sphere);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
