import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEnterpriseComponent } from './sign-up-enterprise.component';

describe('SignUpEnterpriseComponent', () => {
  let component: SignUpEnterpriseComponent;
  let fixture: ComponentFixture<SignUpEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpEnterpriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
