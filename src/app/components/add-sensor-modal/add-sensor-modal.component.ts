import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ISensor} from "../../model/Sensor";
import {getSensorFromForm} from "../../utils/get.sensor.from.form";

@Component({
  selector: 'app-add-sensor-modal',
  templateUrl: './add-sensor-modal.component.html',
  styleUrls: ['./add-sensor-modal.component.css']
})
export class AddSensorModalComponent implements OnChanges{
  @Input() active: boolean
  @Input() sensor: ISensor
  @Output() onModal = new EventEmitter<boolean>()
  @Output() onAddSensors = new EventEmitter<ISensor>()
  @Output() onEditSensor = new EventEmitter<ISensor>()
  @Output() onSensor = new EventEmitter<ISensor>()

  sensorTypes = [
    {name: "Pressure", value: "Pressure"},
    {name: "Voltage", value: "Voltage"},
    {name: "Temperature", value: "Temperature"},
    {name: "Humidity", value: "Humidity"}
  ]
  sensorUnits = [
    {name: "Bar", value: "bar"},
    {name: "Voltage", value: "voltage"},
    {name: "Degree", value: "°С"},
    {name: "Percent", value: "%"}
  ]
  form: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillForm()
  }

  closeModal(){
    this.onModal.emit(false)
    this.onSensor.emit({
      id: 0,
      name: '',
      model: '',
      rangeFrom: 0,
      rangeTo: 0,
      type: '',
      unit: '',
      location: '',
      description: ''
    })
  }

  addOrEditSensor(){
    let sensor: ISensor = getSensorFromForm(this.form)
    if (this.sensor.name){
      this.onEditSensor.emit(sensor)
    }else {
      this.onAddSensors.emit(sensor)
    }
    this.closeModal()
    this.fillForm()

  }

  get name(){
    return this.form.controls.name
  }

  get model(){
    return this.form.controls.model
  }

  get range_from(){
    return this.form.controls.range_from
  }

  get range_to(){
    return this.form.controls.range_to
  }

  get type(){
    return this.form.controls.type
  }

  get unit(){
    return this.form.controls.unit
  }

  get location(){
    return this.form.controls.location
  }

  get description(){
    return this.form.controls.description
  }

  private checkRangeFromAndTo(from: string, to: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup
      const range_from = formGroup.get(from)?.value
      const range_to = formGroup.get(to)?.value
      if (range_from > range_to){
        return {'invalidRange': true}
      }
      return null;
    }
  }

  private fillForm(){
    this.form = this.fb.group({
      id: this.fb.control(this.sensor.id),
      name: this.fb.control(this.sensor.name,
        [Validators.required, Validators.maxLength(30)]),
      model: this.fb.control(this.sensor.model,
        [Validators.required, Validators.maxLength(15)]),
      range_from: this.fb.control(this.sensor.rangeFrom,
        [Validators.required]),
      range_to: this.fb.control(this.sensor.rangeTo,
        [Validators.required]),
      type: this.fb.control(this.sensor.type,
        [Validators.required]),
      unit: this.fb.control(this.sensor.unit,
        [Validators.required]),
      location: this.fb.control(this.sensor.location,
        [Validators.required, Validators.maxLength(40)]),
      description: this.fb.control(this.sensor.description,
        [Validators.required, Validators.maxLength(200)])
    }, {
      validators: this.checkRangeFromAndTo('range_from','range_to')
    })
  }
}

