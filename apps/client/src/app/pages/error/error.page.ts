import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'client-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
