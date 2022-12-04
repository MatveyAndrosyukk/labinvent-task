import {ISensor} from "../model/Sensor";

export const filterSensors = (sensors: ISensor[], query: string): ISensor[] => {
  return sensors.filter(sensor => {
    return Object.values(sensor).find(value => {
      const isValidValue = value && (typeof value === "string" || typeof value === "number")
      return isValidValue && value.toString().toLowerCase().includes(query.toLowerCase())
    })
  })
}
