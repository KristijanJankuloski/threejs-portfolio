import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({canvas:document.querySelector("#bg")});

const directLight = new THREE.DirectionalLight(0xffffff);
directLight.position.z = 100;
directLight.position.x = -120;
directLight.position.y = 15;
scene.add(directLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientLight);

// HELPERS AND CONTROLS
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);
const dirHelper = new THREE.DirectionalLightHelper(directLight);
scene.add(dirHelper);
const grid = new THREE.GridHelper(200, 50);
scene.add(grid);
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const earthGeo = new THREE.SphereGeometry(12, 42, 24);
const earthDiffuse = new THREE.TextureLoader().load('./assets/earth/Earth_Diffuse_6K.jpg');
const earthNormal = new THREE.TextureLoader().load('./assets/earth/Earth_NormalNRM_6K.jpg');
const earthMat = new THREE.MeshStandardMaterial({map:earthDiffuse, normalMap:earthNormal});
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.z = 10;
earth.position.x = 15;
earth.position.y = -5;
scene.add(earth);

const earthAtmos = new THREE.SphereGeometry(12.1, 42, 24);
const atmosMat = new THREE.MeshStandardMaterial({color:'#05cbf7',transparent:true, opacity:0.2});
const atmosphere = new THREE.Mesh(earthAtmos, atmosMat);
atmosphere.position.z = 10;
atmosphere.position.x = 15;
atmosphere.position.y = -5;
scene.add(atmosphere);

const moonGeo = new THREE.SphereGeometry(6, 42, 24);
const moonDiffuse = new THREE.TextureLoader().load('./assets/moon/moon_diffuse.jpg');
const moonNormal = new THREE.TextureLoader().load('./assets/moon/moon_normal.jpg');
const moonMat = new THREE.MeshStandardMaterial({map:moonDiffuse, normalMap:moonNormal});
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.z = 120;
moon.position.x = -40;
scene.add(moon);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// ADD ROCKET
const objLoader = new OBJLoader();


// function moveCamera() {
//   const topOfPage = document.body.getBoundingClientRect().top;
//   camera.position.z = (topOfPage * - 0.06) + 30;
//   camera.position.x = topOfPage * 0.02;
//   camera.rotation.y = topOfPage * -0.0001;
//   // camera.position.y += topOfPage * - 0.001;
// }
// document.body.onscroll = moveCamera;

const spaceTexture = new THREE.TextureLoader().load('./assets/space-bg.avif');
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);
  
  earth.rotation.y += 0.002;
  moon.rotation.y += 0.003;
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();