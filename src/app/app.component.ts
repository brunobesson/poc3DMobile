import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SkeletonService} from "./services/skeleton.service";
import {Se3DWidget} from "@sdk3d/3d-widget/dist/types/components/3d-widget/3d-widget";
import {ThreeDService} from "./services/three-d.service";
import {delay, mergeMap, takeUntil} from "rxjs/operators";
import {DOCUMENT} from "@angular/common";
import {Subject} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class AppComponent implements OnInit {
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'POC 3D mobile';
  enableHelpBanner = false;

  private editor3D!: Se3DWidget;
  private readonly document: Document;

  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('widget3D', {static: false}) editor3DElt: ElementRef = {} as ElementRef;


  constructor(
    @Inject(DOCUMENT) document: Document,
    private readonly skeletonService: SkeletonService,
    private readonly threeDService: ThreeDService) {
    this.document = document;
  }

  ngOnInit(): void {
    console.warn('ngOnInit....')
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  async ngAfterViewInit(): Promise<any> {
    this.editor3D = await this.editor3DElt.nativeElement.getController();
    this.threeDService.init(this.editor3D);
    // setTimeout(() => {
      this.skeletonService.getJSON()
        .pipe(
          takeUntil(this.destroy$),
          mergeMap(skeleton => this.threeDService.update3DViewer(skeleton, this.editor3D))
        )
        .subscribe(() => {
          console.log('Project loaded')
        })
    // }, 1000)
    /*setTimeout(() => {
      this.skeletonService.getJSON()
        .pipe(
          mergeMap(skeleton => this.threeDService.update3DViewer(skeleton, this.editor3D))
        )
        .subscribe(() => {
          console.log('Project loaded')
        })
    }, 1000)*/

  }


  /*ngAfterViewInit() {
    customElements.whenDefined("se-3d-widget").then(
      res => {
        console.warn('res=', res)
        console.warn('call init...')
        this.threeDService.init(this.editor3D);
      }
    )
  }*/
}
