goog.provide('asv.Video');

goog.require('goog.dom');
goog.require('goog.math.Size');



/**
 * @param {string} src The video source.
 * @constructor
 */
asv.Video = function(src) {

  /**
   * @type {number}
   * @private
   */
  this.width_ = 0;

  /**
   * @type {number}
   * @private
   */
  this.height_ = 0;

  /**
   * @type {HTMLCanvasElement}
   * @private
   */
  this.canvas_ = /** @type {HTMLCanvasElement} */
      (goog.dom.createElement('canvas'));

  /**
   * @type {CanvasRenderingContext2D}
   * @private
   */
  this.context_ = /** @type {CanvasRenderingContext2D} */
      (this.canvas_.getContext('2d'));

  /**
   * @type {HTMLVideoElement}
   * @private
   */
  this.videoContainer_ = /** @type {HTMLVideoElement} */
      (goog.dom.createElement('video'));
  this.videoContainer_.src = src;
  this.videoContainer_.volume = 1;
  this.videoContainer_.style.display = 'none';
  goog.dom.appendChild(document.body, this.videoContainer_);

  /**
   * @type {boolean}
   */
  this.isPlaying_ = false;
};


/**
 * @type {string}
 */
asv.Video.PALETTE = ' .:ivr*[1$XO@%#M';


/**
 * @param {ImageData} imageData The frame to convert.
 * @return {string} The ascii canvas of the current frame in the canvas.
 * @private
 */
asv.Video.prototype.convertFrame_ = function(imageData) {
  var frame = [];
  var data = imageData.data;
  for ( var y = 0; y < this.height_; y++) {
    for ( var x = 0; x < this.width_; x++) {
      var ind = ((y * this.width_) + x) * 4;
      var r = data[ind];
      var g = data[ind + 1];
      var b = data[ind + 2];
      var l = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
      frame.push(
          asv.Video.PALETTE[Math.floor(l * asv.Video.PALETTE.length / 256)]);
    }
    if (y < this.height_ - 1) {
      frame.push('<br>');
    }
  }
  return frame.join('');
};


/**
 * @returns {?string} Returns the current frame.
 */
asv.Video.prototype.getCurrentFrame = function() {
  if (this.videoContainer_.currentTime >= this.videoContainer_.duration) {
    this.stop();
    return null;
  }

  this.context_.drawImage(this.videoContainer_,
      0, 0, this.videoContainer_.videoWidth, this.videoContainer_.videoHeight,
      0, 0, this.width_, this.height_);
  var frame = this.convertFrame_(this.context_.getImageData(0, 0, this.width_,
      this.height_));
  return frame;
};


/**
 * Start playing the video.
 */
asv.Video.prototype.play = function() {
  this.videoContainer_.play();
  this.isPlaying_ = true;
};


/**
 * Pause the video.
 */
asv.Video.prototype.pause = function() {
  this.videoContainer_.pause();
  this.isPlaying_ = false;
};


/**
 * Stop playing the video.
 */
asv.Video.prototype.stop = function() {
  this.pause();
  this.videoContainer_.currentTime = 0;
}

/**
 * @return {number} Returns the width of the frame.
 */
asv.Video.prototype.getWidth = function() {
  return this.width_;
};

/**
 * @return {number} Returns the height of the frame.
 */
asv.Video.prototype.getHeight = function() {
  return this.height_;
};


/**
 * @return {number} Returns the current time of the video.
 */
asv.Video.prototype.getCurrentTime = function() {
  return this.videoContainer_.currentTime;
};


/**
 * @param {number} time The current time to set.
 */
asv.Video.prototype.setCurrentTime = function(time) {
  this.videoContainer_.currentTime = time;
};


/**
 * @return {number} Returns the duration of the video.
 */
asv.Video.prototype.getDuration = function() {
  return this.videoContainer_.duration;
};

/**
 * @return {boolean} Returns true if the video is playing.
 */
asv.Video.prototype.isPlaying = function() {
  return this.isPlaying_;
}


/**
 * Sets the output dimensions to ensure that they don't exceed
 *    the given max size.
 * @param {goog.math.Size} size The max size the frame can be.
 */
asv.Video.prototype.setFrameMaxSize = function(size) {
  var ratioWidth = size.width / this.videoContainer_.videoWidth;
  var ratioHeight = size.height / this.videoContainer_.videoHeight;
  var ratio = ratioWidth < ratioHeight ? ratioWidth : ratioHeight;
  this.setFrameSize(new goog.math.Size(
      Math.floor(ratio * this.videoContainer_.videoWidth),
      Math.floor(ratio * this.videoContainer_.videoHeight)));
  
};


/**
 * @return {boolean} True if frame size can be set.
 */
asv.Video.prototype.canSetFrameSize = function() {
  return this.videoContainer_.videoWidth > 0 &&
      this.videoContainer_.videoHeight > 0;
};


/**
 * Sets the output dimensions.
 * @param {goog.math.Size} size The new output frame size.
 */
asv.Video.prototype.setFrameSize = function(size) {
  this.width_ = 2 * size.width;
  this.height_ = size.height;
  this.canvas_.width = this.width_;
  this.canvas_.height = this.height_;
};


/**
 * @return {?goog.math.Size} The dimensions of the frame, or null
 *      if not yet ready.
 */
asv.Video.prototype.getFrameSize = function() {
  return this.canSetFrameSize() ?
      new goog.math.Size(this.width_, this.height_) : null;
};
