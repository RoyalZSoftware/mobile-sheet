import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSheetComponent } from './mobile-sheet.component';

describe('MobileSheetComponent', () => {
  let component: MobileSheetComponent;
  let fixture: ComponentFixture<MobileSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
