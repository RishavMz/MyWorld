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
camera.position.setZ(5);                                     // Camera positionZ
camera.position.setY(1);                                      // Camera positionY
renderer.render(scene, camera);
const textureLoader = new THREE.TextureLoader();

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100,100), 
  new THREE.MeshBasicMaterial({color: 0x74b72e}));
ground.rotation.x = THREE.Math.degToRad(-90);
scene.add(ground);
const base = new THREE.Mesh(
  new THREE.BoxGeometry( 100, 2, 100, 50 ),
  new THREE.MeshBasicMaterial( {color: 0x654321} ) );
base.position.y -= 1.1;
scene.add( base );

// Origin
const origin = new THREE.Mesh( 
  new THREE.CylinderGeometry( 1, 2, 2, 100 ),
  new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} ));
scene.add( origin );

// Planet1
const planet = new THREE.Mesh(
  new THREE.SphereGeometry( 10, 10, 100 ),
  new THREE.MeshStandardMaterial( { color: 0xffff00 } ));
planet.translateY(100);
planet.translateZ(-300);
planet.translateX(0);
scene.add(planet)

//character
const player = new THREE.Mesh(
  new THREE.BoxGeometry( 0.5, 2, 0.5, 50 ),
  new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} ) );
player.position.z += 3;
scene.add( player );

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0);
//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(1000,1000);
//scene.add(lightHelper, gridHelper); 

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.1;
controls.zoomSpeed = 1.0;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

function animate() {
  requestAnimationFrame(animate);

  planet.rotation.x += 0.01;
  planet.rotation.y += 0.005;
  planet.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        scene.position.z += 0.02;
        player.position.z -= 0.02;
    } else if (keyCode == 83) {
      scene.position.z -= 0.02;
      player.position.z += 0.02;
    } else if (keyCode == 65) {
      scene.position.x += 0.02;
      player.position.x -= 0.02;
    } else if (keyCode == 68) {
      scene.position.x -= 0.02;
      player.position.x += 0.02;
    } else if (keyCode == 32) {
      console.log(scene.position)
    }
};
