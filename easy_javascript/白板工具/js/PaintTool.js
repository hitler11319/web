(function (window, undefined) {
        var document = window.document;
        var tools = {},
              queue = [],
              clones = [];
        var PaintToolsProto = {
              _drawType: 'freestyle',
              _fontFace: 'sans-serif',
              _fontSize: '10px',
              _fontWeight: '400',
              _fontStyle: 'normal',
              get fillStyle() {
                    return this.ctx.fillStyle;
              },
              set fillStyle(val) {
                    this.ctx.fillStyle = val;
                    this.emit('fillStyle', val);
              },
              get strokeStyle() {
                    return this.ctx.strokeStyle;
                    this.emit('fillStyle', val);
              },
              set strokeStyle(val) {
                    this.ctx.strokeStyle = val;
                    this.emit('fillStyle', val);
              },
              get lineWidth() {
                    return this.ctx.lineWidth;
              },
              set lineWidth(val) {
                    this.ctx.lineWidth = val;
                    this.emit('lineWidth', val);
              },
              get lineCap() {
                    return this.ctx.lineCap;
              },
              set lineCap(val) {
                    this.ctx.lineCap = val;
                    this.emit('lineCap', val);
              },
              get lineJoin() {
                    return this.ctx.lineJoin;
              },
              set lineJoin(val) {
                    this.ctx.lineJoin = val;
                    this.emit('lineJoin', val);
              },
              get drawType() {
                    return this._drawType;
              },
              set drawType(val) {
                    this._drawType = val;
                    this.emit('drawType', val);
              },
              get fontFace() {
                    return this._fontFace;
              },
              set fontFace(val) {
                    this._fontFace = val;
                    this.ctx.font = this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + ' ' + this.fontFace;
                    this.emit('fontFace', val);
                    this.emit('font', this.ctx.font);
              },
              get fontSize() {
                    return this._fontSize;
              },
              set fontSize(val) {
                    this._fontSize = val;
                    this.ctx.font = this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + ' ' + this.fontFace;
                    this.emit('fontSize', val);
                    this.emit('font', this.ctx.font);
              },
              get fontWeight() {
                    return this._fontWeight;
              },
              set fontWeight(val) {
                    this._fontWeight = val;
                    this.ctx.font = this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + ' ' + this.fontFace;
                    this.emit('fontWeight', val);
                    this.emit('font', this.ctx.font);
              },
              get fontStyle() {
                    return this._fontStyle;
              },
              set fontStyle(val) {
                    this._fontStyle = val;
                    this.ctx.font = this.fontStyle + ' ' + this.fontWeight + ' ' + this.fontSize + ' ' + this.fontFace;
                    this.emit('fontStyle', val);
                    this.emit('font', this.ctx.font);
              },
        };

        // 註冊各事件
        window['$C'] = function (ctx) {
              var ret = new PaintTools(ctx);
              ret.regist(freestyle);
              ret.regist(strokeRect);
              ret.regist(fillRect);
              ret.regist(strokeCircle);
              ret.regist(fillCircle);
              ret.regist(strokeEclipse);
              ret.regist(fillEclipse);
              ret.regist(drawText);
              return ret;
        };
        var PaintTools = function (_ctx) {
              this.ctx = _ctx;
              this.emitter = EventEmitter;
              this.emitter();
              delete this.emitter;
        };
        PaintTools.prototype = PaintToolsProto;
        PaintTools.prototype.regist = function (tool) {
              if (typeof tool.type !== 'undefined' && typeof tool.run !== 'undefined') {
                    tools[tool.type] = tool;
              }
        };
        PaintTools.prototype.do = function () {
              var args = [];
              for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
              }
              if (typeof tools[this.drawType] !== 'undefined') {
                    tools[this.drawType].run.apply(this, args);
              }
        };
        PaintTools.prototype.pushCanvas = function () {
              clones.push(this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height));
        };
        PaintTools.prototype.popCanvas = function () {
              if (clones.length > 0) {
                    this.ctx.putImageData(clones.pop(), 0, 0);
              }
        };
        PaintTools.prototype.restoreCanvas = function () {
              if (clones.length > 0) {
                    this.ctx.putImageData(clones[0], 0, 0);
              }
        };
        PaintTools.prototype.dropCanvas = function () {
              if (clones.length > 0) {
                    clones.pop();
              }
        };

        // 各事件實作
        // 畫線
        var freestyle = {
              type: 'freestyle',
              run: function (x, y, x1, y1) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(x1, y1);
                    this.ctx.closePath();
                    this.ctx.stroke();
              },
        };
        // 外框矩型
        var strokeRect = {
              type: 'strokeRect',
              run: function (x, y, x1, y1) {
                    this.ctx.beginPath();
                    this.ctx.rect(x, y, x1 - x, y1 - y);
                    this.ctx.closePath();
                    this.ctx.stroke();
              },
        };
        // 填滿矩型
        var fillRect = {
              type: 'fillRect',
              run: function (x, y, x1, y1) {
                    this.ctx.beginPath();
                    this.ctx.rect(x, y, x1 - x, y1 - y);
                    this.ctx.closePath();
                    this.ctx.fill();
              },
        };
        // 外框圓
        var strokeCircle = {
              type: 'strokeCircle',
              run: function (x1, y1, x2, y2) {
                    var radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
                    this.ctx.beginPath();
                    this.ctx.arc(x1, y1, radius, 0, 2 * Math.PI, true);
                    this.ctx.closePath();
                    this.ctx.stroke();
              },
        };
        // 填滿圓
        var fillCircle = {
              type: 'fillCircle',
              run: function (x1, y1, x2, y2) {
                    var radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 2);
                    this.ctx.beginPath();
                    this.ctx.arc(x1, y1, radius, 0, 2 * Math.PI, true);
                    this.ctx.closePath();
                    this.ctx.fill();
              },
        };
        // 外框憜圓
        var strokeEclipse = {
              type: 'strokeEclipse',
              run: function (x1, y1, x2, y2) {
                    this.ctx.beginPath();
                    var xc1 = x1,
                          yc1 = y1 - Math.abs(y2 - y1),
                          xc2 = x2,
                          yc2 = y1 - Math.abs(y2 - y1),
                          xx2 = x2,
                          yy2 = y1,
                          xc3 = x2,
                          yc3 = y1 + Math.abs(y2 - y1),
                          xc4 = x1,
                          yc4 = y1 + Math.abs(y2 - y1);
                    this.ctx.moveTo(x1, y1);
                    this.ctx.bezierCurveTo(xc1, yc1, xc2, yc2, xx2, yy2);
                    this.ctx.bezierCurveTo(xc3, yc3, xc4, yc4, x1, y1);
                    this.ctx.closePath();
                    this.ctx.stroke();
              },
        };
        // 填滿憜圓
        var fillEclipse = {
              type: 'fillEclipse',
              run: function (x1, y1, x2, y2) {
                    this.ctx.beginPath();
                    var xc1 = x1,
                          yc1 = y1 - Math.abs(y2 - y1),
                          xc2 = x2,
                          yc2 = y1 - Math.abs(y2 - y1),
                          xx2 = x2,
                          yy2 = y1,
                          xc3 = x2,
                          yc3 = y1 + Math.abs(y2 - y1),
                          xc4 = x1,
                          yc4 = y1 + Math.abs(y2 - y1);
                    this.ctx.moveTo(x1, y1);
                    this.ctx.bezierCurveTo(xc1, yc1, xc2, yc2, xx2, yy2);
                    this.ctx.bezierCurveTo(xc3, yc3, xc4, yc4, x1, y1);
                    this.ctx.closePath();
                    this.ctx.fill();
              },
        };
        // 輸入文字
        var drawText = {
              type: 'drawText',
              run: function (text, x, y) {
                    this.ctx.textAlign = 'left';
                    this.ctx.fillText(text, x, y, this.ctx.measureText(text).width);
              },
        };
  })(window);