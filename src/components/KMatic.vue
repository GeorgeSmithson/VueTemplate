<template> 
<div class="grid-row">
  <div class="agv-id grid-item">
      {{agv.agvName}}
  </div>

  <div class="grid-item lost-connection" v-if="AGVStore.lostConnection">
    LOST CONNECTION
  </div>
  <div v-else class="grid-item status" :class="[calcRobotStateClass()]">
    {{ (agv.status == "NO_JOB") ? "NO JOB" : agv.status }} {{(agv.status != "OK") ? " - " + agv.timeInStatusString : ""}}
  </div>    
      
  <div v-if="agv.status != 'OFFLINE'" class="agv-location grid-item" :class="[calcLocationClass()]">
      {{ agv.lastGoodZone + (agv.lastGoodZone === agv.zone ? "" : "?")}}
  </div>
  <div v-else class="agv-location offline-loc grid-item location" :class="[calcLocationClass()]">
      {{ agv.lastGoodZone + "?"}} 
  </div>
</div> 
</template>

<script lang="ts" setup>

import { defineProps } from 'vue';
import { useAGVStore } from '@/store/AGVStore';
import AGV from '@/classes/AGV';

const AGVStore = useAGVStore();

const props = defineProps({
  agv:
  {
      readonly: true,
      required: true,
      type:AGV
    }
})

setInterval(() => 
{
  AGVStore.getAGVInfo();
}, 500);

function calcRobotStateClass() : string
{
  if (props.agv.status == 'HALTED')
    return "halted";
  else if (props.agv.status == 'OK')
    return "ok";
  else if (props.agv.status == 'WAITING')
    return "waiting";
  else if (props.agv.status == 'WARNING')
    return "warning";
  else if (props.agv.status == 'NO_JOB')
    return "nojob";
  else if (props.agv.status == 'CHARGING')
    return "charging";
  else if (props.agv.status == 'MANUAL')
    return "manual";
  else if (props.agv.status == 'DRIVING')
    return "driven";
  else if (props.agv.status == 'OFFLINE')
    return "offline";
  else
    return "error";
}

function calcLocationClass(): string
{
  if (props.agv.zone.startsWith('A'))
  {
    return 'enlarge-text';
  }
  else return 'normal';
}
</script>

<style lang="scss" scoped>

@font-face {
    font-family: "ChangaOne";
    src: url('@/assets/Changa_One/ChangaOne-Regular.ttf') format('truetype');
}
.agv-id
{
  font-size:8vh;
}

.agv-location
{
  font-size:6.5vh;
}

.grid-row 
{
  display:grid;
  grid-template-columns: 9% 66% 25%;
  grid-auto-rows: auto;
  text-align: center;
  font-size: 5vh;
  font-family: 'ChangaOne', 'Gill Sans MT', Arial, Helvetica, sans-serif;

  font-weight:500;

  padding: 2px;
  padding-top: 0.9vh;

  .grid-item
  {
    display:grid;
    align-items:center;
  }

  .lost-connection 
  {
    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0);
    font-size: 10vh;
    width: 67vw;
  }
  .status
  {
    color: black;
    border-radius: 6px 6px 6px 6px;
    font-size: 10vh;
    width: 67vw;
  }
  .ok 
  {
    background-color: rgb(52,211,153);
  }
  .waiting 
  {
    background-color: rgb(253, 230, 138);
  }
  .warning 
  {
    background-color: rgb(4, 120, 87);
  }
  .nojob 
  {
    background-color: rgb(98, 184, 241);
  }
  .error 
  {
    background-color: rgb(239, 68, 68);
  }
  .halted
  {
    background-color: rgb(239, 68, 68);
  }

  .offline 
  {
    background-color: rgb(85,0,0);
  }
  .offline-loc
  {
    color: dimgray;
  }

  .charging 
  {
    background-color: black;
    color: white;
    border: solid 3px;
    border-color: white;
  }

  .manual
  {
    background-image: linear-gradient(135deg, #cad13d 25%, #3d3647 25%, #3d3647 50%, #cad13d 50%, #cad13d 75%, #3d3647 75%, #3d3647 100%);
    background-size: 56.57px 56.57px;
    color: white;
  }

  .driven
  {
    background-image: linear-gradient(135deg, #c45252 25%, #3d3647 25%, #3d3647 50%, #c45252 50%, #c45252 75%, #3d3647 75%, #3d3647 100%);
    background-size: 56.57px 56.57px;
    color: white;
  }

  .enlarge-text
  {
    font-size: 9vh;
  }
}
</style>