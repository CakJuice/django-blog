String.prototype.slugify = function() {
  return this.trim().replace(/[\W_]+/g, '-').toLowerCase();
}
