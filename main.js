import * as THREE from 'three';

import earthVertexShader from './shaders/earthVertex.glsl';
import earthFragmentShader from './shaders/earthFragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const canvasContainer = document.querySelector('#canvasContainer');

const renderer = new THREE.WebGLRenderer({
    // adding anti-aliasing to renderer helps reduce jagged edges on geometry
    antialias: true,
    canvas: document.querySelector('canvas'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
// matching the devices pixel ratio also helps produce the highest resolution image possible
renderer.setPixelRatio(window.devicePixelRatio);

// create a sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        5, // radius
        50, // # of width segments
        50 // # of height segments
    ),
    new THREE.ShaderMaterial({
        vertexShader: earthVertexShader,
        fragmentShader: earthFragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('./img/globe_uv.jpg'),
            },
        },
    })
);

// add to scene
scene.add(sphere);

// create a sphere
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        5, // radius
        50, // # of width segments
        50 // # of height segments
    ),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1);

// add to scene
scene.add(atmosphere);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.01;
}
animate();
