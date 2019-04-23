import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { AppComponent } from './app.component';
import { FilterService } from './services/filter.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

describe('SearchComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ListComponent,
        SearchComponent
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatListModule,
        MatCardModule
      ],
      providers: [FilterService]
    }).compileComponents();
  }));

  it('complete app renders without crashing', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('check default/initial state of the application', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    fixture.detectChanges();
    let search = fixture.debugElement.query(By.directive(SearchComponent)).componentInstance;
    search.searchForm.controls['query'].setValue("");
    let list = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
    expect(list.countriesToBeRendered).toEqual(["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas" , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands" , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica" , "Cote D Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea" , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana" , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India" , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia" , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania" , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia" , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal" , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles" , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan" , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia" , "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)" , "Yemen", "Zambia", "Zimbabwe"]);
  });

  it('check if case-sensitive queries give correct results', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    fixture.detectChanges();
    let search = fixture.debugElement.query(By.directive(SearchComponent)).componentInstance;
    search.searchForm.controls['query'].setValue("Car");
    let list = fixture.debugElement.query(By.directive(ListComponent)).componentInstance;
    expect(list.countriesToBeRendered).toEqual(['Madagascar', 'Nicaragua']);
  });

  it('check if appropriate countries are present in the rendered HTML', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    fixture.detectChanges();
    let search = fixture.debugElement.query(By.directive(SearchComponent)).componentInstance;
    search.searchForm.controls['query'].setValue("iNd");
    let list = fixture.debugElement.query(By.directive(ListComponent));
    expect(list.componentInstance.countriesToBeRendered).toEqual(['French West Indies', 'India', 'Indonesia']);
    fixture.detectChanges();
    expect(list.nativeElement.innerText).toEqual('French West Indies\nIndia\nIndonesia');
  }));

  it('check if fuzzy search is supported by the logic and renders correct HTML', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.componentInstance;
    fixture.detectChanges();
    let search = fixture.debugElement.query(By.directive(SearchComponent)).componentInstance;
    search.searchForm.controls['query'].setValue("or");
    let list = fixture.debugElement.query(By.directive(ListComponent));
    expect(list.componentInstance.countriesToBeRendered).toEqual(['Andorra', 'Ecuador', 'El Salvador', 'Equatorial Guinea', 'Georgia', 'Jordan', 'Morocco', 'Norway', 'Portugal', 'Singapore', 'South Korea', 'Timor L\'Este']);
    fixture.detectChanges();
    expect(list.nativeElement.innerText).toEqual('Andorra\nEcuador\nEl Salvador\nEquatorial Guinea\nGeorgia\nJordan\nMorocco\nNorway\nPortugal\nSingapore\nSouth Korea\nTimor L\'Este');
  }));
});
