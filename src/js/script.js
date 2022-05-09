function main() {
  const { gl, meshProgramInfo } = initializeWorld();
  
  const sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6);
  const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20);
  const coneBufferInfo = flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

  const cubeVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, cubeBufferInfo);
  var sphereVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, sphereBufferInfo);
  const coneVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, coneBufferInfo);

  const cubeUniforms = {u_colorMult: [1, 0.5, 0.5, 1],u_matrix: m4.identity(),};
  var sphereUniforms = {u_colorMult: [0.5, 1, 0.5, 1],u_matrix: m4.identity(),};
  const coneUniforms = {u_colorMult: [0.5, 0.5, 1, 1],u_matrix: m4.identity(),};

  //pelo oq pesquisei é possivel fazer todas as tranformaçoes a partir da compute matrix e nao obj por obj como eu fiz, porem fazendo com a matrix é mais dificil ou impossivel de mover os objs separadamente
  function computeMatrix(viewProjectionMatrix, translation, yRotation,xRotation,xScale,yScale,zScale) {
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2],
    );
  matrix = m4.xRotate(matrix, xRotation);
  matrix = m4.yRotate(matrix, yRotation);
  matrix = m4.scale(matrix, xScale, yScale, zScale);
  return matrix;
  } //poderia ter colocado zrotate mas não qero deixar o codigo mais feio :)

  var then = 0; //variaveis de tempo utilizadas nas animaçoes
  var tempoDeAnima = 0;
  loadGUI();
  
  function render(time) {
    time *= 0.001;    //converte para segundos, n sei como nem  pq isso converte para segundos mas encontrei mais de uma fonte falando isso
    const deltaTime = time - then; //tempo des do ultimo frame
    then = time;      //lembra o tempo pro proximo frame

    const fps = 1 / deltaTime;             //frames per second
    console.log('fps: ', Math.floor(fps)); //no log mostra os fps

    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var fieldOfViewRadians = degToRad(config.FOV); //zoom/FOV
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, config.MIN, config.MAX); //distancia minima e maxima de visao da camera

    if(config.AutoRoll == true){ //rotaçao automatica
      var cubeXRotation = -time; 
      var cubeYRotation =  time;
      var sphereXRotation = -time; 
      var sphereYRotation =  time;
      var coneXRotation = -time;  
      var coneYRotation =  time;
    }
    else if(config.AutoRoll == false){
      cubeXRotation = config.cubeXRotation;
      cubeYRotation = config.cubeYRotation;
      sphereXRotation = config.sphereXRotation;
      sphereYRotation = config.sphereYRotation;
      coneXRotation = config.coneXRotation;
      coneYRotation = config.coneYRotation;
    } 
    //// BEZIER e Circulo, n ta bonito, mas acho q ta facil de entender :)
    if(config.bezier == true){
      var posCub = Bezier(config.bezCub,[config.Bp1x,config.Bp1y],[config.Bp2x,config.Bp2y],[config.Bp3x,config.Bp3y],[config.Bp4x,config.Bp4y]);
      var cubeTX = posCub[0];
      var cubeTY = posCub[1];
    }
    else{
      cubeTX = config.cubeTX;
      cubeTY = config.cubeTY;
    }
    if(config.circulo == true){
      cubeTX = Math.sin(degToRad(time*(config.Cvel)))*config.Csize //circulo na volta de um ponto p=(0,0)
      cubeTY = Math.cos(degToRad(time*(config.Cvel)))*config.Csize //da pra mudar o ponto mas a minha UI ja ta bem grande
    }
    tempoDeAnima += deltaTime; //animaçao independente do tempo de maquina
    if(config.orbita ==true){OrbitarObj(tempoDeAnima/4);} //funçao de orbita

    //console.log('delta: ',tempoDeAnima) 
    if(config.animar == true){for(auxDeAnima;auxDeAnima<1;auxDeAnima++){tempoDeAnima = 0} config.AutoRoll = false; animatingObjects(tempoDeAnima)} //animaçao, o for ta ai pra sempre começa do zero a animaçao!
    
    if(config.seguir === false){//olha para o cone
      var target = [config.CamPosX, config.CamPosY, config.CamPosZ]
    }
    else{target = [config.coneTX, config.coneTY, config.coneTZ]}

    if(config.bezCam == true){ //bezier camera
      var posCam = Bezier(config.bezCamT,[config.Bp1x,config.Bp1y],[config.Bp2x,config.Bp2y],[config.Bp3x,config.Bp3y],[config.Bp4x,config.Bp4y]);
      config.CamPosX = posCam[0];
      config.CamPosY = posCam[1];
    }

    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt([config.CamtrnsX, config.CamtrnsY, config.CamtrnsZ], target, up); //translaçao camera

    if(config.acompanha == true){cameraMatrix = m4.lookAt([config.coneTX, config.coneTY, config.coneTZ+100], [config.coneTX, config.coneTY, config.coneTZ], up);} //acompanha o cone

    var viewMatrix = m4.inverse(cameraMatrix);
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    
    gl.useProgram(meshProgramInfo.program);

    gl.bindVertexArray(sphereVAO);

    sphereUniforms.u_matrix = computeMatrix( //todos os objs estao com os mesmos parametros, explicaçao de cada um no cubo
    viewProjectionMatrix,
    [config.sphereTX,config.sphereTY,config.sphereTZ],
    sphereXRotation,
    sphereYRotation,
    config.sphereScaleX,config.sphereScaleY,config.sphereScaleZ);

    twgl.setUniforms(meshProgramInfo, sphereUniforms); 
    twgl.drawBufferInfo(gl, sphereBufferInfo);

    for(i=0; i<cones; i++){ //faz cones
    gl.bindVertexArray(coneVAO);

    coneUniforms.u_matrix = computeMatrix( 
      viewProjectionMatrix,
      [config.coneTX+(i*20),config.coneTY,config.coneTZ], //cada cone novo aparce ao lodo do anterior (i*20)
      coneXRotation,
      coneYRotation,
      config.coneScaleX,config.coneScaleY,config.coneScaleZ
    );
    twgl.setUniforms(meshProgramInfo, coneUniforms); 
    twgl.drawBufferInfo(gl, coneBufferInfo);
    }

    gl.bindVertexArray(cubeVAO);

    cubeUniforms.u_matrix = computeMatrix( ///aqui muda as posiçoes, translada/roda/escala
      viewProjectionMatrix,
      [cubeTX,cubeTY,config.cubeTZ], //translaçao
      cubeXRotation,
      cubeYRotation,//rotaçao
      config.cubeScaleX,config.cubeScaleY,config.cubeScaleZ //escala
    );

    twgl.setUniforms(meshProgramInfo, cubeUniforms);
    twgl.drawBufferInfo(gl, cubeBufferInfo);
    
	requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}
main();