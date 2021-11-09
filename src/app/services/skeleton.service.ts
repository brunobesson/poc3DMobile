import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {mergeMap} from "rxjs/operators";


export type SkeletonSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

@Injectable({
  providedIn: 'root'
})
export class SkeletonService {
  private readonly SKELETON_SAMPLE_URL = './assets/skeletonSamples/';
  private readonly selectedSkeletonSize: BehaviorSubject<SkeletonSize> = new BehaviorSubject<SkeletonSize>('XS');
  private readonly selectedSkeletonSize$: Observable<SkeletonSize> = this.selectedSkeletonSize.asObservable();

  constructor(private readonly httpService: HttpClient) { }

  getSelectedSkeletonSizeChange(): Observable<SkeletonSize> {
    return this.selectedSkeletonSize$;
  }

  setSelectedSkeletonSize(selectedSize: SkeletonSize) {
    console.warn('new value=', selectedSize)
    this.selectedSkeletonSize.next(selectedSize);
  }

  getJSON(): Observable<any> {
    console.warn('getJSON...')
    return this.selectedSkeletonSize$.pipe(
      mergeMap(size => this.httpService.get(this.SKELETON_SAMPLE_URL + this.getFileAccordingSize(size))))
  }

  getFileAccordingSize(size: SkeletonSize): string {
    switch (size) {
      case 'XS':
        return 'PRISMASET_G_XS_empty.json';

      case 'S':
        return 'PRISMASET_G_S_IP43_1 NG125_12mod.json';

      case 'M':
        return 'PRISMASET_G_M_ IP30_NSX_DX_44mod.json';

      case 'L':
        return 'PRISMASET_G_L_ IP30_project.json';

      case 'XL':
      default:
        return 'PRISMASET_G_XL_IP43_161_products.json';
    }
  }
}
