import * as THREE from 'three';
import gsap from 'gsap';
import earthVertexShader from './shaders/earthVertex.glsl';
import earthFragmentShader from './shaders/earthFragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

const canvasContainer = document.querySelector('#canvasContainer');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.offsetWidth / canvasContainer.offsetHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    // adding anti-aliasing to renderer helps reduce jagged edges on geometry
    antialias: true,
    canvas: document.querySelector('canvas'),
});

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
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

// add earth meshes to scene
const earthGroup = new THREE.Group();
earthGroup.add(sphere);
// earthGroup.add(atmosphere);
scene.add(earthGroup);

// stars
const starGeometry = new THREE.BufferGeometry();

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    // negative z values go 'in' to the three js scene
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
}
// split star vertices up into groupings of three
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 15;

// mouse representation with normalized values
const mouse = {
    x: undefined,
    y: undefined,
};

const mouseIntertiaCoeff = 0.5;

addEventListener('mousemove', evt => {
    mouse.x = (evt.clientX / innerWidth) * 2 - 1;
    mouse.y = (evt.clientY / innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;
    gsap.to(earthGroup.rotation, {
        x: -mouse.y * mouseIntertiaCoeff,
        y: mouse.x * mouseIntertiaCoeff,
        duration: 1.75,
    });
}
animate();
