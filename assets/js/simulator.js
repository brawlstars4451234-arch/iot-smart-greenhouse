window.GHSim = {
  random(min,max,dec=1) { return +(Math.random()*(max-min)+min).toFixed(dec); },
  tick(zone) {
    zone.temperature = this.random(Math.max(15,zone.temperature-.7),Math.min(36,zone.temperature+.7));
    zone.humidity = Math.round(this.random(Math.max(30,zone.humidity-2),Math.min(95,zone.humidity+2),0));
    zone.soil = Math.round(Math.max(5,Math.min(95,zone.soil + this.random(-2.1,1.2))));
    zone.light = Math.round(Math.max(2500,Math.min(40000,zone.light + this.random(-1300,1300,0))));
    zone.co2 = Math.round(Math.max(400,Math.min(1900,zone.co2 + this.random(-35,35,0))));
    if (!zone.actuators.pump) zone.waterLevel = Math.max(0,+(zone.waterLevel-this.random(0,.15)).toFixed(1));
    else { zone.soil=Math.min(90,zone.soil+this.random(.2,1.4)); zone.waterLevel=Math.max(0,zone.waterLevel-this.random(.2,.7)); }
    zone.online = Math.random() > .015;
    return zone;
  }
};
