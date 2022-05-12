import { Component, ChangeDetectionStrategy } from '@angular/core'
import { randomID } from '@jp/utilities'
import { Store } from '@ngrx/store'
import { addTask } from '../../state/task/task.actions'

@Component({
  selector: 'client-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  constructor (
    private store: Store,
  ) {}

  addTask (target: EventTarget) {
    const { value: task } = target as HTMLInputElement
    const id = randomID(4)
    this.store.dispatch(addTask({ task: { id, task }}))
  }
}
