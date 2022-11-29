<template id="main">
  <main >
    <div style="height:13vh; padding-left: 9vw; padding-bottom:2vh">
      <LMatic 
        v-for="agv in Object.fromEntries(Object.entries(AGVStore.AGVCollection).filter(([k,v]) => k.startsWith('L')))" 
        :key="agv.agvName"
        :agv="agv" />
    </div>
    <div style="height:85vh; display:grid;">
      <KMatic 
        v-for="agv in Object.fromEntries(Object.entries(AGVStore.AGVCollection).filter(([k,v]) => k.startsWith('K')))" 
        :key="agv.agvName"
        :agv ="agv"/>
    </div>
  </main>
</template>

<script lang="ts" setup>
import KMatic from './components/KMatic.vue';
import LMatic from './components/LMatic.vue';
import { useAGVStore} from '@/store/AGVStore';

const AGVStore = useAGVStore();
AGVStore.getAGVInfo();

var element = document.querySelector("#app");

function fullscreen()
{
  if (element)
  {
    element.requestFullscreen()
  }
}
document.addEventListener("keypress", fullscreen);
document.addEventListener("click", fullscreen);

</script>

<style lang="scss">
*
{
  margin: 0;
}
main 
{
  background: black;
  color: white;
  height: 100vh;
  width: 100vw;
}
</style>
