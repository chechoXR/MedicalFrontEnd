import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarComponent } from './dialog-borrar.component';

describe('DialogBorrarComponent', () => {
  let component: DialogBorrarComponent;
  let fixture: ComponentFixture<DialogBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
