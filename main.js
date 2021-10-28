import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// VARIABLES

const WALK_SPEED = 1;
const BORDER_LIMIT = 128;
const BORDER = 10;
const movement = [];
const object = [];
const noobstacle = [];
const hotspot = [];
const OBJECTDENSITY = 20;
let PLAYER_POSX = BORDER_LIMIT/2;         // POSX, POSZ origin at bottom right ( BORDER_LIMIT, BORDER_LIMIT )
let PLAYER_POSZ = BORDER_LIMIT/2;         // POSX, POSZ origin at bottom right ( BORDER_LIMIT, BORDER_LIMIT )

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

class Rock{
  constructor(sceneBG){
    this.data = new THREE.Mesh( new THREE.CylinderGeometry( 0.5, 1, 1, 20 ), new THREE.MeshBasicMaterial( {map: rock_image} ) );
    sceneBG.add(this.data);
  }
  changeX(pos) {  this.data.position.x += pos;  }
  changeY(pos) {  this.data.position.y += pos;  }
  changeZ(pos) {  this.data.position.z += pos;  }
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
    "id": 0,
    "posx": 20,
    "posz": 20,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/discordbot.png",
    "title": "Discord bot for Competitive Programming",
    "details": "<ul><li>A discord bot developed using discord.py module to notify members about upcoming contests.</li><li> Provides custom rank list based on peers whose handles are added to database.</li><li> Deployed the application using Heroku.</li></ul>"
  },
  {
    "id": 1,
    "posx": 20,
    "posz": 30,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/image2pdf.png",
    "title": "Image to PDF Converter",
    "details": "<ul><li>GUI based desktop application which allows user to select some images and add them to a PDF file.</li><li>Used Python for making API calls and backend tasks, while used C++ to develop an interactive GUI</li><li> Used python-docx and docx2pdf modules which use the Microsoft Office API.</li></ul>"
  },
  {
    "id": 2,
    "posx": 20,
    "posz": 40,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/ieesb.png",
    "title": "IEEE SB Website",
    "details": "<ul><li>Worked in a team to develop IEEE student branch website for our institute using MERN stack.</li><li>Dedicated admin section provided to dynamically modify all the visible contents of the website.</li></ul>"
  },
  {
    "id": 3,
    "posx": 30,
    "posz": 20,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/opencodecompete.png",
    "title": "OpenCodeCompete",
    "details": "<ul><li>Web Application developed using PERN stack where users solve problems by using some code.</li><li> Integrated CI/CD for this application using Vercel.</li></ul>"
  },
  {
    "id": 4,
    "posx": 30,
    "posz": 30,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/hoodieshopping.png",
    "title": "Hoodie Whopping Website",
    "details": "<ul><li>A Web based application which allows customers to select a product of their choice from a list of items.</li><li>Developen this application using PHP as backend and MySQL database</li></ul> "
  },
  {
    "id": 5,
    "posx": 30,
    "posz": 40,
    "rad": 2,
    "image": "",
    "title": "3D Interactive world",
    "details": "<ul><li>A 3D simulated world designed using javascript library three.js</li><li>Contains my personal portfolio in a unique presentation</li><li>Used multiple grids to handle motions, objects etc.</li></ul>"
  },
  {
    "id": 6,
    "posx": 0,
    "posz": 20,
    "rad": 2,
    "image": "https://raw.githubusercontent.com/RishavMz/Mesh/main/images/dp.jpg",
    "title": "RISHAV MAZUMDAR",
    "details": "<ul><li>Rishav Mazumdar currently resides in Dhanbad, Jharkhand and is pursuing his undergraduate in Electronics and Communication Engineering from Indian Institute of Information Technology, Ranchi.</li><br/><li>A passionate Programmer with strong interest towards writing beautiful code to solve a task efficiently.</li><br/><li>Always ready to grasp new skils and learn further to be better in Software and Web Development.</li></ul>"
  },
  
]
// SETUP

