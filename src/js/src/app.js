goog.provide('asv.App');

goog.require('asv.Affix');
goog.require('asv.FileReader');
goog.require('asv.Playback');
goog.require('asv.Video');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.style');
goog.require('org.haodev.asv.main');
goog.require('soy');


/**
 * @constructor
 */
asv.App = function() {

  /**
   * @type {?asv.Video}
   * @private
   */
  this.video_ = null;

  /**
   * @type {?asv.Playback}
   * @private
   */
  this.playback_ = null;

  /**
   * @type {Element}
   * @private
   */
  this.container_ = goog.dom.getElementByClass('form');

  /**
   * @type {Element}
   * @private
   */
  this.videoButton_ = goog.dom.getElement('video');
  
  /**
   * @type {Element}
   * @private
   */
  this.playButton_ = goog.dom.getElement('play');

  var affix = new asv.Affix(this.videoButton_, goog.bind(function(e) {
    if (!goog.dom.classlist.contains(this.videoButton_, 'disabled')) {
      this.parseVideo_();
      goog.dom.classlist.add(this.videoButton_, 'disabled');
      goog.dom.classlist.add(this.playButton_, 'disabled');
      var progress = goog.dom.createDom('div', {
          'class': 'progress progress-striped active',
          'id': 'progress'
      }, goog.dom.createDom('div', {
          'class': 'progress-bar progress-bar-success',
          'style': 'width:100%'
      }));
      goog.dom.appendChild(goog.dom.getElement('control-container'), progress);
    }
  }, this));

  /**
   * @type {asv.FileReader}
   * @private
   */
  this.fileReader_ = new asv.FileReader(goog.dom.getElement('file'));
  
  goog.events.listen(this.playButton_, goog.events.EventType.CLICK,
      goog.bind(function() {
    if (!goog.dom.classlist.contains(this.playButton_, 'disabled')) {
      this.playVideo_();
    }
  }, this));

  goog.events.listen(goog.dom.getElement('sample-hummingbird'),
      goog.events.EventType.CLICK,
      goog.bind(this.parseVideo_, this,
      goog.bind(this.playVideo_, this),
      'static/hummingbird.mp4'));
  goog.events.listen(goog.dom.getElement('sample-superman'),
      goog.events.EventType.CLICK,
      goog.bind(this.parseVideo_, this,
      goog.bind(this.playVideo_, this),
      'static/superman.mp4'));

  goog.dom.appendChild(document.body, soy.renderAsFragment(org.haodev.asv.main.video));
  goog.style.setElementShown(goog.dom.getElement('video-container'), false);
};


/**
 * Parse the video when submitted.
 * @param {function()=} opt_callback Callback for when the video has been
 *    loaded.
 * @param {string=} dataUrl If empty, read from file, else, parse the video.
 */
asv.App.prototype.parseVideo_ = function(opt_callback, dataUrl) {
  if (!dataUrl) {
    this.fileReader_.parseFile(
        goog.bind(this.parseVideo_, this, opt_callback));
  } else {
    this.video_ = new asv.Video(dataUrl);
    this.waitForVideoLoaded_(opt_callback);
  }
};


/**
 * @param {function()=} opt_callback Callback for when the video has been
 *    loaded.
 */
asv.App.prototype.waitForVideoLoaded_ = function(opt_callback) {
  if (this.video_.canSetFrameSize()) {
    this.playback_ = new asv.Playback(this.video_);
    goog.dom.classlist.remove(this.videoButton_, 'disabled');
    goog.dom.classlist.remove(this.playButton_, 'disabled');
    goog.dom.removeNode(goog.dom.getElement('progress'));
    if (opt_callback) {
      opt_callback();
    }
  } else {
    setTimeout(goog.bind(this.waitForVideoLoaded_, this, opt_callback), 100);
  }
};


/**
 * Plays the current video.
 */
asv.App.prototype.playVideo_ = function() {
  this.playback_.play();
};
