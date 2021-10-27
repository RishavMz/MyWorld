import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// VARIABLES

const WALK_SPEED = 1;
const BORDER_LIMIT = 128;
const BORDER = 10;
const trees = [];
const projects = [];
const mountain = [];

// Objects

class ProjectCylinder{
  constructor(sceneBG){
    this.data = new THREE.Mesh( new THREE.CylinderGeometry( 0.1, 1, 4, 100 ), new THREE.MeshBasicMaterial( {map: pillar_image} ) );
    this.ball = new THREE.Mesh( new THREE.SphereGeometry(1, 50, 10), new THREE.MeshBasicMaterial( {map: radiate_ball} ) );
    sceneBG.add(this.data);
    sceneBG.add(this.ball);
    this.ball.translateY(2);
  }
  changeX(pos) {  this.data.position.x += pos;  this.ball.position.x += pos; }
  changeY(pos) {  this.data.position.y += pos;  this.ball.position.y += pos; }
  changeZ(pos) {  this.data.position.z += pos;  this.ball.position.z += pos; }
}

class Tree{
  constructor(sceneBG){
    this.bark = new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0.4, 4, 100 ), new THREE.MeshBasicMaterial( {map: tree_image1} ) );
    this.branch1 = new THREE.Mesh( new THREE.CylinderGeometry( 0.1, 0.1, 1, 100 ), new THREE.MeshBasicMaterial( {map: tree_image1} ) );
    this.branch2 = new THREE.Mesh( new THREE.CylinderGeometry( 0.1, 0.1, 1, 100 ), new THREE.MeshBasicMaterial( {map: tree_image1} ) );
    this.branch3 = new THREE.Mesh( new THREE.CylinderGeometry( 0.1, 0.1, 1, 100 ), new THREE.MeshBasicMaterial( {map: tree_image1} ) );
    this.branch4 = new THREE.Mesh( new THREE.CylinderGeometry( 0.1, 0.1, 1, 100 ), new THREE.MeshBasicMaterial( {map: tree_image1} ) );
    this.branch1.translateY(1.5);
    this.branch2.translateY(1.5);
    this.branch3.translateY(1.5);
    this.branch4.translateY(1.5);
    this.branch1.translateX(0.2);
    this.branch2.translateX(-0.2);
    this.branch3.translateZ(0.2);
    this.branch4.translateZ(-0.2);
    this.branch1.rotation.z = -22.5;
    this.branch2.rotation.z = 22.5;
    this.branch3.rotation.x = 22.5;
    this.branch4.rotation.x = -22.5;
    this.top = new THREE.Mesh( new THREE.SphereGeometry( 0.8, 10, 10), new THREE.MeshBasicMaterial( {map: tree_image2} ) );
    this.top1 = new THREE.Mesh( new THREE.SphereGeometry( 0.8, 10, 10), new THREE.MeshBasicMaterial( {map: tree_image2} ) );
    this.top2 = new THREE.Mesh( new THREE.SphereGeometry( 0.8, 10, 10), new THREE.MeshBasicMaterial( {map: tree_image2} ) );
    this.top3 = new THREE.Mesh( new THREE.SphereGeometry( 0.8, 10, 10), new THREE.MeshBasicMaterial( {map: tree_image2} ) );
    this.top4 = new THREE.Mesh( new THREE.SphereGeometry( 0.8, 10, 10), new THREE.MeshBasicMaterial( {map: tree_image2} ) );
    this.top.position.y += 2.8;
    this.top1.position.x += 0.5;
    this.top2.position.x -= 0.5;
    this.top3.position.z += 0.5;
    this.top4.position.z -= 0.5;
    this.top1.position.y += 2.5;
    this.top2.position.y += 2.5;
    this.top3.position.y += 2.5;
    this.top4.position.y += 2.5;
    sceneBG.add(this.bark);
    sceneBG.add(this.branch1);
    sceneBG.add(this.branch2);
    sceneBG.add(this.branch3);
    sceneBG.add(this.branch4);
    sceneBG.add(this.top);
    sceneBG.add(this.top1);
    sceneBG.add(this.top2);
    sceneBG.add(this.top3);
    sceneBG.add(this.top4);
  }changeX(pos) {
    this.top.position.x += pos;
    this.top1.position.x += pos;
    this.top2.position.x += pos;
    this.top3.position.x += pos;
    this.top4.position.x += pos;
    this.bark.position.x += pos;
    this.branch1.position.x += pos;
    this.branch2.position.x += pos;
    this.branch3.position.x += pos;
    this.branch4.position.x += pos;
  }
  changeY(pos) {
    this.top.position.y += pos;
    this.top1.position.y += pos;
    this.top2.position.y += pos;
    this.top3.position.y += pos;
    this.top4.position.y += pos;
    this.bark.position.y += pos; 
    this.branch1.position.y += pos;
    this.branch2.position.y += pos;
    this.branch3.position.y += pos;
    this.branch4.position.y += pos;
  }
  changeZ(pos) {
    this.top.position.z += pos;
    this.top1.position.z += pos;
    this.top2.position.z += pos;
    this.top3.position.z += pos;
    this.top4.position.z += pos;
    this.bark.position.z += pos;
    this.branch1.position.z += pos;
    this.branch2.position.z += pos;
    this.branch3.position.z += pos;
    this.branch4.position.z += pos;
  }
}

