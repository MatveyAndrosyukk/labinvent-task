import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ISensor} from "../../model/Sensor";
import {sensors} from "../../data/sensors";
import {countPages} from "../../utils/count-pages";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {SensorsService} from "../../services/sensors.service";

@Component({
  selector: 'app-sensors-table',
  templateUrl: './sensors-table.component.html',
  styleUrls: ['./sensors-table.component.css']
})
export class SensorsTableComponent implements OnInit, OnChanges{
  sensors: ISensor[] = []
  faMagnifyingGlass = faMagnifyingGlass
  currentPage: number = 0
  pages: number[] = []
  addSensorModalActive: boolean = false
  searchQuery: string
  roles: any
  currentSensor: ISensor = {
    id: 0,
    name: '',
    model: '',
    range_from: null,
    range_to: null,
    type: '',
    unit: '',
    location: '',
    description: ''
  }

  constructor(private sensorsService: SensorsService) {
  }

  ngOnInit(): void {
    this.roles = localStorage.getItem('roles') !== null ? localStorage.getItem('roles') : ''
    this.sensorsService.getSensors()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pages = countPages(this.sensors)
  }

  filterSensors(): void {
    if (this.searchQuery !== undefined){
      this.sensors = sensors.filter(sensor => {
        return Object.values(sensor).find(value => {
          const isValidValue = value && (typeof value === "string" || typeof value === "number")
          return isValidValue && value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        })
      })
    }
    this.pages = countPages(this.sensors)
  }

  countCurrentThreePages(page: number): number[] {
    if (this.pages.length >= 3){
      if (page == 0) return this.pages.slice(0, 3)
      if (page == this.pages.length - 1) return this.pages.slice(this.currentPage - 2, this.currentPage + 1)
      return this.pages.slice(this.currentPage - 1, this.currentPage + 2)
    }
    return this.pages
  }

  changePage(page: number){
    this.currentPage = page
  }

  nextPage(){
    this.currentPage++
  }

  prevPage(){
    this.currentPage--
  }

  deleteSensor(sensor: ISensor){
    this.sensors = this.sensors.filter(s => s.id !== sensor.id)
    this.pages = countPages(this.sensors)
    if (this.currentPage == this.pages[this.pages.length - 1] + 1) this.currentPage--
  }

  changeAddSensorModal(val: boolean){
    this.addSensorModalActive = val
  }

  changeCurrentSensor(sensor: ISensor){
    this.currentSensor = sensor
  }

  addSensor(sensor: ISensor){
    this.sensors.push(sensor)
    this.pages = countPages(this.sensors)
  }

  editSensor(sensor: ISensor){
    let number = this.sensors.findIndex(s => s.id == sensor.id);
    sensors[number] = sensor;
  }

  showEditDialog(sensor: ISensor){
    this.currentSensor = sensor
    this.addSensorModalActive = true
    console.log(this.currentSensor)
  }
}
