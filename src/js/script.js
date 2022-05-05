function main() {
  const { gl, meshProgramInfo } = initializeWorld();
  
  const sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6);
  const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20); //escala aqui!!!
  const coneBufferInfo = flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

  const cubeVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, cubeBufferInfo);
  var sphereVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, sphereBufferInfo);
  const coneVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, coneBufferInfo);

  const cubeUniforms = {u_colorMult: [1, 0.5, 0.5, 1],u_matrix: m4.identity(),};
  var sphereUniforms = {u_colorMult: [0.5, 1, 0.5, 1],u_matrix: m4.identity(),};
  const coneUniforms = {u_colorMult: [0.5, 0.5, 1, 1],u_matrix: m4.identity(),};

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
  }  
  var then = 0;
  loadGUI();
  
  function render(time) {
    time *= 0.0005;

    var deltaTime = time - then;
    then = time;

    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var fieldOfViewRadians = degToRad(config.FOV);
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, config.MIN, config.MAX);

    if(config.AutoRoll == true){
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
    //// BEZIER e Circulo, n ta bonito, desculpa eu tentei :(
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
  cubeTX = Math.sin(degToRad(time*(config.Cvel)))*config.Csize
  cubeTY = Math.cos(degToRad(time*(config.Cvel)))*config.Csize
}

if(config.animar == true){ config.AutoRoll = false;animatingObjects(time)}

    //mais cameras só muda o local das cameras com um if
    //tempo nas animaçoes!!!!!!
    var target = [config.CamPosX, config.CamPosY, config.CamPosZ];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt([config.CamtrnsX, config.CamtrnsY, config.CamtrnsZ], target, up); //muda o target pra muda pra onde a camera olha!!
    var viewMatrix = m4.inverse(cameraMatrix);
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    //como gira a camera em torno dela mesma ????? ja sei
    
    gl.useProgram(meshProgramInfo.program);

    gl.bindVertexArray(sphereVAO);

    sphereUniforms.u_matrix = computeMatrix(
    viewProjectionMatrix,
    [config.sphereTX,config.sphereTY,config.sphereTZ],
    sphereXRotation,
    sphereYRotation,
    config.sphereScaleX,config.sphereScaleY,config.sphereScaleZ);

    twgl.setUniforms(meshProgramInfo, sphereUniforms); 
    twgl.drawBufferInfo(gl, sphereBufferInfo);

    gl.bindVertexArray(coneVAO);
    
    coneUniforms.u_matrix = computeMatrix( ///aqui muda as posiçoes
      viewProjectionMatrix,
      [config.coneTX,config.coneTY,config.coneTZ],
      coneXRotation,
      coneYRotation,
      config.coneScaleX,config.coneScaleY,config.coneScaleZ
    );
    twgl.setUniforms(meshProgramInfo, coneUniforms); 
    twgl.drawBufferInfo(gl, coneBufferInfo);

    gl.bindVertexArray(cubeVAO);   ///aqui faz os cubo??????

    //precisa de mais uma dessas pra ter coisa girando em pontos // animaçoes precisa de n matriz (for)
    cubeUniforms.u_matrix = computeMatrix( ///aqui muda as posiçoes
      viewProjectionMatrix,
      [cubeTX,cubeTY,config.cubeTZ], 
      cubeXRotation,
      cubeYRotation,
      config.cubeScaleX,config.cubeScaleY,config.cubeScaleZ
    );

    twgl.setUniforms(meshProgramInfo, cubeUniforms);///muda?
    twgl.drawBufferInfo(gl, cubeBufferInfo);//muda tmb??????????
    
	requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}
main();


//gl.clear(gl.COLOR_BUFFER_BIT); coloca no final pra limpar as coisas /// faz for dps de cube até o fim pra desenhar mais cubos!