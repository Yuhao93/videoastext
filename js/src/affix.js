goog.provide('asv.Affix');

goog.require('goog.dom');
goog.require('goog.events');



/**
 * @param {Element} target The target to affix a file selector to.
 * @param {function(Element)} callback The callback for when a file select
 *      update happens.
 * @constructor
 */
asv.Affix = function(target, callback) {
  /**
   * @type {Element}
   * @private
   */
  this.file_ = goog.dom.createDom('input', {
    'type': 'file',
    'id': 'file'
  });
  goog.dom.appendChild(goog.dom.getParentElement(target), this.file_);
  goog.events.listen(target, goog.events.EventType.CLICK,
      goog.bind(this.onTargetClick_, this));
  goog.events.listen(this.file_, goog.events.EventType.CHANGE,
      goog.bind(function(){
    callback(this.file_);
  }, this));
};


/**
 * @private
 */
asv.Affix.prototype.onTargetClick_ = function() {
  this.file_.click();
}