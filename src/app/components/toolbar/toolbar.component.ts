import { Component, OnInit } from '@angular/core';
import {SkeletonService, SkeletonSize} from "../../services/skeleton.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  selectedSkeletonSize: SkeletonSize = 'XS';
  sizeProject: SkeletonSize[] = ['XS', 'S', 'M', 'L', 'XL'];
  enabledSelection = true;

  constructor(private readonly skeletonService: SkeletonService) { }

  ngOnInit(): void {
  }

  trackByIndex(_index: number, value: string): string {
    return value;
  }

  onSelectionSkeletonSize(selectedSize: string): void  {
    this.selectedSkeletonSize = selectedSize as SkeletonSize;
    this.skeletonService.setSelectedSkeletonSize(selectedSize as SkeletonSize);
  }

}
