import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const initThreeJsScene = (canvas) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);
  canvas.appendChild(renderer.domElement);

  camera.position.z = 5;

  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);

  const controls = new OrbitControls(camera, canvas);

  scene.add(cube);

  onresize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  const animate = () => {
    controls.update();
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();
};

const canvas = document.querySelector('#app');
if (canvas) {
  initThreeJsScene(canvas);
}
