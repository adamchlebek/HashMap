import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { ToastrModule } from 'ngx-toastr';

describe('NotificationService', () => {
  let serviceStub: any;
  beforeEach(() => TestBed.configureTestingModule({
    providers : [NotificationService],
    imports   : [ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }), ]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
