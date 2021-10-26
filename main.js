import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(10);                                     // Camera positionZ
camera.position.setY(2);                                      // Camera positionY
renderer.render(scene, camera);

// Ground
const ground_geometry = new THREE.PlaneGeometry(100,100);
const ground_texture = new THREE.MeshBasicMaterial({color: 0x74b72e});
const ground = new THREE.Mesh(ground_geometry, ground_texture);
ground.rotation.x = THREE.Math.degToRad(-90);
scene.add(ground);

// Planet1
const planet1_geometry = new THREE.SphereGeometry( 10, 10, 100 );
const planet1_texture = new THREE.MeshStandardMaterial( { color: 0xffff00 } )
const planet1 = new THREE.Mesh(planet1_geometry, planet1_texture);
planet1.translateY(100);
planet1.translateZ(-300);
planet1.translateX(0);
scene.add(planet1)

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0);
//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(1000,1000);
scene.add(lightHelper, gridHelper); 

const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);

  planet1.rotation.x += 0.01;
  planet1.rotation.y += 0.005;
  planet1.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);

}

animate();
