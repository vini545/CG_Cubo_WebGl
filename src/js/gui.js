var config = { 
cubeYRotation: degToRad(20), cubeXRotation: degToRad(20),cubeTX: 0,cubeTY: 0,cubeTZ:0, //cubo
CamtrnsX: 0,CamtrnsY: 0,CamtrnsZ:100, CamPosX: 0, CamPosY: 0, CamPosZ:0, FOV:60, MIN:0.1, MAX: 200, //camera
AutoRoll: true, //rolagem
sphereYRotation: degToRad(20), sphereXRotation: degToRad(20), sphereTX: -40,sphereTY: 0,sphereTZ: 0,//esfera
coneXRotation: degToRad(20), coneYRotation: degToRad(20),coneTX: 40,coneTY: 0,coneTZ: 0};//cone

var obj = { add:function(){ console.log("clicked") }};

const loadGUI = () => {
  const gui = new dat.GUI();
  //cria e deleta camera e objs
  
  const camera = gui.addFolder("Camera"); //pasta camera
  camera.add(config, "CamPosX", -200, 200, 0.5).name('TransX');
  camera.add(config, "CamPosY", -200, 200, 0.5).name('TransY');
  camera.add(config, "CamPosZ", -200, 200, 0.5).name('TransZ');
  camera.add(config, "CamtrnsX", -200, 200, 0.5).name('AngleX');
  camera.add(config, "CamtrnsY", -200, 200, 0.5).name('AngleY');
  camera.add(config, "CamtrnsZ", -200, 200, 0.5).name('AngleZ');
  camera.add(config, "MIN", 0, 200, 0.1).name('MIN');
  camera.add(config, "MAX", -200, 2000, 0.5).name('MAX');
  camera.add(config, "FOV", -200, 200, 0.5).name('FOV'); //fim camera
  
  const cubo = gui.addFolder("Cubo"); //pasta cubo
  cubo.add(config, "cubeYRotation", 0, 20, 0.5);
  cubo.add(config, "cubeXRotation", 0, 20, 0.5);
  cubo.add(config, "cubeTX", -200, 200, 0.5);
  cubo.add(config, "cubeTY", -200, 200, 0.5);
  cubo.add(config, "cubeTZ", -200, 200, 0.5);//fim cubo

  const sphere = gui.addFolder("Esfera"); //pasta da esfera
  sphere.add(config, "sphereYRotation", 0, 20, 0.5);
  sphere.add(config, "sphereXRotation", 0, 20, 0.5);
  sphere.add(config, "sphereTX", -200, 200, 0.5);
  sphere.add(config, "sphereTY", -200, 200, 0.5);
  sphere.add(config, "sphereTZ", -200, 200, 0.5);//fim esfera

  const cone = gui.addFolder("Cone"); //pasta do cone
  cone.add(config, "coneYRotation", 0, 20, 0.5);
  cone.add(config, "coneXRotation", 0, 20, 0.5);
  cone.add(config, "coneTX", -200, 200, 0.5);
  cone.add(config, "coneTY", -200, 200, 0.5);
  cone.add(config, "coneTZ", -200, 200, 0.5);//fim cone
 
  gui.add(obj,'add');
  gui.add(config, 'AutoRoll') //roll
  
};
