//'use strict';
//
///* https://github.com/angular/protractor/blob/master/docs/toc.md */
//
//describe('my app', function() {
//
//
//  it('should automatically redirect to /customer when location hash/fragment is empty', function() {
//    browser.get('index.html');
//    expect(browser.getLocationAbsUrl()).toMatch("/customer");
//  });
//
//
//  describe('customer', function() {
//
//    beforeEach(function() {
//      browser.get('index.html#/customer');
//    });
//
//
//    it('should render customer when user navigates to /customer', function() {
//      expect(element.all(by.css('[ng-view] p')).first().getText()).
//        toMatch(/partial for view 1/);
//    });
//
//  });
//
//
//  describe('sale', function() {
//
//    beforeEach(function() {
//      browser.get('index.html#/sale');
//    });
//
//
//    it('should render sale when user navigates to /sale', function() {
//      expect(element.all(by.css('[ng-view] p')).first().getText()).
//        toMatch(/partial for view 2/);
//    });
//
//  });
//});
