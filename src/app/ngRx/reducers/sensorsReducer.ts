import * as SensorsActions from "../actions/sensor.actions"
import {ISensor} from "../../model/Sensor";

export type Action = SensorsActions.SensorsActions

const defaultState: ISensor[] = []

export function sensorsReducer(state: ISensor[] = defaultState, action: any) {
  switch (action.type) {
    case SensorsActions.SET_SENSORS:
      return action.payload
    case SensorsActions.ADD_SENSOR:
      return [...state, action.payload]
    case SensorsActions.DELETE_SENSOR:
      return state.filter(s => s.id !== action.payload.id)
    case SensorsActions.UPDATE_SENSOR:
      let number = state.findIndex(s => s.id == action.payload.id)
      const sensors = [...state]
      sensors[number] = action.payload
      return sensors
    default:
      return state
  }
}
