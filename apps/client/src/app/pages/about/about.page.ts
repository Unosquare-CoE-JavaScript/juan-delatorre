import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'client-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
