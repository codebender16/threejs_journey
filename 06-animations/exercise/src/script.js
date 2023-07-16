import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// animations

// time

// let time = Date.now();

// const tick = () => {
//   console.log("tick");

//   // time

//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   // update the time for the next tick
//   time = currentTime;

//   // update objects

//   mesh.rotation.y += 0.001 * deltaTime; // to revisit this
//   // renderer
//   renderer.render(scene, camera);

//   window.requestAnimationFrame(tick);
// };

// tick();

// Clock

const clock = new THREE.Clock();

// animations

const tick = () => {
  console.log("tick");

  // clock

  const elapsedTime = clock.getElapsedTime();

  // update objects

  mesh.position.y = Math.sin(elapsedTime); // to revisit this
  // renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
