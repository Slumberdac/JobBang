import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavEmployerComponent } from './side-nav-employer.component';

describe('SideNavEmployerComponent', () => {
  let component: SideNavEmployerComponent;
  let fixture: ComponentFixture<SideNavEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavEmployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