class Mountain{
  constructor(sceneBG){
    this.data =  new THREE.Mesh( new THREE.ConeGeometry( 20, 16, 10 ), new THREE.MeshBasicMaterial( {map: mountain_image} ) );
    sceneBG.add( this.data );
  }
}

const projectData = [
  {
    "id": 1,
    "posx": 10,
    "posz": 13,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/discordbot.png",
    "title": "Discord bot for Competitive Programming",
    "details": "<ul><li>A discord bot developed using discord.py module to notify members about upcoming contests.</li><li> Provides custom rank list based on peers whose handles are added to database.</li><li> Deployed the application using Heroku.</li></ul>"
  },
  {
    "id": 2,
    "posx": 20,
    "posz": 13,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/image2pdf.png",
    "title": "Image to PDF Converter",
    "details": "<ul><li>GUI based desktop application which allows user to select some images and add them to a PDF file.</li><li>Used Python for making API calls and backend tasks, while used C++ to develop an interactive GUI</li><li> Used python-docx and docx2pdf modules which use the Microsoft Office API.</li></ul>"
  },
  {
    "id": 3,
    "posx": 10,
    "posz": 23,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/ieesb.png",
    "title": "IEEE SB Website",
    "details": "<ul><li>Worked in a team to develop IEEE student branch website for our institute using MERN stack.</li><li>Dedicated admin section provided to dynamically modify all the visible contents of the website.</li></ul>"
  },
  {
    "id": 4,
    "posx": 20,
    "posz": 23,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/opencodecompete.png",
    "title": "OpenCodeCompete",
    "details": "<ul><li>Web Application developed using PERN stack where users solve problems by using some code.</li><li> Integrated CI/CD for this application using Vercel.</li></ul>"
  },
  {
    "id": 5,
    "posx": 10,
    "posz": 33,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/hoodieshopping.png",
    "title": "Hoodie Whopping Website",
    "details": "<ul><li>A Web based application which allows customers to select a product of their choice from a list of items.</li><li>Developen this application using PHP as backend and MySQL database</li></ul> "
  },
  {
    "id": 6,
    "posx": 20,
    "posz": 33,
    "rad": 2,
    "image": "",
    "title": "Project6",
    "details": ""
  },
  

]
// SETUP

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(5);                                     // Camera positionZ
camera.position.setY(3);                                      // Camera positionY
renderer.render(scene, camera);

const textureLoader = new THREE.TextureLoader();

// SHAPES

const ground_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/ground1.jpg');
const brick_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/brick.jpg');
const radiate_ball = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/tesseract.jpg');
const pillar_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/pillar1.jpg');
const tree_image1 = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/tree1.jpg');
const tree_image2 = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/tree2.jpg');
const mountain_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/mountain.png');

tree_image2.wrapS = THREE.RepeatWrapping;
tree_image2.wrapT = THREE.RepeatWrapping;
tree_image2.repeat.set(4, 4);

radiate_ball.wrapS = THREE.RepeatWrapping;
radiate_ball.wrapT = THREE.RepeatWrapping;
radiate_ball.repeat.set(4, 4);

mountain_image.wrapS = THREE.RepeatWrapping;
mountain_image.wrapT = THREE.RepeatWrapping;
mountain_image.repeat.set(4, 4);

brick_image.wrapS = THREE.RepeatWrapping;
brick_image.wrapT = THREE.RepeatWrapping;
brick_image.repeat.set(2, 2);

// Ground
const ground = new THREE.Mesh( new THREE.PlaneGeometry(BORDER_LIMIT, BORDER_LIMIT), new THREE.MeshBasicMaterial({map: ground_image}));
ground_image.wrapS = THREE.RepeatWrapping;
ground_image.wrapT = THREE.RepeatWrapping;
ground_image.repeat.set(32, 32);
ground.rotation.x = THREE.Math.degToRad(-90);
scene.add(ground);


// Planet1
const planet = new THREE.Mesh( new THREE.SphereGeometry( 10, 10, 100 ), new THREE.MeshStandardMaterial( { color: 0xffff00 } ));
planet.translateY(100);
planet.translateZ(-300);
planet.translateX(0);
scene.add(planet)

