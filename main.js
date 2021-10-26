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

// Ground
const ground_geometry = new THREE.PlaneGeometry(100,100);
const ground_texture = new THREE.MeshBasicMaterial({color: 0x74b72e});
const ground = new THREE.Mesh(ground_geometry, ground_texture);
ground.rotation.x = THREE.Math.degToRad(-90);
scene.add(ground);

// Origin
const origin_geometry = new THREE.CylinderGeometry( 1, 2, 2, 100 );
const origin_material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} );
const origin = new THREE.Mesh( origin_geometry, origin_material );
scene.add( origin );

// Planet1
const planet_geometry = new THREE.SphereGeometry( 10, 10, 100 );
const planet_texture = new THREE.MeshStandardMaterial( { color: 0xffff00 } )
const planet = new THREE.Mesh(planet_geometry, planet_texture);
planet.translateY(100);
planet.translateZ(-300);
planet.translateX(0);
scene.add(planet)

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0);
//const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(1000,1000);
scene.add(lightHelper, gridHelper); 

const controls = new OrbitControls(camera, renderer.domElement);
controls.rotateSpeed = 0.1;
controls.zoomSpeed = 0.0;
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
        scene.position.z += 0.1;
    } else if (keyCode == 83) {
      scene.position.z -= 0.1;
    } else if (keyCode == 65) {
      scene.position.x += 0.1;
    } else if (keyCode == 68) {
      scene.position.x -= 0.1;
    } else if (keyCode == 32) {
      console.log(scene.position)
    }
};
