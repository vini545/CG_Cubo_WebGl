function main() {
  const { gl, meshProgramInfo } = initializeWorld();
  ///////
  
  ////////
  const sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6);
  const cubeBufferInfo = flattenedPrimitives.createCubeBufferInfo(gl, 20); //escala aqui!!!
  const coneBufferInfo = flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

  const cubeVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, cubeBufferInfo);
  var sphereVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, sphereBufferInfo);
  const coneVAO = twgl.createVAOFromBufferInfo( gl, meshProgramInfo, coneBufferInfo);

  const cubeUniforms = {u_colorMult: [1, 0.5, 0.5, 1],u_matrix: m4.identity(),};
  var sphereUniforms = {u_colorMult: [0.5, 1, 0.5, 1],u_matrix: m4.identity(),};
  const coneUniforms = {u_colorMult: [0.5, 0.5, 1, 1],u_matrix: m4.identity(),};

  //function computeMatrix(viewProjectionMatrix, translation, yRotation,xRotation) {
  function computeMatrix(viewProjectionMatrix, translation,xRotation,yRotation,zRotation,xScale,yScale,zScale,
    translation_x,translation_y,translation_z){
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2],
    );
    matrix = m4.xRotate(matrix,xRotation);
    matrix = m4.yRotate(matrix,yRotation);
    matrix = m4.zRotate(matrix,zRotation);
    matrix = m4.scale(matrix, xScale, yScale, zScale);
    matrix = m4.translate(matrix, translation_x,translation_y,translation_z);
    return matrix; 
  }  

  //////
  //matrix = m4.xRotate(matrix, xRotation);
  //return m4.yRotate(matrix, yRotation);
  //}
  //////


  loadGUI();
  function render(time) {

    time *= 0.0005;
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
      var cubeXRotation = config.cubeXRotation;
      var cubeYRotation = config.cubeYRotation;
      var sphereXRotation = config.sphereXRotation;
      var sphereYRotation = config.sphereYRotation;
      var coneXRotation = config.coneXRotation;
      var coneYRotation = config.coneYRotation;
    } 

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
    sphereYRotation);

    twgl.setUniforms(meshProgramInfo, sphereUniforms); 
    twgl.drawBufferInfo(gl, sphereBufferInfo);

    gl.bindVertexArray(coneVAO);
    
    coneUniforms.u_matrix = computeMatrix( ///aqui muda as posiçoes
      viewProjectionMatrix,
      [config.coneTX,config.coneTY,config.coneTZ],
      coneXRotation,
      coneYRotation
    );
    twgl.setUniforms(meshProgramInfo, coneUniforms); 
    twgl.drawBufferInfo(gl, coneBufferInfo);

    gl.bindVertexArray(cubeVAO);   ///aqui faz os cubo??????

    //precisa de mais uma dessas pra ter coisa girando em pontos // animaçoes precisa de n matriz (for)
    cubeUniforms.u_matrix = computeMatrix( ///aqui muda as posiçoes
      viewProjectionMatrix,
      [config.cubeTX,config.cubeTY,config.cubeTZ], 
      cubeYRotation,
      cubeXRotation,
    );

    twgl.setUniforms(meshProgramInfo, cubeUniforms);///muda?
    twgl.drawBufferInfo(gl, cubeBufferInfo);//muda tmb??????????
    
	requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
main();
