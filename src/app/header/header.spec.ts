import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { Header } from './header.component';
describe('Header', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: function(backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      AppState,
      Header
    ]
  }));

  it('should have default data', inject([ Header ], (header: Header) => {
    expect(header.localState).toEqual({ value: '' });
  }));

  it('should log ngOnInit', inject([ Header ], (header: Header) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    header.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
