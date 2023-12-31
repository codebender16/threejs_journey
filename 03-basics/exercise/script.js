// scene
const scene = new THREE.Scene();

// red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// aspect ratio
const sizes = {
  width: 800,
  height: 600,
};

// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
