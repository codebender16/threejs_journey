import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

/**
 * Particles
 */
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3); // to add vertices to a geometry, we have to add an attribute
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// Material

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true, // if set to false the pixels of the points stay the same during zooming
  //   color: new THREE.Color("#ff88cc"),
  transparent: true,
  alphaMap: particleTexture,
  //   alphaTest: 0.001, // to tell WEBGL when to not render the pixel according to pixel's transparency. This solves the edges issues with particles
  //   depthTest: false, // can cause bugs if there is a different color particle
  depthWrite: false,
  blending: THREE.AdditiveBlending, // will impact performance
  vertexColors: true,
});

// Points

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Test cube
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);
scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // creating a wave animation
  for (let i = 0; i < count; i++) {
    // i3 exists to represent 1 vertex. every loop will loop over 1 vertex at a time.
    const i3 = i * 3;
    // the below code changes the value of the vertices individually. (x,y,z)

    // moving in a wave-like manner
    // const x = particlesGeometry.attributes.position.array[i3];

    // moving up and down
    // const y = particlesGeometry.attributes.position.array[i3 + 1];

    // wave-like manner but facing the front
    // const z = particlesGeometry.attributes.position.array[i3 + 2];

    // animation moves on the y-axis
    // particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
    //   elapsedTime + z
    // );

    // creating a wave-like movement with the particles moving on the x-axis
    const y = particlesGeometry.attributes.position.array[i3 + 1];

    // creating a wave-like movement with the particles moving on the x-axis except its facing the front (z)
    const z = particlesGeometry.attributes.position.array[i3 + 2];

    // animation moves on the x-axis
    particlesGeometry.attributes.position.array[i3] = Math.sin(elapsedTime + z);
  }

  particlesGeometry.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
