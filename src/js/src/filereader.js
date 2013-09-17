goog.provide('asv.FileReader');



/**
 * @param {Element} upload The upload input.
 * @constructor
 */
asv.FileReader = function(upload) {
  /**
   * @type {Element}
   * @private
   */
  this.upload_ = upload;
};


/**
 * @return {boolean} True if the browser supports file reading.
 */
asv.FileReader.supportsFileReader = function() {
  return window.File && window.FileReader && window.FileList && window.Blob;
};


/**
 * @param {function(string)} callback Callback for when the file has been converted.
 * @return {Array.<number>} raw byte data of the file.
 */
asv.FileReader.prototype.parseFile = function(callback) {
  var file = this.upload_.files[0];
  var fileReader = new FileReader();

  //Closure to capture the file information.
  fileReader.onload = function(e) {
    callback(e.target.result);
  };

  // Read in the image file as a data URL.
  fileReader.readAsDataURL(file);
};
