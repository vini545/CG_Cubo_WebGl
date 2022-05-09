function animatingObjects(timeAnim){ //ta feia a animaçao mas eu to animando na tentaiva e erro demora pra fica bonita :/
  config.FOV=120;
  if(timeAnim <=2){
    config.coneXRotation = timeAnim*10;
    config.coneTX = config.coneTX+(timeAnim);
    config.sphereTY = config.sphereTY-timeAnim; 
  }
  else if(timeAnim <= 3){
    config.sphereXRotation = timeAnim*10;
    config.sphereYRotation = timeAnim*10;
    config.sphereTY = config.sphereTY+timeAnim;
    config.coneTX = config.coneTX-(timeAnim);
  }
  else if(timeAnim <= 4){
    config.sphereTY = config.sphereTY-timeAnim;
    config.coneTX = config.coneTX+timeAnim;
    config.coneXRotation = timeAnim*10;
    config.sphereXRotation = timeAnim*10;
  }
  else if(timeAnim <= 6){
    config.coneTX = 40;
    config.coneTY = 0;
    config.sphereTY = 0;
    config.sphereTX = -40;
    config.sphereScaleY = (timeAnim-40)/ 10;
    config.coneScaleX = (timeAnim-40)/ 10;
  }
  else if(timeAnim <= 12){
    config.sphereScaleY = 1;
    config.coneScaleX = 1;
    config.coneTX = Math.sin(degToRad(timeAnim*(config.Cvel/2)))*80 
    config.coneTY = Math.cos(degToRad(timeAnim*(config.Cvel)))*80
    config.sphereTX = Math.sin(degToRad(timeAnim*(config.Cvel/2)))*80 
    config.sphereTY = -Math.cos(degToRad(timeAnim*(config.Cvel)))*80
  }
  else{
    config.coneTX = 40;
    config.coneTY = 0;
    config.sphereTY = 0;
    config.sphereTX = -40;
  }
}