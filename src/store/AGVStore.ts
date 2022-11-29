import { defineStore } from 'pinia';
import { type Ref, ref } from 'vue';
import AGV from '@/classes/AGV';

import { fetchWithTimeout } from '@/functions/fetchWithTimeout';

export const useAGVStore = defineStore('AGV', 
{
  state: () => 
  (
    {
      AGVCollection: ref({}) as Ref<{[id:string]: AGV}>,
      AGVObject: ref({}) as Ref<AGV>,
      lostConnection: ref(false), 
    }
  ),

  actions: 
  {
    getAGVInfo(): void
    {
        fetchWithTimeout('http://172.31.10.8/robots/api/RobotManager/AGVStatus', 
        {
          method : "GET",
          timeout: 700,
          headers: 
          {
            "Accept": "application/json",
            "Content-Type": 'application/json',
          }
        })
        .then(response =>
          {
            return response.json();
          })
        .then(data => 
          {
            this.lostConnection = false;

            data.forEach((agv: AGV) =>
            {
              if (this.AGVCollection[agv.agvName])
              {
                const updateAgv:AGV = this.AGVCollection[agv.agvName];

                updateAgv.zone = agv.zone;
                updateAgv.lastGoodZone = agv.lastGoodZone;
                updateAgv.status = agv.status;
                updateAgv.timeInStatus = agv.timeInStatus;
                updateAgv.timeInStatusString = agv.timeInStatusString;
                updateAgv.lastRobotUpdate = agv.lastRobotUpdate;
              }
              else
              {
                this.AGVObject = new AGV(agv.agvName, agv.zone, agv.lastGoodZone, agv.status, agv.timeInStatus, agv.timeInStatusString, agv.lastRobotUpdate)
                this.AGVCollection[agv.agvName] = this.AGVObject;
              }
            })
          })
        .catch(() => this.lostConnection = true);
    }
  }
})
