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
  rangeFrom: number | null,
  rangeTo: number | null,
  type: SensorTypes | string,
  unit: SensorUnits | string,
  location: string,
  description: string
}
