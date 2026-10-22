window.GH_DEFAULTS = {
  settings: { temperature:{min:20,max:28}, humidity:{min:50,max:80}, soil:{min:35,max:75}, light:{min:12000}, waterLevel:{critical:15}, co2:{max:1500}, simulationSpeed:5, theme:"light" },
  zones: [
    {id:"ZONE-01",name:"Tomatoes",label:"Томаты",crop:"Томаты черри",temperature:24.8,humidity:67,soil:42,light:18400,co2:820,waterLevel:72,mode:"auto",online:true,actuators:{pump:false,fan:false,growLight:false,humidifier:false,heater:false,vent:false}},
    {id:"ZONE-02",name:"Cucumbers",label:"Огурцы",crop:"Огурцы",temperature:27.1,humidity:73,soil:31,light:16200,co2:910,waterLevel:48,mode:"auto",online:true,actuators:{pump:false,fan:false,growLight:false,humidifier:false,heater:false,vent:false}},
    {id:"ZONE-03",name:"Greens",label:"Зелень",crop:"Салат и зелень",temperature:21.6,humidity:59,soil:58,light:9800,co2:690,waterLevel:11,mode:"manual",online:true,actuators:{pump:false,fan:false,growLight:true,humidifier:false,heater:false,vent:false}}
  ],
  alerts: [
    {id:"AL-104",zoneId:"ZONE-02",severity:"warning",message:"Влажность почвы ниже заданного порога",type:"soil",createdAt:Date.now()-420000,status:"open"},
    {id:"AL-103",zoneId:"ZONE-03",severity:"critical",message:"Низкий уровень воды в резервуаре",type:"waterLevel",createdAt:Date.now()-980000,status:"open"}
  ],
  events: [{id:1,zoneId:"ZONE-01",source:"system",action:"SYSTEM_START",message:"Симулятор теплицы запущен",timestamp:Date.now()-3600000}]
};
