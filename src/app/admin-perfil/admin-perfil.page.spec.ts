import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPerfilPage } from './admin-perfil.page';

describe('AdminPerfilPage', () => {
  let component: AdminPerfilPage;
  let fixture: ComponentFixture<AdminPerfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
