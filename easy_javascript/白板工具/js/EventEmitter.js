function EventEmitter() {
        var handlers = {};
        this.on = function (name, fn) {
              if (typeof handlers[name] == 'undefined') handlers[name] = [];
              handlers[name].push(fn);
        };
        this.emit = function () {
              var name = arguments[0];
              var args = [];
              for (var i = 1; i < arguments.length; i++) {
                    args.push(arguments[i]);
              }
              if (typeof handlers[name] !== 'undefined') {
                    handlers[name].forEach(function (fn) {
                          fn.apply(this, args);
                    });
              }
        };
  }