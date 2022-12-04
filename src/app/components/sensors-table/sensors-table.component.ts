import {Component, OnInit} from '@angular/core';
import {ISensor} from "../../model/Sensor";
import {countPages} from "../../utils/count-pages";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {SensorsService} from "../../services/sensors.service";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as SensorsActions from "../../ngRx/actions/sensor.actions"
import {filterSensors} from "../../utils/filter.sensors";

interface SensorsTableState {
  sensors: ISensor[]
}

@Component({
  selector: 'app-sensors-table',
  templateUrl: './sensors-table.component.html',
  styleUrls: ['./sensors-table.component.css']
})
export class SensorsTableComponent implements OnInit {
  currentSensors$: Observable<ISensor[]>
  allSensors: ISensor[]
  isLoading: boolean = true
  faMagnifyingGlass = faMagnifyingGlass
  currentPage: number = 0
  pages: number[] = []
  addSensorModalActive: boolean = false
  searchQuery: string
  roles: any
  currentSensor: ISensor = {
    id: 0, name: '', model: '', rangeFrom: null, rangeTo: null, type: '', unit: '', location: '', description: ''
  }

  constructor(
    private sensorsService: SensorsService,
    private store: Store<SensorsTableState>
  ) {
    this.currentSensors$ = this.store.select('sensors')
  }

  ngOnInit(): void {
    this.roles = localStorage.getItem('roles') !== null ? localStorage.getItem('roles') : ''
    this.sensorsService.getSensors().subscribe(res => {
      this.isLoading = false
      this.store.dispatch(new SensorsActions.SetSensors(res))
      this.allSensors = res
      this.setPages()
    })
  }

  addSensor(sensor: ISensor) {
    this.sensorsService.saveSensor(sensor).subscribe(() => {
      this.store.dispatch(new SensorsActions.AddSensor(sensor))
      this.setPages()
    })
  }

  editSensor(sensor: ISensor) {
    this.sensorsService.editSensor(sensor).subscribe(() => {
      this.store.dispatch(new SensorsActions.UpdateSensor(sensor))
    })
  }

  deleteSensor(sensor: ISensor) {
    this.sensorsService.deleteSensor(sensor).subscribe(() => {
      this.store.dispatch(new SensorsActions.DeleteSensor(sensor))
      this.setPages()
      if (this.currentPage == this.pages[this.pages.length - 1] + 1) this.currentPage--
    })
  }

  filterSensors(): void {
    if (this.searchQuery !== undefined) {
      let result = filterSensors(this.allSensors, this.searchQuery)
      this.store.dispatch(new SensorsActions.SetSensors(result))
      this.setPages()
    }
  }

  countCurrentThreePages(page: number): number[] {
    if (this.pages.length >= 3) {
      if (page == 0) return this.pages.slice(0, 3)
      if (page == this.pages.length - 1) return this.pages.slice(this.currentPage - 2, this.currentPage + 1)
      return this.pages.slice(this.currentPage - 1, this.currentPage + 2)
    }
    return this.pages
  }

  changePage(page: number) {
    this.currentPage = page
  }

  nextPage() {
    this.currentPage++
  }

  prevPage() {
    this.currentPage--
  }

  changeAddSensorModal(val: boolean) {
    this.addSensorModalActive = val
  }

  changeCurrentSensor(sensor: ISensor) {
    this.currentSensor = sensor
  }

  showEditDialog(sensor: ISensor) {
    this.currentSensor = sensor
    this.addSensorModalActive = true
  }

  private setPages() {
    this.currentSensors$.subscribe(sensors => {
      this.pages = countPages(sensors)
    })
  }
}
