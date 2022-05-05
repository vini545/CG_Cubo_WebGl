function animatingObjects(timeAnim){
  if(timeAnim <= 2){
    config.coneXRotation = timeAnim*10;
    config.coneTX = config.coneTX+(timeAnim); //repedte isso!!!
    timeAnim *= 1;
  }
  else if(timeAnim <= 4){
    config.sphereXRotation = timeAnim*10;
    config.sphereYRotation = timeAnim*10;
    config.sphereTY = config.sphereTY+timeAnim;
    config.coneTX = config.coneTX-(timeAnim);
    timeAnim *= 1;
  }
  else if(timeAnim <= 6){
    config.sphereTY = config.sphereTY-timeAnim;
    config.coneTX = timeAnim;
    config.coneXRotation = timeAnim*10;
    config.sphereXRotation = timeAnim*10;
    config.sphereTY = timeAnim*10;
    timeAnim *= 1;
  }
  else if(timeAnim <= 8){
    config.sphereScaleY = (timeAnim-40)/ 10;
    config.coneScaleX = (timeAnim-40)/ 10;
    timeAnim *= 1;
  }
  else{
    config.animar = false;
    timeAnim *= 1;
  }
}