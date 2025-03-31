import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  imports: [NgClass],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss'
})
export class SkeletonLoaderComponent {
  @Input() count: number = 3;
  @Input() width: string = 'w-full';
  @Input() height: string = 'h-4';

  constructor() { }
}
