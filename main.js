import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({canvas:document.querySelector("#bg")});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-25,25,25);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// HELPERS AND CONTROLS
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);
// const grid = new THREE.GridHelper(200, 50);
// scene.add(grid);
// const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(10,3,16,100);
// const material = new THREE.MeshStandardMaterial({color: 0xff6357});
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

const earthGeo = new THREE.SphereGeometry(10, 42, 24);
const earthDiffuse = new THREE.TextureLoader().load('./assets/earth/Earth_Diffuse_6K.jpg');
const earthNormal = new THREE.TextureLoader().load('./assets/earth/Earth_NormalNRM_6K.jpg');
const earthMat = new THREE.MeshStandardMaterial({map:earthDiffuse, normalMap:earthNormal});
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.z = 10;
earth.position.x = 15;
earth.position.y = -5;

scene.add(earth);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  star.position.set(x,y,z);
  scene.add(star);
}


function moveCamera() {
  const topOfPage = document.body.getBoundingClientRect().top;
  camera.position.z = (topOfPage * - 0.04) + 30;
  camera.position.x = topOfPage * 0.02;
  camera.rotation.y = topOfPage * -0.0001;
  // camera.position.y += topOfPage * - 0.001;
}

document.body.onscroll = moveCamera;

Array(220).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('./assets/space-bg.avif');
scene.background = spaceTexture;


function animate() {
  requestAnimationFrame(animate);
  
  earth.rotation.y += 0.003;
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate();