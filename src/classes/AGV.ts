export default class AGV
{
  readonly ERROR_TIMEOUT:number = 10000;

  agvName: string;
  zone: string;
  lastGoodZone;
  status: string;
  timeInStatus: string;
  timeInStatusString: string;
  lastRobotUpdate: Date;

  constructor(agvName: string, zone: string, lastGoodZone: string, status: string, timeInStatus: string, timeInStatusString: string, lastRobotUpdate: Date)
  {
    this.agvName = agvName;
    this.zone = zone;
    this.lastGoodZone = lastGoodZone;
    this.status = status; 
    this.timeInStatus = timeInStatus;
    this.timeInStatusString = timeInStatusString;
    this.lastRobotUpdate = lastRobotUpdate;
  }
}