function OrbitarObj(tempoDeOrbita){
    config.FOV = 120; //afasta a camera para facilitar a vizualizaçao da orbita

    config.coneTX = Math.sin(degToRad(tempoDeOrbita*(config.Cvel)))*80 //gira ao redor do cubo
    config.coneTY = Math.cos(degToRad(tempoDeOrbita*(config.Cvel)))*80
    config.sphereTX = config.coneTX+Math.sin(degToRad(tempoDeOrbita*(config.Cvel*4)))*40 //gira ao redor do cone
    config.sphereTY = config.coneTY+Math.cos(degToRad(tempoDeOrbita*(config.Cvel*4)))*40
    
}