goog.provide('asv.Screen');

goog.require('asv.Control');
goog.require('asv.Measure');
goog.require('goog.dom');
goog.require('goog.dom.fullscreen');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('goog.math.Size');
goog.require('goog.style');



/**
 * Ui view for the playback screen.
 * @param {function()} onHide Callback executed when the screen hides.
 * @param {function(boolean)} onPlayPause Callback executed when pressing the
 *    play/pause button.
 * @param {function(number)} onProgressUpdate Callback executed when tracking
 *    the progress bar.
 * @param {function(goog.math.Size, boolean)} onFullscreen Callback executed when toggling
 *    fullscreen mode.
 * @constructor
 */
asv.Screen = function(onHide, onPlayPause, onProgressUpdate, onFullscreen) {
  /**
   * @type {Element}
   * @private
   */
  this.bg_ = goog.dom.createDom('div', {'id': 'backing'});

  /**
   * @type {Element}
   * @private
   */
  this.screenContainer_ = goog.dom.getElement('video-container');

  /**
   * @type {Element}
   * @private
   */
  this.screen_ = goog.dom.getElement('screen');
  
  /**
   * @type {asv.Control}
   * @private
   */
  this.control_ = new asv.Control(onPlayPause,
      goog.bind(this.toggleFullscreen_, this),
      onProgressUpdate);

  /**
   * @type {boolean}
   * @private
   */
  this.isFullScreen_ = false;
  
  /**
   * @type {function()}
   * @private
   */
  this.onHide_ = onHide;
  
  /**
   * @type {function(goog.math.Size, boolean)}
   * @private
   */
  this.onFullscreen_ = onFullscreen;
  
  /**
   * @type {goog.dom.ViewportSizeMonitor}
   * @private
   */
  this.viewportSizeMonitor_ = new goog.dom.ViewportSizeMonitor();
  
  /**
   * @type {?goog.math.Size}
   * @private
   */
  this.offset_ = null;
  
  /**
   * @type {?goog.math.Size}
   * @private
   */
  this.videoSize_ = null;
  
  
  var windowSize = this.viewportSizeMonitor_.getSize();
  /**
   * @type {goog.math.Size}
   * @private
   */
  this.maxSize_ =
      new goog.math.Size(windowSize.width - 60, windowSize.height - 60);
  
  /**
   * @type {?number}
   * @private
   */
  this.timeout_ = null;
  this.hideControls_();
  

  goog.events.listen(this.screenContainer_, goog.dom.fullscreen.EventType.CHANGE, goog.bind(this.onFullScreenChange_, this));
};


/**
 * Make the screen visible.
 */
asv.Screen.prototype.show = function(videoSize) {
  var windowSize = this.viewportSizeMonitor_.getSize();
  this.videoSize_ = new goog.math.Size(videoSize.width, videoSize.height);
  var paddedVideoWidth = this.videoSize_.width + 20;
  var paddedVideoHeight = this.videoSize_.height + 20;
  this.offset_ = new goog.math.Size(
      (windowSize.width - paddedVideoWidth) / 2,
      (windowSize.height - paddedVideoHeight) / 2);
  
  goog.style.setWidth(this.screenContainer_, paddedVideoWidth);
  goog.style.setHeight(this.screenContainer_, paddedVideoHeight);
  goog.style.setPosition(this.screenContainer_, this.offset_.width,
      this.offset_.height);
  
  goog.style.setWidth(this.screen_, this.videoSize_.width);
  goog.style.setHeight(this.screen_, this.videoSize_.height);
  goog.style.setPosition(this.screen_, 10, 10);
  
  goog.style.setElementShown(this.screenContainer_, true);
  goog.events.listen(document, goog.events.EventType.KEYDOWN,
      goog.bind(this.keyHandler_, this));
  goog.events.listen(document, goog.events.EventType.MOUSEMOVE,
      goog.bind(this.moveHandler_, this));
  
  goog.dom.insertSiblingBefore(this.bg_, this.screenContainer_);
};


/**
 * Hide the screen.
 */
asv.Screen.prototype.hide = function() {
  goog.dom.removeNode(this.bg_);
  goog.style.setElementShown(this.screenContainer_, false);
  goog.events.unlisten(document, goog.events.EventType.KEYDOWN,
      goog.bind(this.keyHandler_, this));
  this.onHide_();
};


/**
 * @param {boolean} fullscreen whether or not to go into fullscreen mode.
 */
asv.Screen.prototype.fullscreen = function(fullscreen) {
  this.isFullScreen_ = fullscreen;
  if (fullscreen) {
    if (this.screenContainer_) {
      goog.dom.fullscreen.requestFullScreen(this.screenContainer_);
    }
  }
};


/**
 * @param {string} frame The frame to draw.
 */
asv.Screen.prototype.drawFrame = function(frame) {
  goog.dom.setTextContent(this.screen_, frame);
};


/**
 * @param {number} progress The amount of the video that has been played.
 */
asv.Screen.prototype.update = function(progress) {
  this.control_.updateProgress(progress);
};


/**
 * @return {goog.math.Size}
 */
asv.Screen.prototype.getMaxSize = function() {
  return this.maxSize_;
};


/**
 * @param {goog.math.Size} size The size to set the screen to.
 * @param {boolean} isFullscreen Whether or not the screen is full-screen.
 */
asv.Screen.prototype.setScreenSize = function(size, isFullscreen) {
  var windowSize = this.viewportSizeMonitor_.getSize();
  goog.style.setWidth(this.screen_, size.width);
  goog.style.setHeight(this.screen_, size.height);
  if (isFullscreen) {
    goog.style.setPageOffset(this.screen_, (windowSize.width - size.width) / 2,
        (windowSize.height - size.height) / 2);
  } else {
    goog.style.setWidth(this.screenContainer_, size.width + 20);
    goog.style.setHeight(this.screenContainer_, size.height + 20);
    goog.style.setPosition(this.screen_, 10, 10);
  }
};


/**
 * @param {goog.events.Event} e The event.
 * @private
 */
asv.Screen.prototype.moveHandler_ = function(e) {
  this.control_.setShown(true);
  if (this.timeout_ != null) {
    clearTimeout(this.timeout_);
  }
  this.timeout_ = setTimeout(goog.bind(this.hideControls_, this), 3000);
};


/**
 * @private
 */
asv.Screen.prototype.hideControls_ = function() {
  this.control_.setShown(false);
};


/**
 * @param {boolean} fullscreen Whether the app is in full screen mode.
 * @private
 */
asv.Screen.prototype.toggleFullscreen_ = function(fullscreen) {
  this.fullscreen(fullscreen);
};


/**
 * @param {goog.events.KeyEvent} e The event.
 * @private
 */
asv.Screen.prototype.keyHandler_ = function(e) {
  if (e.keyCode == 27) {
    if (this.isFullScreen_) {
      this.fullscreen(false);
    } else {
      this.hide();
    }
  }
};


asv.Screen.prototype.onFullScreenChange_ = function() {
  if (goog.dom.fullscreen.isFullScreen()) {
    var windowSize = this.viewportSizeMonitor_.getSize();
    goog.dom.classlist.add(this.screenContainer_, 'fullscreen');
    goog.style.setWidth(this.screenContainer_, windowSize.width);
    goog.style.setHeight(this.screenContainer_, windowSize.height);
    this.onFullscreen_(windowSize, true);
  } else {
    goog.dom.classlist.remove(this.screenContainer_, 'fullscreen');
    this.onFullscreen_(this.maxSize_, false);
  }
};