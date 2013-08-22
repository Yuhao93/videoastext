goog.provide('asv.Control');

goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.style');



/**
 * @param {function(boolean)} playPauseCallback The callback to call when the
 *    play/pause button is clicked.
 * @param {function(boolean)} fullscreenCallback The callback to call when the
 *    fullscreen button is clicked.
 * @param {function(number)} progressCallback the callback to call when the
 *    progress bar is changed.
 * @constructor
 */
asv.Control = function(playPauseCallback, fullscreenCallback, progressCallback) {
  /**
   * @type {Element}
   * @private
   */
  this.control_ = goog.dom.getElement('control');
  
  /**
   * @type {Element}
   * @private
   */
  this.progressContainer_ = goog.dom.getElement('video-progress');
  
  /**
   * @type {Element}
   * @private
   */
  this.progress_ = goog.dom.getElement('progress-bar');

  /**
   * @type {Element}
   * @private
   */
  this.playPause_ = goog.dom.getElement('play-pause');
  
  /**
   * @type {Element}
   * @private
   */
  this.fullscreen_ = goog.dom.getElement('fullscreen');
  
  /**
   * @type {boolean}
   * @private
   */
  this.isPlaying_ = true;
  
  /**
   * @type {boolean}
   * @private
   */
  this.isFullscreen_ = false;
  
  /**
   * @type {function(boolean)}
   * @private
   */
  this.playPauseCallback_ = playPauseCallback;
  
  /**
   * @type {function(boolean)}
   * @private
   */
  this.fullscreenCallback_ = fullscreenCallback;
  
  /**
   * @type {function(number)}
   * @private
   */
  this.progressCallback_ = progressCallback;
  
  goog.events.listen(this.playPause_, goog.events.EventType.CLICK,
      goog.bind(this.playPauseClick_, this));
  goog.events.listen(this.fullscreen_, goog.events.EventType.CLICK,
      goog.bind(this.fullscreenClick_, this));
  goog.events.listen(this.progressContainer_, goog.events.EventType.CLICK,
      goog.bind(this.trackProgress_, this));
};


/**
 * Function to be called when the play/pause button is clicked.
 */
asv.Control.prototype.playPauseClick_ = function() {
  goog.dom.removeChildren(this.playPause_);
  if (this.isPlaying_) {
    goog.dom.appendChild(this.playPause_,
        goog.dom.createDom('span', 'glyphicon glyphicon-play'));
  } else {
    goog.dom.appendChild(this.playPause_,
        goog.dom.createDom('span', 'glyphicon glyphicon-pause'));
  }
  this.isPlaying_ = !this.isPlaying_;
  this.playPauseCallback_(this.isPlaying_);
};


/**
 * Function to be called when the fullscreen button is clicked.
 */
asv.Control.prototype.fullscreenClick_ = function() {
  this.isFullscreen_ = !this.isFullscreen_;
  this.fullscreenCallback_(this.isFullscreen_);
};



/**
 * Updates the progress bar.
 * @param {number} progress The current progress.
 */
asv.Control.prototype.updateProgress = function(progress) {
  goog.style.setWidth(this.progress_, progress * 100 + '%');
};


/**
 * @param {boolean} shown Whether the container should be shown.
 */
asv.Control.prototype.setShown = function(shown) {
  goog.style.setStyle(this.control_, 'opacity', shown ? '1' : '0');
};


/**
 * @param {goog.events.BrowserEvent} e The browser event.
 */
asv.Control.prototype.trackProgress_ = function(e) {
  var progress = e.offsetX / goog.style.getSize(this.progressContainer_).width;
  this.progressCallback_(progress);
};