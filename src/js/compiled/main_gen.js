// This file was automatically generated from main.soy.
// Please don't edit this file by hand.

goog.provide('org.haodev.asv.main');

goog.require('soy');
goog.require('soydata');
goog.require('org.haodev.asv.page');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.main.page = function(opt_data, opt_ignored) {
  return org.haodev.asv.page.doc({title: 'Video as text', desc: 'Enjoy videos at super-low resolution.', page: 'main', content: org.haodev.asv.main.content(null), playsVideo: true, jsSrc: org.haodev.asv.main.jsSrc(null), exec: org.haodev.asv.main.exec(null)});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.main.jsSrc = function(opt_data, opt_ignored) {
  return '<script type="text/javascript" src="bin/js/app.min.js"><\/script>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.main.exec = function(opt_data, opt_ignored) {
  return '<script type="text/javascript">var app = new asv.App();<\/script>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.main.content = function(opt_data, opt_ignored) {
  return '<div class="jumbotron"><h2 style="margin-bottom:20px;">Play a sample text video</h2><div class="btn-group"><div class="btn btn-success btn-lg btn-video" id="sample-hummingbird">Hummingbird</div><div class="btn btn-success btn-lg btn-video" id="sample-superman">Man of Steel</div></div></div><div class="jumbotron" id="control-container"><h2 style="margin-bottom:20px;">Or play your own video</h2><a href="#" id="video" class="btn btn-default btn-lg btn-control">Load Video</a> <a href="#" id="play" class="btn btn-success  btn-lg btn-control disabled">Play</a></div>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.main.video = function(opt_data, opt_ignored) {
  return '<div id="video-container"><div id="screen" class="monospace-canvas"></div><div id="control"><div class="btn btn-default pause" id="play-pause"><span class="glyphicon glyphicon-pause"></span></div><div class="progress" id="video-progress"><div class="progress-bar" id="progress-bar"></div></div><div class="btn btn-default pull-right fullscreen" id="fullscreen" style="right:0px;"><span class="glyphicon glyphicon-fullscreen"></span></div></div></div><div id="measure" class="monospace-canvas">.</div>';
};
