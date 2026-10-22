window.GHAutomation = {
  run(zone, settings, events, alerts) {
    if(zone.mode !== "auto") return;
    const old = {...zone.actuators}; const actions=[];
    if(zone.soil < settings.soil.min) {
      if(zone.waterLevel > settings.waterLevel.critical) { zone.actuators.pump=true; actions.push("Насос включён: почва сухая"); }
      else { zone.actuators.pump=false; actions.push("Насос заблокирован: мало воды"); this.alert(zone,"critical","Насос заблокирован: низкий уровень воды","waterLevel",alerts); }
    } else if(zone.soil >= settings.soil.max) zone.actuators.pump=false;
    zone.actuators.fan = zone.temperature > settings.temperature.max;
    zone.actuators.vent = zone.temperature > settings.temperature.max + 1;
    zone.actuators.heater = zone.temperature < settings.temperature.min;
    zone.actuators.growLight = zone.light < settings.light.min;
    if(old.pump!==zone.actuators.pump) actions.push("Насос "+(zone.actuators.pump?"включён":"выключен"));
    if(old.fan!==zone.actuators.fan) actions.push("Вентилятор "+(zone.actuators.fan?"включён":"выключен"));
    if(old.heater!==zone.actuators.heater) actions.push("Обогреватель "+(zone.actuators.heater?"включён":"выключен"));
    if(old.growLight!==zone.actuators.growLight) actions.push("Фитолампа "+(zone.actuators.growLight?"включена":"выключена"));
    actions.forEach(msg=>events.unshift({id:Date.now()+Math.random(),zoneId:zone.id,source:"automation",action:"AUTO_CONTROL",message:msg,timestamp:Date.now()}));
    if(zone.soil < settings.soil.min) this.alert(zone,"warning","Влажность почвы ниже порога","soil",alerts);
    if(zone.temperature > settings.temperature.max) this.alert(zone,"warning","Температура выше заданного диапазона","temperature",alerts);
  },
  alert(zone,severity,message,type,alerts) {
    if(alerts.some(a=>a.zoneId===zone.id && a.type===type && a.status==="open")) return;
    alerts.unshift({id:"AL-"+Date.now().toString().slice(-6),zoneId:zone.id,severity,message,type,createdAt:Date.now(),status:"open"});
  },
  risk(zone,s) {
    let n=0;
    if(zone.temperature>s.temperature.max)n+=25; if(zone.temperature<s.temperature.min)n+=20;
    if(zone.soil<s.soil.min)n+=25; if(zone.waterLevel<=s.waterLevel.critical)n+=30;
    if(zone.co2>(s.co2?.max||1500))n+=15; if(!zone.online)n+=20;
    return Math.min(100,n);
  },
  recommendations(zone,s) {
    const r=[];
    if(zone.soil<s.soil.min)r.push(["Проверьте полив","Влажность почвы ниже заданного порога. Проверьте насос и состояние субстрата.","water"]);
    if(zone.waterLevel<=s.waterLevel.critical)r.push(["Пополните резервуар","Запас воды критически низкий; автоматика блокирует полив.","water"]);
    if(zone.temperature>s.temperature.max)r.push(["Усильте вентиляцию","Температура выше установленного максимума.","temp"]);
    if(zone.light<s.light.min)r.push(["Проверьте освещение","Освещённость ниже заданного уровня.","light"]);
    if(!zone.online)r.push(["Проверьте связь","Датчик временно не передаёт данные.","offline"]);
    if(!r.length)r.push(["Условия стабильны","Показания находятся в заданных пределах. Продолжайте наблюдение.","ok"]);
    return r;
  }
};
