import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsAddTemplateDrivenComponent } from './rooms-add-template-driven.component';

describe('RoomsAddTemplateDrivenComponent', () => {
  let component: RoomsAddTemplateDrivenComponent;
  let fixture: ComponentFixture<RoomsAddTemplateDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsAddTemplateDrivenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsAddTemplateDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
