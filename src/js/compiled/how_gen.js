// This file was automatically generated from how.soy.
// Please don't edit this file by hand.

goog.provide('org.haodev.asv.how');

goog.require('soy');
goog.require('soydata');
goog.require('org.haodev.asv.page');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.how.page = function(opt_data, opt_ignored) {
  return org.haodev.asv.page.doc({title: 'How', desc: '', page: 'how', content: org.haodev.asv.how.content(null), playsVideo: false, jsSrc: null, exec: null});
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.how.content = function(opt_data, opt_ignored) {
  return '<h2>Behind the scenes</h2><p>This page walks you through the key points of how it was done. There will be a few code snippets, but if you want the entire source, the code is <a href="https://github.com/Yuhao93/videoastext" target="_blank">here</a>.<br> </p><p>In this experiment, I used several Html5 specific goodies, including the Canvas, the Video functionality, and the FileReader api. This method works when playing videos that are small enough to fit comfortably inside your RAM, so unless you plan on playing a full-blown movie (really?) you should be okay.<br><br></p><h3 class="section">Playing videos (local ones) with Html5</h3><h4 class="section">Reading local files</h4><br><p>Before Html5, in order to parse a file on the user\'s local file system, you\'d need to upload it to the server as part of a form submission. Thankfully, Html5 gives us easier ways of parsing user uploaded files, ones that don\'t even need to involve any kind of server request. The FileReader api allows us to parse a user uploaded file on the client side into any number of useful formats.</p><p>If only we could convert a user uploaded file into a data url, then we could totally play a local video using the &lt;video&gt; tag...oh that\'s, right, we can!</p><pre class="prettyprint">' + org.haodev.asv.how.filereaderCode(null) + '</pre><h4 class="section">Grabbing video frames with Canvas</h4><br><p>Ok, now that we have a video that\'s playing our uploaded file, what\'s next? We have a video but it\'s boring and <i>"high definition"</i>. We need to kick it down a few notches. What better way to do that then turn it into ascii art? The first step to doing this is grabing the image frames in a way where we can process them.</p><pre class="prettyprint">' + org.haodev.asv.how.canvasCode1(null) + '</pre><p>Uh oh, what did I say in the previous code snippet? That it might not work? This is because you generally can\'t grab data from resources from other domains, so we\'re more or less stuck with data urls.</p><p>Now that we\'ve grabbed an image, we can easily wrap this into a timeout so we can grab the current frame every so often.</p><pre class="prettyprint">' + org.haodev.asv.how.canvasCode2(null) + '</pre><h3 class="section">Converting an image into text</h3><h4 class="section">Pixels as characters</h4><br><p>Now that we are grabbing the current video frame every so often, it\'s time to turn each of those frames into text. We can achieve this by following a simple algorithm:<ul><li>Create a text buffer of some kind, with length w * h </li><li>Shrink the image down to a w * h image</li><li>For each pixel in the image:</li><ul><li>Compute the luminance (basially the brightness) of the pixel, I used the formula: <pre class="prettyprint">var lum = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);</pre> where r, g, and b are the red, green, and blue components of the pixel, respectively. This formula is based on the idea that red, green, and blue components are generally percieved with different levels of brightness. Green components are brighter than their red and blue counterparts, so they are given a much high constant. <br><br><b>Note: </b>If you really want to be accurate, you can\'t just use the rgb components from the [0-255] range, you need to transform them into a linear space by applying an inverse gamma function to each component, see <a href="http://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color#answer-13558570" target="_blank">here</a> for a better explanation. The result of not applying this transformation means we will lose some accuracy in our luminance calculation.</li><br><li>Determine the corresponding character for the luminance, for example, a low luminance might map to the blank character while a high luminance might map to the capital M.</li><br><li>Add this character to the text buffer. Also add a line break at the end of every line.</li></ul></ul></p><pre class="prettyprint">' + org.haodev.asv.how.pixelCode(null) + '</pre><p><b>And that\'s pretty much how it all works. Everything else is just putting it all together and creating a nice ui around it.</b></p>';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.how.filereaderCode = function(opt_data, opt_ignored) {
  return '\r\n// Lets say that the user has uploaded a file into a file input with the id\r\n// \'file-upload\'\r\nvar fileUploadElement = document.getElementById(\'file-upload\');\r\n// We are able to grab the file out of the input\r\nvar file = fileUploadElement.files[0];\r\n\r\n// Create a file reader to read the contents of the file\r\nvar fileReader = new FileReader();\r\nfileReader.onload = function(e) {\r\n  // When onload is called, target.result will contain the data url we need.\r\n  // A data url is convenient for our needs, because we can plug it directly\r\n  // into a video tag\'s source.\r\n  setVideoSource(e.target.result);\r\n};\r\n\r\n// Read the selected user file into a data url in a format like:\r\n// data:video/mp4;base64,lotsofcharacters\r\nfileReader.readAsDataURL(file);\r\n';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.how.canvasCode1 = function(opt_data, opt_ignored) {
  return '\r\n// Suppose that our video that is playing is in a &lt;video&gt; tag with id\r\n// \'video-src\'\r\nvar video = document.getElementById(\'video-src\');\r\n\r\n// Now lets create a canvas element.\r\nvar canvas = document.createElement(\'canvas\');\r\ncanvas.width = 640;\r\ncanvas.height = 480;\r\nvar canvasContext = canvas.getContext(\'2d\');\r\n\r\n// What? Does that make sense? The method name is drawImage,\r\n// but your passing in a video element?\r\n// Yep. That\'s how you do it. Now the current video frame is drawn onto the\r\n// canvas.\r\ncanvasContext.drawImage(video,\r\n    0, 0, video.videoWidth, video.videoHeight,\r\n    0, 0, canvas.width,  canvas.height\r\n);\r\n\r\n// This next part is where the ascii magic happens, but it can also fail if the\r\n// video source wasn\'t loaded from a data-url or from a file in your domain. \r\nprocessImageData(canvasContext.getImageData(0, 0, canvas.width, canvas.height));\r\n';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.how.canvasCode2 = function(opt_data, opt_ignored) {
  return '\r\n// Suppose that our video that is playing is in a &lt;video&gt; tag with id\r\n// \'video-src\'\r\nvar video = document.getElementById(\'video-src\');\r\n\r\n// Now lets create a canvas element.\r\nvar canvas = document.createElement(\'canvas\');\r\ncanvas.width = 640;\r\ncanvas.height = 480;\r\nvar canvasContext = canvas.getContext(\'2d\');\r\n\r\nvar processCurrentFrame = function() {\r\n  // Now the current video frame is drawn onto the canvas.\r\n  canvasContext.drawImage(video,\r\n      0, 0, video.videoWidth, video.videoHeight,\r\n      0, 0, canvas.width,  canvas.height\r\n  );\r\n\r\n  processImageData(\r\n    canvasContext.getImageData(0, 0, canvas.width, canvas.height));\r\n  setTimeout(processCurrentFrame, 32);\r\n};\r\nprocessCurrentFrame();\r\n';
};


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @notypecheck
 */
org.haodev.asv.how.pixelCode = function(opt_data, opt_ignored) {
  return '\r\n// Remember that this is how we grabbed the image data from the canvas and that\r\n// it\'ll only work if we haven\'t drawn any cross domain images (or videos) onto\r\n// the canvas. We can assume that the image is already scaled down, since we\r\n// scaled the video when we drew it onto the canvas.\r\nvar imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);\r\n\r\n// The pixel data is in the data field of imageData\r\nvar data = imageData.data;\r\n\r\n// Iterate through our image\r\nfor ( var y = 0; y < canvas.height; y++) {\r\n  for ( var x = 0; x < canvas.width; x++) {\r\n    // data is a 1d array. A pixel is comprised of four bytes,\r\n    // the red, green, blue, and alpha components respectively.\r\n    // Therefore, each pixel at {x, y} is stored beginning at\r\n    // (y * width + x) * 4\r\n    var ind = ((y * canvas.width) + x) * 4;\r\n    var r = data[ind];\r\n    var g = data[ind + 1];\r\n    var b = data[ind + 2];\r\n    var l = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);\r\n\r\n    // frame is a string\r\n    frame += getCharacterFromLuminance(l);\r\n  }\r\n  if (y < canvas.height - 1) {\r\n    frame += \'\\n\';\r\n  }\r\n}\r\n';
};
