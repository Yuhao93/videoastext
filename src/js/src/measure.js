goog.provide('asv.Measure');

goog.require('goog.dom');
goog.require('goog.math.Size');
goog.require('goog.style');



/**
 * Wraps the ui measuring stick to determine how many characters can
 *    fit on screen.
 * @constructor
 */
asv.Measure = function() {
  /**
   * @type {Element}
   * @private
   */
  this.measure_ = goog.dom.getElement('measure');
  
  /**
   * @type {goog.math.Size}
   * @private
   */
  this.size_ = goog.style.getSize(this.measure_);
};

/**
 * @type {asv.Measure}
 */
asv.Measure.instance = new asv.Measure();

/**
 * @return {goog.math.Size} Returns the size of a single character.
 */
asv.Measure.prototype.getUnitSize = function() {
  return this.size_;
};


/**
 * Calculates how many characters can in both directions.
 * @param {goog.math.Size} dimension The dimensions to measure with
 *    the character.
 * @return {goog.math.Size} Returns the measured width and height.
 */
asv.Measure.prototype.calculateMaximum = function(dimension) {
  return new goog.math.Size(Math.floor(dimension.width / this.size_.width),
      Math.floor(dimension.height / this.size_.height));
};


/**
 * Calculates how much room the given number of characters will take up.
 * @param {goog.math.Size} dimension The number of characters in both directions.
 * @return {goog.math.Size} Returns the measured width and height.
 */
asv.Measure.prototype.calculateSize = function(dimension) {
  return new goog.math.Size(dimension.width * this.size_.width,
      dimension.height * this.size_.height);
};
