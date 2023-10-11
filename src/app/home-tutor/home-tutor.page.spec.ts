import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeTutorPage } from './home-tutor.page';

describe('HomeTutorPage', () => {
  let component: HomeTutorPage;
  let fixture: ComponentFixture<HomeTutorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeTutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
