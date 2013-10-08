
// /**
//  * 
//  */

// Array.prototype.clean = function(deleteValue) {
//   for (var i = 0; i < this.length; i++) {
//     if (this[i] == deleteValue) {         
//       this.splice(i, 1);
//       i--;
//     }
//   }
//   return this;
// };

// /**
//  * 
//  */

// String.prototype.capsFirst = function() {
//   return this.charAt(0).toUpperCase() + this.slice(1);
// };

// /**
//  *
//  */

// String.prototype.isObjectId = function() {
//   var regexp = new RegExp('^[0-9a-fA-F]{24}$');
//   return regexp.test(this);
// };