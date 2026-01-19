import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateControlComponent } from './paginate-control.component';

describe('PaginateControlComponent', () => {
  let component: PaginateControlComponent;
  let fixture: ComponentFixture<PaginateControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginateControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
