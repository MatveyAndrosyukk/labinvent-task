import {FormGroup} from "@angular/forms";
import {ISensor} from "../model/Sensor";

export const getSensorFromForm = (form: FormGroup): ISensor => {
  return {
    id: form.value.id ? form.value.id : Math.random(),
    name: form.value.name,
    model: form.value.model,
    range_from: form.value.range_from,
    range_to: form.value.range_to,
    type: form.value.type,
    unit: form.value.unit,
    location: form.value.location,
    description: form.value.description
  }
}
