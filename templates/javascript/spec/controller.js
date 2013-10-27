/**
 * Created with JetBrains PhpStorm.
 * User: jefflu
 * Date: <%= timestamp.getMonth() + 1 %>/<%= timestamp.getDate() %>/<%= timestamp.getYear()+1900 %>
 * Time: <%= timestamp.getHours() %>:<%= timestamp.getMinutes() %>
 * To change this template use File | Settings | File Templates.
 */

describe('Controller: twc_<%= name %>_controller', function () {
  var scope,
    httpBackend;

  // load the controller's module
  beforeEach(module('shared'));
  beforeEach(module('<%= name %>'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, DrupalSettings, $httpBackend) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    // mock up instance from mock data
    var instanceId = DrupalSettings.getInstanceId(1);
    var settings = DrupalSettings.getSettings(instanceId);
    var di = {settings: settings};

    url = bootstrap.wxdUrl + bootstrap.params.loc_MO;
    httpBackend.whenJSONP(url).respond(bootstrap.response.loc_MO);
    angular.extend(di, {$scope: scope});

    $controller('twc_<%= name %>_controller', di);
    httpBackend.flush();
  }));

  it('scope should not be null', function () {
    expect(!!scope).toBe(true);
  });
});
