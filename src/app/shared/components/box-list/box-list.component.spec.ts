import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphQLModule } from 'src/app/graphql.module';
import { BoxCardModule } from '../box-card/box-card.module';

import { BoxListComponent } from './box-list.component';

describe('BoxListComponent', () => {
  let component: BoxListComponent;
  let fixture: ComponentFixture<BoxListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxListComponent],
      imports: [
        BoxCardModule,
        GraphQLModule,
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
