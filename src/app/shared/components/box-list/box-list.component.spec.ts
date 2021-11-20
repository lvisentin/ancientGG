import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { BoxCardModule } from '../box-card/box-card.module';
import { BoxListComponent } from './box-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BoxListComponent', () => {
  let component: BoxListComponent;
  let fixture: ComponentFixture<BoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxListComponent],
      imports: [
        BoxCardModule,
        ApolloTestingModule,
        HttpClientTestingModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
