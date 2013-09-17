// This file was automatically generated from page.soy.
// Please don't edit this file by hand.

goog.provide('org.haodev.asv.page');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.page.doc = function(opt_data, opt_ignored) {
  return org.haodev.asv.page.head(opt_data) + org.haodev.asv.page.banner(null) + '<div class="main-content">' + org.haodev.asv.page.sidebar(opt_data) + org.haodev.asv.page.main(opt_data) + '</div>' + ((opt_data.playsVideo) ? '<div id="measure" class="monospace-canvas">.</div>' : '') + org.haodev.asv.page.foot(opt_data);
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.page.banner = function(opt_data, opt_ignored) {
  return '<div class="banner"><h1 style="display:inline-block">Video as text</h1><h3>your videos, super low definition.</h3></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.page.sidebar = function(opt_data, opt_ignored) {
  return '<div class="col-md-2 visible-lg visible-md" id="side-bar"><ul><li ' + ((opt_data.page == 'main') ? 'class="selected"' : '') + '><a href="/">Home</a></li><li ' + ((opt_data.page == 'how') ? 'class="selected"' : '') + '><a href="/how">How it works</a></li><li><a href="https://github.com/Yuhao93/videoastext" target="_blank">The source</a></li></ul></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.page.main = function(opt_data, opt_ignored) {
  return '<div class="col-md-10" style="float:right;max-height:100%;overflow-y:auto;"><div class="col-md-8" style="margin-right:auto;margin-left:auto;float:none;padding-bottom:50px"><div class="modal-dialog"><div class="modal-content"><div class="modal-body">' + soy.$$filterNoAutoescape(opt_data.content) + '</div></div></div></div></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.page.head = function(opt_data, opt_ignored) {
  return '<!DOCTYPE html><html><head><meta name="description" content="' + soy.$$escapeHtml(opt_data.desc) + '"><title>' + soy.$$escapeHtml(opt_data.title) + '</title><script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert"><\/script><link rel="stylesheet" type="text/css" href="bin/css/bootstrap.min.css"><link rel="stylesheet" type="text/css" href="bin/css/style.css"></head><body>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.page.foot = function(opt_data, opt_ignored) {
  return ((opt_data.jsSrc != null) ? soy.$$filterNoAutoescape(opt_data.jsSrc) : '') + ((opt_data.exec != null) ? soy.$$filterNoAutoescape(opt_data.exec) : '') + '<script>\r\n          (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\r\n          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\r\n          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\r\n          })(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\r\n          ga(\'create\', \'UA-43440744-1\', \'videoastext.appspot.com\');\r\n          ga(\'send\', \'pageview\');\r\n        <\/script></body></html>';
};
