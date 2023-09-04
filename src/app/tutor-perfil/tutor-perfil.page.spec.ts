import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorPerfilPage } from './tutor-perfil.page';

describe('TutorPerfilPage', () => {
  let component: TutorPerfilPage;
  let fixture: ComponentFixture<TutorPerfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TutorPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