for(var i=0; i<BORDER_LIMIT; i++){      // Initialization begins
  let temp = [];
  for(var j=0; j<BORDER_LIMIT; j++){
    temp.push(0);
  }
  movement.push(temp);
}
for(var i=0; i<BORDER_LIMIT; i++){
  let temp = [];
  for(var j=0; j<BORDER_LIMIT; j++){
    temp.push(0);
  }
  object.push(temp);
}   
for(var i=0; i<BORDER_LIMIT; i++){
  let temp = [];
  for(var j=0; j<BORDER_LIMIT; j++){
    temp.push(-1);
  }
  hotspot.push(temp);
}       
for(var i=0; i<BORDER_LIMIT; i++){
  let temp = [];
  for(var j=0; j<BORDER_LIMIT; j++){
    temp.push(0);
  }
  noobstacle.push(temp);
}                                    // Initialization ends

for(let i=0; i<BORDER_LIMIT; i++){        // Limits for playground
  for(let j=0; j<BORDER; j++){
    movement[i][j]=1;
    movement[i][BORDER_LIMIT-1-j]=1;
    movement[j][i]=1;
    movement[BORDER_LIMIT-1-j][i]=1;
  }
}

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

// Images Loaded

const ground_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/ground1.jpg');
const ground_image1 = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/ground2.jpg');
const rock_image = textureLoader.load('./textures/rock.jpg');
const brick_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/brick.jpg');
const radiate_ball = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/tesseract.jpg');
const pillar_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/pillar.jpg');
const tree_image1 = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/tree1.jpg');
const tree_image2 = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/tree2.jpg');
const mountain_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/mountain.png');
const label1_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/label1.jpg');
const label2_image = textureLoader.load('https://raw.githubusercontent.com/RishavMz/Mesh/main/textures/label2.jpg');

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


//character
const player = new THREE.Mesh( new THREE.SphereGeometry( 0.3, 0.3, 0.3, 100 ), new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} ) );
player.position.z += 3;
player.position.y += 0.1;
scene.add( player );

// CONTENTS

projectData.forEach((data)=> {
  object[data.posz+64][data.posx+64] = 1;
  movement[data.posz+64][data.posx+64] = 1;
  hotspot[data.posz+64][data.posx+64] = data.id;
});

const obstacledata = [];
let objid = 0;

function randRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}
function addObstacle(){
  console.log("Adding obstacle")
  for(var i=0; i<OBJECTDENSITY; i++){
    var obposz = randRange(-(BORDER_LIMIT/2-10), (BORDER_LIMIT)/2-10);
    var obposx = randRange(-(BORDER_LIMIT/2-10), (BORDER_LIMIT)/2-10);
    if(noobstacle[obposz+BORDER_LIMIT/2][obposx+BORDER_LIMIT/2] == 0){
      object[obposz+BORDER_LIMIT/2][obposx+BORDER_LIMIT/2] = 2;
      movement[obposz+BORDER_LIMIT/2][obposx+BORDER_LIMIT/2] = 1;
      obstacledata.push(new Tree(scene));
      obstacledata[objid].changeX(-obposx);
      obstacledata[objid].changeZ(3-obposz);
      objid++;
    }
  }
  for(var i=0; i<OBJECTDENSITY; i++){
    var obposz = randRange(-(BORDER_LIMIT-10)/2, (BORDER_LIMIT-10)/2);
    var obposx = randRange(-(BORDER_LIMIT-10)/2, (BORDER_LIMIT-10)/2);
    if(noobstacle[obposz+BORDER_LIMIT/2][obposx+BORDER_LIMIT/2] == 0){
      object[obposz+BORDER_LIMIT/2][obposx+BORDER_LIMIT/2] = 2;
      movement[obposz+BORDER_LIMIT/2][obposx+BORDER_LIMIT/2] = 1;
      obstacledata.push(new Rock(scene));
      obstacledata[objid].changeX(-obposx);
      obstacledata[objid].changeZ(3-obposz);
      objid++;
    }
  }
}

