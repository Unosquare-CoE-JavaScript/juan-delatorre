import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'client-front',
  templateUrl: './front.page.html',
  styleUrls: ['./front.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
