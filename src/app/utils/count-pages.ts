import {ISensor} from "../model/Sensor";

export const countPages = (sensors: ISensor[]): number[] => {
  let resultPages:number[] = []

  for (let i = 0; i < Math.ceil(sensors.length/4); i++){
    resultPages.push(i)
  }
  return resultPages;
}