// SHOW Objects
let hots = [];
let hotspotno = 0;
for(var i=0; i<BORDER_LIMIT; i++){
  for(var j=0; j<BORDER_LIMIT; j++){
    if(object[j][i]==1){
      hots.push(new ProjectCylinder(scene));
      hots[hotspotno].changeX(-projectData[hotspot[j][i]].posx);
      hots[hotspotno].changeZ(3-projectData[hotspot[j][i]].posz);
      hotspot[j][i]     = hotspot[j][i];
      hotspot[j][i+1]   = hotspot[j][i];
      hotspot[j][i-1]   = hotspot[j][i];
      hotspot[j+1][i]   = hotspot[j][i];
      hotspot[j-1][i]   = hotspot[j][i];
      hotspot[j+1][i+1] = hotspot[j][i];
      hotspot[j+1][i-1] = hotspot[j][i];
      hotspot[j-1][i+1] = hotspot[j][i];
      hotspot[j-1][i-1] = hotspot[j][i];
      hotspot[j][i+2]   = hotspot[j][i];
      hotspot[j][i-2]   = hotspot[j][i];
      hotspot[j+2][i]   = hotspot[j][i];
      hotspot[j-2][i]   = hotspot[j][i];
      hotspot[j+2][i+2] = hotspot[j][i];
      hotspot[j+2][i-2] = hotspot[j][i];
      hotspot[j-2][i+2] = hotspot[j][i];
      hotspot[j-2][i-2] = hotspot[j][i];
      hotspot[j][i+3]   = hotspot[j][i];
      hotspot[j][i-3]   = hotspot[j][i];
      hotspot[j+3][i]   = hotspot[j][i];
      hotspot[j-3][i]   = hotspot[j][i];
      hotspot[j+3][i+3] = hotspot[j][i];
      hotspot[j+3][i-3] = hotspot[j][i];
      hotspot[j-3][i+3] = hotspot[j][i];
      hotspot[j-3][i-3] = hotspot[j][i];

      noobstacle[j][i]     = 1;
      noobstacle[j][i+1]   = 1;
      noobstacle[j][i-1]   = 1;
      noobstacle[j+1][i]   = 1;
      noobstacle[j-1][i]   = 1;
      noobstacle[j+1][i+1] = 1;
      noobstacle[j+1][i-1] = 1;
      noobstacle[j-1][i+1] = 1;
      noobstacle[j-1][i-1] = 1;
      noobstacle[j][i+2]   = 1;
      noobstacle[j][i-2]   = 1;
      noobstacle[j+2][i]   = 1;
      noobstacle[j-2][i]   = 1;
      noobstacle[j+2][i+2] = 1;
      noobstacle[j+2][i-2] = 1;
      noobstacle[j-2][i+2] = 1;
      noobstacle[j-2][i-2] = 1;
      noobstacle[j][i+3]   = 1;
      noobstacle[j][i-3]   = 1;
      noobstacle[j+3][i]   = 1;
      noobstacle[j-3][i]   = 1;
      noobstacle[j+3][i+3] = 1;
      noobstacle[j+3][i-3] = 1;
      noobstacle[j-3][i+3] = 1;
      noobstacle[j-3][i-3] = 1;
      noobstacle[j][i+4]   = 1;
      noobstacle[j][i-4]   = 1;
      noobstacle[j+4][i]   = 1;
      noobstacle[j-4][i]   = 1;
      noobstacle[j+4][i+4] = 1;
      noobstacle[j+4][i-4] = 1;
      noobstacle[j-4][i+4] = 1;
      noobstacle[j-4][i-4] = 1;
      noobstacle[j][i+5]   = 1;
      noobstacle[j][i-5]   = 1;
      noobstacle[j+5][i]   = 1;
      noobstacle[j-5][i]   = 1;
      noobstacle[j+5][i+5] = 1;
      noobstacle[j+5][i-5] = 1;
      noobstacle[j-5][i+5] = 1;
      noobstacle[j-5][i-5] = 1;
      noobstacle[j][i+6]   = 1;
      noobstacle[j][i-6]   = 1;
      noobstacle[j+6][i]   = 1;
      noobstacle[j-6][i]   = 1;
      noobstacle[j+6][i+6] = 1;
      noobstacle[j+6][i-6] = 1;
      noobstacle[j-6][i+6] = 1;
      noobstacle[j-6][i-6] = 1;
      hotspotno++;
    }
  }
}

