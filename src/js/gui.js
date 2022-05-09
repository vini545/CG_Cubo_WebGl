var config = { 
cubeYRotation: degToRad(20), cubeXRotation: degToRad(20),cubeTX: 0,cubeTY: 0,cubeTZ:0,cubeScaleX: 1,cubeScaleY: 1,cubeScaleZ: 1, bezCub: degToRad(0), //cubo
CamtrnsX: 0,CamtrnsY: 0,CamtrnsZ:100, CamPosX: 0, CamPosY: 0, CamPosZ:0, FOV:60, MIN:0.1, MAX: 200, bezCam:false,bezCamT:degToRad(0), acompanha: false, //camera
AutoRoll: true, bezier: false, circulo: false, //rolagem/bezier
circulo: false,Cvel:500,Csize:10,//circulo 
sphereYRotation: degToRad(20), sphereXRotation: degToRad(20), sphereTX: -40,sphereTY: 0,sphereTZ: 0,sphereScaleX: 1,sphereScaleY: 1,sphereScaleZ: 1,//esfera
coneXRotation: degToRad(20), coneYRotation: degToRad(20),coneTX: 40,coneTY: 0,coneTZ: 0,coneScaleX: 1,coneScaleY: 1,coneScaleZ: 1,//cone
animar:false, seguir:false,orbita:false,//checkboxes
Bp1x:-60,Bp1y:-30,Bp2x:-60,Bp2y:30,Bp3x:50,Bp3y:30,Bp4x:50,Bp4y:-30  //possiçoes dos pontos do bezier
};

var Novocone = { novocone: function(){ cones = cones + 1;}}
var tiraCone = { tiracone: function(){ cones = cones - 1;}}
var ResetAnim = { resetanim: function(){ auxDeAnima = 0;}} //seta a var aux de animaçao de volta a zero


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
  camera.add(config, "FOV", -200, 200, 0.5).name('FOV');
  camera.add(config, 'bezCam').name("BezierC")
  camera.add(config, "bezCamT", 0,1,0.001).name("Curva");//fim camera

  const cubo = gui.addFolder("Cubo"); //pasta cubo
  cubo.add(config, "cubeYRotation", 0, 10, 0.5);
  cubo.add(config, "cubeXRotation", 0, 10, 0.5);
  cubo.add(config, "cubeTX", -200, 200, 0.5);
  cubo.add(config, "cubeTY", -200, 200, 0.5);
  cubo.add(config, "cubeTZ", -200, 200, 0.5);
  cubo.add(config, "cubeScaleX", 0, 5, 0.5);
  cubo.add(config, "cubeScaleY", 0, 5, 0.5);
  cubo.add(config, "cubeScaleZ", 0, 5, 0.5);//fim cubo

  const sphere = gui.addFolder("Esfera"); //pasta da esfera
  sphere.add(config, "sphereYRotation", 0, 10, 0.5);
  sphere.add(config, "sphereXRotation", 0, 10, 0.5);
  sphere.add(config, "sphereTX", -200, 200, 0.5);
  sphere.add(config, "sphereTY", -200, 200, 0.5);
  sphere.add(config, "sphereTZ", -200, 200, 0.5);
  sphere.add(config, "sphereScaleX", 0, 5, 0.5);
  sphere.add(config, "sphereScaleY", 0, 5, 0.5);
  sphere.add(config, "sphereScaleZ", 0, 5, 0.5);//fim esfera

  const cone = gui.addFolder("Cone"); //pasta do cone
  cone.add(config, "coneYRotation", 0, 10, 0.5);
  cone.add(config, "coneXRotation", 0, 10, 0.5);
  cone.add(config, "coneTX", -200, 200, 0.5);
  cone.add(config, "coneTY", -200, 200, 0.5);
  cone.add(config, "coneTZ", -200, 200, 0.5);
  cone.add(config, "coneScaleX", 0, 5, 0.5);
  cone.add(config, "coneScaleY", 0, 5, 0.5);
  cone.add(config, "coneScaleZ", 0, 5, 0.5);//fim cone
  
  gui.add(Novocone,'novocone'); //check box
  gui.add(tiraCone,'tiracone');
  gui.add(ResetAnim,'resetanim').name("Reseta animação");
  gui.add(config, 'AutoRoll') //roll
  gui.add(config, 'animar').name("Animação")
  gui.add(config, 'orbita').name("Orbitar")
  gui.add(config, 'seguir').name("Seguir")
  gui.add(config, 'acompanha').name("Acompanhar")
  gui.add(config, 'bezier').name("Bezier")

  const bezFolder = gui.addFolder("Bezzier") // pasta bezier
  bezFolder.add(config, "bezCub", 0,1,0.001).name("BezierCubo"); //distancia na curva, 0 sendo inicio 1 sendo final
  bezFolder.add(config,"Bp1x",-60,60,0.5).name("BezP1X")
  bezFolder.add(config,"Bp1y",-60,60,0.5).name("BezP1Y"); //cada ponto pode ser alterado 
  bezFolder.add(config,"Bp2x",-60,60,0.5).name("BezP2X")
  bezFolder.add(config,"Bp2y",-60,60,0.5).name("BezP2Y");
  bezFolder.add(config,"Bp3x",-60,60,0.5).name("BezP3X")
  bezFolder.add(config,"Bp3y",-60,60,0.5).name("BezP3Y");
  bezFolder.add(config,"Bp4x",-60,60,0.5).name("BezP4X")
  bezFolder.add(config,"Bp4y",-60,60,0.5).name("BezP4Y"); //fim pasta bezier

  gui.add(config, 'circulo').name("Circulo") //pasta circulo
  const circuloFold = gui.addFolder("Circulo")
  circuloFold.add(config,"Cvel",0,1000,1).name("Velocidade");
  circuloFold.add(config,"Csize",0,100,1).name("Raio"); //fim circulo
  
};
