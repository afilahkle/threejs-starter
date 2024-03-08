import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const mouse = {
  x: 0,
  y: 0,
};

const vertexShader = `
  void main() {
        gl_Position = vec4( position, 1.0 );
    }
`;

const fragmentShader = `
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;

  void main() {
      vec2 st = gl_FragCoord.xy/uResolution.xy;
      gl_FragColor=vec4(st.x, st.y,0.0,1.0);
  }
`;

const uniforms = {
  uTime: { value: 1.0 },
  uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
  uResolution: {
    value: new THREE.Vector2(sizes.width, sizes.height),
  },
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

  const geometry = new THREE.PlaneGeometry(2, 2);
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });
  const mesh = new THREE.Mesh(geometry, material);

  const controls = new OrbitControls(camera, canvas);

  scene.add(mesh);

  onresize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    material.uniforms.uResolution.value.x = renderer.domElement.width;
    material.uniforms.uResolution.value.y = renderer.domElement.height;
    material.uniforms.uMouse.value.x = mouse.x;
    material.uniforms.uMouse.value.y = mouse.y;
  };

  onmousemove = (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  };

  const animate = () => {
    controls.update();
    requestAnimationFrame(animate);
    material.uniforms.uTime.value += new THREE.Clock().getDelta();
    renderer.render(scene, camera);
  };

  animate();
};

const canvas = document.querySelector('#app');
if (canvas) {
  initThreeJsScene(canvas);
}
