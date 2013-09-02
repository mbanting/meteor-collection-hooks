CollectionHooks.defineAdvice("find", function (userId, _super, aspects, getTransform, args) {
  var self = this
  var ctx = {context: self, _super: _super};
  var ret;

  // args[0] : selector
  // args[1] : options

  args[0] = args[0] || {};
  args[1] = args[1] || {};

  // before
  _.each(aspects.before, function (aspect) {
    aspect.call(ctx, userId, args[0], args[1]);
  });

  function after(cursor) {
    _.each(aspects.after, function (aspect) {
      aspect.call(ctx, userId, args[0], args[1], cursor);
    });
  }

  ret = _super.apply(self, args);
  after(ret);

  return ret;
});