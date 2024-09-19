import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavCandidateComponent } from './side-nav-candidate.component';

describe('SideNavCandidateComponent', () => {
  let component: SideNavCandidateComponent;
  let fixture: ComponentFixture<SideNavCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavCandidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
