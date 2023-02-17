import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompoComponent } from './my-compo.component';

describe('MyCompoComponent', () => {
  let component: MyCompoComponent;
  let fixture: ComponentFixture<MyCompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
