/**
 * Created with JetBrains PhpStorm.
 * User: <%= author %>
 * Date: <%= timestamp.getMonth() + 1 %>/<%= timestamp.getDate() %>/<%= timestamp.getYear()+1900 %>
 * Time: <%= timestamp.getHours() %>:<%= timestamp.getMinutes() %>
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/* App Module */
twc.<%= name %> = twc.<%= name %> || {};
twc.<%= name %>.app = twc.<%= name %>.app || angular.module('<%= name %>', []);