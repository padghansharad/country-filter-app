import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { Observable } from 'rxjs';
import {MatInputModule} from '@angular/material/input'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    searchForm: FormGroup;

  constructor(private fb: FormBuilder, private service: FilterService) { }

  ngOnInit() {}
}