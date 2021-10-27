class ProjectCylinder{
    constructor(sceneBG){
      this.data = new THREE.Mesh( new THREE.CylinderGeometry( 2, 2, 2, 100 ), new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} ) );
      sceneBG.add(this.data)
    }
    changeX(pos) {
      this.data.position.x += pos;
    }
    changeY(pos) {
      this.data.position.y += pos; 
    }
    changeZ(pos) {
      this.data.position.z += pos;
    }
  }

export default ProjectCylinder;