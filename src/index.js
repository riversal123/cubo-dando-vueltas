import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// console.log(THREE)

const cursor = {
  x: 0,
  y: 0
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.width - 0.5);

  console.log(cursor.x);
});

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0.5, -0.1, 1);
scene.add(mesh);

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblClick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
      // console.log('frgrheg')
    } else if (canvas.webkitrequestFullscreen) {
      canvas.webkitrequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// mesh.scale.set(.5,.5,.5)

// const aspectRatio = sizes.width/sizes.height
const camera = new THREE.PerspectiveCamera(
  95,
  sizes.width / sizes.height,
  0.1,
  100
);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,1,-1,0.1,100)
camera.position.z = 3;

scene.add(camera);

const canvas = document.querySelector(".webgl");
console.log(canvas);

//controls
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  mesh.rotation.y = elapsedTime * Math.PI * 0.5;
  // mesh.postion.y = elapsedTime

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
