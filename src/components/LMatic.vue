<template> 
  <div class="grid-cell status" :class="[calcRobotState()]">
    {{agv.agvName}}
  </div>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue';
import AGV from '@/classes/AGV';
import { useAGVStore } from '@/store/AGVStore';

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

function calcRobotState() : string
{
  if (props.agv.status == 'HALTED')
    return "error";
  else if (props.agv.status == 'OK')
    return "ok";
  else if (props.agv.status == 'WAITING')
    return "waiting";
  else if (props.agv.status == 'WARNING')
    return "warning";
  else if (props.agv.status == 'NO_JOB')
    return "nojob";
  else if (props.agv.status == 'MANUAL' && props.agv.zone == "CHARGING")
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
</script>

<style lang="scss" scoped>
@font-face {
    font-family: "ChangaOne";
    src: url('@/assets/Changa_One/ChangaOne-Regular.ttf') format('truetype');
}
.grid-cell
{
  display:inline-flex;
  justify-content: center;
  width: 8.3vw;
  text-align: center;
  font-size:  9vh;
  font-family: 'ChangaOne', 'Gill Sans MT', Arial, Helvetica, sans-serif;
  font-weight:500;

  padding: 2px;
  margin: 4px;
  height: 90%;
  padding-top: 0.9vh;
  
}
  .status
  {
    color: black;
    border-radius: 6px 6px 6px 6px; 
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
    -webkit-text-stroke: 0px; 
  }

  .manual
  {
    background-image: linear-gradient(135deg, #cad13d 25%, #3d3647 25%, #3d3647 50%, #cad13d 50%, #cad13d 75%, #3d3647 75%, #3d3647 100%);
    background-size: 6vh 6vh;
    color: white;
  }

  .driven
  {
    background-image: linear-gradient(135deg, #c45252 25%, #3d3647 25%, #3d3647 50%, #c45252 50%, #c45252 75%, #3d3647 75%, #3d3647 100%);
    background-size: 6vh 6vh;
    color: white;
  }
  
</style>