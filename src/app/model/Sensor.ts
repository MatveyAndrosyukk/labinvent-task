export enum SensorTypes{
  PRESSURE='Pressure',
  VOLTAGE='Voltage',
  TEMPERATURE='Temperature',
  HUMIDITY='Humidity'
}

export enum SensorUnits{
  BAR='bar',
  VOLTAGE='voltage',
  DEGREE='°С',
  PERCENT='%'
}
export interface ISensor{
  id?: number,
  name: string,
  model: string,
  range_from: number | null,
  range_to: number | null,
  type: SensorTypes | string,
  unit: SensorUnits | string,
  location: string,
  description: string
}
