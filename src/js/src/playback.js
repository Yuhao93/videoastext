goog.provide('asv.Playback');

goog.require('asv.Screen');
goog.require('asv.Video');
goog.require('goog.async.AnimationDelay');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyEvent');



/**
 * @param {asv.Video} video Video to play back.
 * @constructor
 */
asv.Playback = function(video) {

  /**
   * @type {asv.Video}
   * @private
   */
  this.video_ = video;
  
  /**
   * @type {asv.Screen}
   * @private
   */
  this.screen_ = new asv.Screen(goog.bind(this.onHide_, this),
      goog.bind(this.togglePlayPause_, this),
      goog.bind(this.updateProgress_, this),
      goog.bind(this.onFullscreen_, this));
  
  /**
   * @type {goog.async.AnimationDelay}
   * @private
   */
  this.timeout_ = new goog.async.AnimationDelay(goog.bind(this.play, this));

  this.video_.setFrameMaxSize(asv.Measure.instance.calculateMaximum(
      this.screen_.getMaxSize()));
};


/**
 * Play the screen
 */
asv.Playback.prototype.play = function() {
  var frameSize = this.video_.getFrameSize();
  if (!this.video_.isPlaying()) {
    this.video_.play();
    this.screen_.show(asv.Measure.instance.calculateSize(frameSize));
  }

  var frame = this.video_.getCurrentFrame();
  if (frame) {
    var progress = this.video_.getCurrentTime() / this.video_.getDuration();
    this.screen_.update(progress);
    this.screen_.drawFrame(frame);
    this.timeout_.start();
  } else {
    this.screen_.hide();
  }
};


/**
 * @private
 */
asv.Playback.prototype.onHide_ = function() {
  this.video_.stop();
  this.timeout_.stop();
};


/**
 * @param {boolean} playing Whether the app is playing.
 * @private
 */
asv.Playback.prototype.togglePlayPause_ = function(playing) {
  if (!playing) {
    this.video_.pause();
    this.timeout_.stop();
  } else {
    this.video_.play();
    this.play();
  }
}


/**
 * @param {number} progress The progress to update to.
 * @private
 */
asv.Playback.prototype.updateProgress_ = function(progress) {
  this.video_.setCurrentTime(progress * this.video_.getDuration());
};


/**
 * @param {goog.math.Size} size The new size to set the video to.
 * @param {boolean} isFullscreen Whether or not the screen is full-screen.
 * @private
 */
asv.Playback.prototype.onFullscreen_ = function(size, isFullscreen) {
  this.video_.setFrameMaxSize(asv.Measure.instance.calculateMaximum(size));
  var frameSize = asv.Measure.instance.calculateSize(this.video_.getFrameSize());
  this.screen_.setScreenSize(frameSize, isFullscreen);
};
