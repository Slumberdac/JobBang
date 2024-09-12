import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEnterpriseComponent } from './login-enterprise.component';

describe('LoginEnterpriseComponent', () => {
  let component: LoginEnterpriseComponent;
  let fixture: ComponentFixture<LoginEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEnterpriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