//character
const player = new THREE.Mesh( new THREE.SphereGeometry( 0.3, 0.3, 0.3, 100 ), new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} ) );
player.position.z += 3;
player.position.y += 0.1;
scene.add( player );

// CONTENTS

for(var i=0; i<6; i++){
  projects.push(new ProjectCylinder(scene));
}
var tempprojk = 0;
for(var i=0; i<2; i++){
  for(var j=0; j<3; j++){
    projects[tempprojk].changeX(-10 -10*i);
    projects[tempprojk].changeZ(-10 - 10*j);
    tempprojk++;
  }
}

var temptreek = 0;
for(var i=0; i<48; i++){
    trees.push(new Tree(scene));
}
for(var i=0; i<4; i++){
  for(var j=0; j<4; j++){
    trees[temptreek].changeX( 8+i*12);
    trees[temptreek].changeZ( 8+j*12);
    temptreek++;
  }
}
for(var i=0; i<4; i++){
  for(var j=0; j<4; j++){
    trees[temptreek].changeX( -8-i*12);
    trees[temptreek].changeZ(  8+j*12 );
    temptreek++;
  }
}
for(var i=0; i<4; i++){
  for(var j=0; j<4; j++){
    trees[temptreek].changeX(  8+i*12);
    trees[temptreek].changeZ( -8-j*12);
    temptreek++;
  }
}
for(var i=0; i<6; i++){
  mountain.push(new Mountain(scene));
  mountain[i].data.translateX(i*12);
  mountain[i].data.translateZ(-68);
}
for(var i=6; i<12; i++){
  mountain.push(new Mountain(scene));
  mountain[i].data.translateX(-(i-6)*12);
  mountain[i].data.translateZ(-68);
}
for(var i=12; i<18; i++){
  mountain.push(new Mountain(scene));
  mountain[i].data.translateX(-70);
  mountain[i].data.translateZ((i-12)*12);
}
for(var i=18; i<24; i++){
  mountain.push(new Mountain(scene));
  mountain[i].data.translateX(-70);
  mountain[i].data.translateZ(-(i-18)*12);
}
for(var i=24; i<30; i++){
  mountain.push(new Mountain(scene));
  mountain[i].data.translateX(70);
  mountain[i].data.translateZ((i-24)*12);
}
for(var i=30; i<36; i++){
  mountain.push(new Mountain(scene));
  mountain[i].data.translateX(70);
  mountain[i].data.translateZ(-(i-30)*12);
}

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
  player.rotation.y += 0.05;

  projects.forEach(e => {
    e.ball.rotation.x += 0.1;
    //e.ball.rotation.y += 0.01;
    e.ball.rotation.z += 0.1;
  });

  controls.update();
  renderer.render(scene, camera);
}
animate();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  document.getElementById('pressSpace').style.display = 'none';
    var keyCode = event.which;
    console.log(keyCode)
    if (keyCode == 87 && (scene.position.z<(BORDER_LIMIT-BORDER)/2)) {
        scene.position.z += WALK_SPEED;
        player.position.z -= WALK_SPEED;
    } else if (keyCode == 83 && (scene.position.z>-(BORDER_LIMIT-BORDER)/2)) {
      scene.position.z -= WALK_SPEED;
      player.position.z += WALK_SPEED;
    } else if (keyCode == 65 && (scene.position.x<(BORDER_LIMIT-BORDER)/2)) {
      scene.position.x += WALK_SPEED;
      player.position.x -= WALK_SPEED;
    } else if (keyCode == 68 && (scene.position.x>-(BORDER_LIMIT-BORDER)/2)) {
      scene.position.x -= WALK_SPEED;
      player.position.x += WALK_SPEED;
    } else if (keyCode == 73) {
      if(document.getElementById('bag').style.display === 'none'){
        document.getElementById('bag').style.display = 'block'
      }else {
        document.getElementById('bag').style.display = 'none'
      }
    }  else if (keyCode == 84) {
      if(document.getElementById('tutorial').style.display === 'none'){
        document.getElementById('tutorial').style.display = 'block'
      }else {
        document.getElementById('tutorial').style.display = 'none'
      }
    } else if(keyCode == 32){
      console.log(scene.position)
    }
    // Press Space
  projectData.forEach(e => {
    var dist = Math.sqrt(Math.pow(scene.position.x - e.posx,2)+Math.pow(scene.position.z - e.posz, 2));
    if(dist <= e.rad){
      document.getElementById('pressSpace').style.display = 'block';
      document.getElementById('bagtitle').innerHTML = e.title;
      document.getElementById('bagtext').innerHTML = e.details;
      document.getElementById('bagimage').innerHTML = `<img src="${e.image}" class = "bagimage"/>`;

    }
  });
};