const label1 = new THREE.Mesh( new THREE.BoxGeometry(2, 2, 0.1, 1, 1, 1), new THREE.MeshBasicMaterial({map: label1_image}));
label1.translateX(-25);
label1.translateZ(-12);
scene.add(label1);
const label2 = new THREE.Mesh( new THREE.BoxGeometry(2, 2, 0.1, 1, 1, 1), new THREE.MeshBasicMaterial({map: label2_image}));
label2.translateX(0);
label2.translateZ(-12);
scene.add(label2);

const house1 = new THREE.Mesh( new THREE.BoxGeometry(15, 0.1, 25, 1, 1, 1), new THREE.MeshBasicMaterial({map: label1_image}));
house1.translateX(-25);
house1.translateZ(-28);
scene.add(house1);
const house2 = new THREE.Mesh( new THREE.BoxGeometry(5, 0.1, 5, 1, 1, 1), new THREE.MeshBasicMaterial({map: label2_image}));
house2.translateX(0);
house2.translateZ(-18);
scene.add(house2);

addObstacle();

//// Lights
//const pointLight = new THREE.PointLight(0xffffff);
//pointLight.position.set(0, 50, 0);
//const ambientLight = new THREE.AmbientLight(0xffffff);
//scene.add(ambientLight);
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

  controls.update();
  renderer.render(scene, camera);
}
animate();

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  document.getElementById('pressSpace').style.display = 'none';
    var keyCode = event.which;
    //console.log(keyCode)
    if (keyCode == 87 && movement[PLAYER_POSZ+1][PLAYER_POSX]==0) {         
        scene.position.z += WALK_SPEED;
        player.position.z -= WALK_SPEED;
        PLAYER_POSZ++;
    } else if (keyCode == 83 && movement[PLAYER_POSZ-1][PLAYER_POSX]==0) {
      scene.position.z -= WALK_SPEED;
      player.position.z += WALK_SPEED;
      PLAYER_POSZ--;
    } else if (keyCode == 65 && movement[PLAYER_POSZ][PLAYER_POSX+1]==0) {
      scene.position.x += WALK_SPEED;
      player.position.x -= WALK_SPEED;
      PLAYER_POSX++;
    } else if (keyCode == 68 && movement[PLAYER_POSZ][PLAYER_POSX-1]==0) {
      scene.position.x -= WALK_SPEED;
      player.position.x += WALK_SPEED;
      PLAYER_POSX--;
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
      console.log(scene.position, PLAYER_POSZ, PLAYER_POSX)
    }

    if(hotspot[PLAYER_POSZ][PLAYER_POSX]>-1){
      document.getElementById('pressSpace').style.display = 'block';
      document.getElementById('bagtitle').innerHTML =projectData[hotspot[PLAYER_POSZ][PLAYER_POSX]].title;
      document.getElementById('bagtext').innerHTML = projectData[hotspot[PLAYER_POSZ][PLAYER_POSX]].details;
      document.getElementById('bagimage').innerHTML = `<img src="${projectData[hotspot[PLAYER_POSZ][PLAYER_POSX]].image}" class = "bagimage"/>`;
    }
};
