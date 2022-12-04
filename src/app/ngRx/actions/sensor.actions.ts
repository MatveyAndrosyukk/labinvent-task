import {Action} from "@ngrx/store";
import {ISensor} from "../../model/Sensor";

export const ADD_SENSOR = '[Sensors] Add'
export const DELETE_SENSOR = '[Sensors] Delete'
export const UPDATE_SENSOR = '[Sensors] Update'
export const SET_SENSORS= '[Sensors] Set'

export class SetSensors implements Action{
  readonly type = SET_SENSORS;
  constructor(public payload: ISensor[]) {
  }
}
export class AddSensor implements Action{
  readonly type = ADD_SENSOR

  constructor(public payload: ISensor) {
  }
}

export class DeleteSensor implements Action{
  readonly type = DELETE_SENSOR

  constructor(public  payload: ISensor) {
  }
}

export class UpdateSensor implements Action{
  readonly type = UPDATE_SENSOR

  constructor(public payload: ISensor) {
  }
}

export type SensorsActions = AddSensor | DeleteSensor | UpdateSensor | SetSensors
