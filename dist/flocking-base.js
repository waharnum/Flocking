/*! Flocking 0.2.0-dev, Copyright 2015 Colin Clark | flockingjs.org */

// -*- mode: javascript; tab-width: 2; indent-tabs-mode: nil; -*-
//------------------------------------------------------------------------------
// Web Array Math API - JavaScript polyfill
//
// Copyright(c) 2013 Marcus Geelnard
//
// This software is provided 'as-is', without any express or implied warranty.
// In no event will the authors be held liable for any damages arising from the
// use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not claim
//    that you wrote the original software. If you use this software in a
//    product, an acknowledgment in the product documentation would be
//    appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such, and must not be
//    misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source distribution.
//------------------------------------------------------------------------------

"use strict";

//------------------------------------------------------------------------------
// interface ArrayMath
//------------------------------------------------------------------------------


(function () {
  var context = typeof (window) !== "undefined" ? window :
    typeof (self) !== "undefined" ? self :
    typeof module !== "undefined" && module.exports ? module.exports :
    global;

  if (context.ArrayMath) return;

  var ArrayMath = {};

  ArrayMath.add = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] + y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x + y[k];
  };

  ArrayMath.sub = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] - y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x - y[k];
  };

  ArrayMath.mul = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] * y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x * y[k];
  };

  ArrayMath.mulCplx = function (dstReal, dstImag, xReal, xImag, yReal, yImag) {
    var k, xr, xi, yr, yi;
    if (xReal instanceof Float32Array)
      for (k = Math.min(dstReal.length, dstImag.length, xReal.length, xImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        xr = xReal[k], xi = xImag[k], yr = yReal[k], yi = yImag[k];
        dstReal[k] = xr * yr - xi * yi;
        dstImag[k] = xr * yi + xi * yr;
      }
    else
      for (k = Math.min(dstReal.length, dstImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        yr = yReal[k], yi = yImag[k];
        dstReal[k] = xReal * yr - xImag * yi;
        dstImag[k] = xReal * yi + xImag * yr;
      }
  };

  ArrayMath.div = function (dst, x, y) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = x[k] / y[k];
    else
      for (k = Math.min(dst.length, y.length) - 1; k >= 0; --k)
        dst[k] = x / y[k];
  };

  ArrayMath.divCplx = function (dstReal, dstImag, xReal, xImag, yReal, yImag) {
    var k, xr, xi, yr, yi, denom;
    if (xReal instanceof Float32Array)
      for (k = Math.min(dstReal.length, dstImag.length, xReal.length, xImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        xr = xReal[k], xi = xImag[k], yr = yReal[k], yi = yImag[k];
        denom = 1 / (yr * yr + yi * yi);
        dstReal[k] = (xr * yr + xi * yi) * denom;
        dstImag[k] = (xi * yr - xr * yi) * denom;
      }
    else {
      for (k = Math.min(dstReal.length, dstImag.length, yReal.length, yImag.length) - 1; k >= 0; --k) {
        yr = yReal[k], yi = yImag[k];
        denom = 1 / (yr * yr + yi * yi);
        dstReal[k] = (xReal * yr + xImag * yi) * denom;
        dstImag[k] = (xImag * yr - xReal * yi) * denom;
      }
    }
  };

  ArrayMath.madd = function (dst, x, y, z) {
    var k;
    if (x instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length, z.length) - 1; k >= 0; --k)
        dst[k] = x[k] * y[k] + z[k];
    else
      for (k = Math.min(dst.length, y.length, z.length) - 1; k >= 0; --k)
        dst[k] = x * y[k] + z[k];
  };

  ArrayMath.abs = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.abs(x[k]);
  };

  ArrayMath.absCplx = function (dst, real, imag) {
    for (var k = Math.min(dst.length, real.length, imag.length) - 1; k >= 0; --k)
      dst[k] = Math.sqrt(real[k] * real[k] + imag[k] * imag[k]);
  };

  ArrayMath.acos = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.acos(x[k]);
  };

  ArrayMath.asin = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.asin(x[k]);
  };

  ArrayMath.atan = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.atan(x[k]);
  };

  ArrayMath.atan2 = function (dst, y, x) {
    for (var k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
      dst[k] = Math.atan2(y[k], x[k]);
  };

  ArrayMath.ceil = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.ceil(x[k]);
  };

  ArrayMath.cos = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.cos(x[k]);
  };

  ArrayMath.exp = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.exp(x[k]);
  };

  ArrayMath.floor = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.floor(x[k]);
  };

  ArrayMath.log = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.log(x[k]);
  };

  ArrayMath.max = function (x) {
    var ret = -Infinity;
    for (var k = x.length - 1; k >= 0; --k) {
      var val = x[k];
      if (val > ret)
        ret = val;
    }
    return ret;
  };

  ArrayMath.min = function (x) {
    var ret = Infinity;
    for (var k = x.length - 1; k >= 0; --k) {
      var val = x[k];
      if (val < ret)
        ret = val;
    }
    return ret;
  };

  ArrayMath.pow = function (dst, x, y) {
    var k;
    if (y instanceof Float32Array)
      for (k = Math.min(dst.length, x.length, y.length) - 1; k >= 0; --k)
        dst[k] = Math.pow(x[k], y[k]);
    else {
      for (k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
        dst[k] = Math.pow(x[k], y);
    }
  };

  ArrayMath.random = function (dst, low, high) {
    if (!low)
      low = 0;
    if (isNaN(parseFloat(high)))
      high = 1;
    var scale = high - low;
    for (var k = dst.length - 1; k >= 0; --k)
      dst[k] = Math.random() * scale + low;
  };

  ArrayMath.round = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.round(x[k]);
  };

  ArrayMath.sin = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.sin(x[k]);
  };

  ArrayMath.sqrt = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.sqrt(x[k]);
  };

  ArrayMath.tan = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = Math.tan(x[k]);
  };

  ArrayMath.clamp = function (dst, x, xMin, xMax) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k) {
      var val = x[k];
      dst[k] = val < xMin ? xMin : val > xMax ? xMax : val;
    }
  };

  ArrayMath.fract = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k) {
      var val = x[k];
      dst[k] = val - Math.floor(val);
    }
  };

  ArrayMath.fill = function (dst, value) {
    for (var k = dst.length - 1; k >= 0; --k) {
      dst[k] = value;
    }
  };

  ArrayMath.ramp = function (dst, first, last) {
    var maxIdx = dst.length - 1;
    if (maxIdx >= 0)
      dst[0] = first;
    if (maxIdx > 0) {
      var step = (last - first) / maxIdx;
      for (var k = 1; k <= maxIdx; ++k)
        dst[k] = first + step * k;
    }
  };

  ArrayMath.sign = function (dst, x) {
    for (var k = Math.min(dst.length, x.length) - 1; k >= 0; --k)
      dst[k] = x[k] < 0 ? -1 : 1;
  };

  ArrayMath.sum = function (x) {
    // TODO(m): We should use pairwise summation or similar here.
    var ret = 0;
    for (var k = x.length - 1; k >= 0; --k)
      ret += x[k];
    return ret;
  };

  ArrayMath.sampleLinear = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 < 0 ? 0 : t2 > maxIdx ? maxIdx : t2;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var p1 = x[idx];
      var p2 = x[idx < maxIdx ? idx + 1 : maxIdx];
      dst[k] = p1 + w * (p2 - p1);
    }
  };

  ArrayMath.sampleLinearRepeat = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 - Math.floor(t2/xLen) * xLen;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var p1 = x[idx];
      var p2 = x[idx < maxIdx ? idx + 1 : 0];
      dst[k] = p1 + w * (p2 - p1);
    }
  };

  ArrayMath.sampleCubic = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 < 0 ? 0 : t2 > maxIdx ? maxIdx : t2;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var w2 = w * w;
      var w3 = w2 * w;
      var h2 = -2*w3 + 3*w2;
      var h1 = 1 - h2;
      var h4 = w3 - w2;
      var h3 = h4 - w2 + w;
      var p1 = x[idx > 0 ? idx - 1 :  0];
      var p2 = x[idx];
      var p3 = x[idx < maxIdx ? idx + 1 : maxIdx];
      var p4 = x[idx < maxIdx - 1 ? idx + 2 : maxIdx];
      dst[k] = h1 * p2 + h2 * p3 + 0.5 * (h3 * (p3 - p1) + h4 * (p4 - p2));
    }
  };

  ArrayMath.sampleCubicRepeat = function (dst, x, t) {
    var xLen = x.length, maxIdx = xLen - 1;
    for (var k = Math.min(dst.length, t.length) - 1; k >= 0; --k) {
      var t2 = t[k];
      t2 = t2 - Math.floor(t2/xLen) * xLen;
      var idx = Math.floor(t2);
      var w = t2 - idx;
      var w2 = w * w;
      var w3 = w2 * w;
      var h2 = -2*w3 + 3*w2;
      var h1 = 1 - h2;
      var h4 = w3 - w2;
      var h3 = h4 - w2 + w;
      var p1 = x[idx > 0 ? idx - 1 : maxIdx];
      var p2 = x[idx];
      var p3 = x[idx < maxIdx ? idx + 1 : 0];
      var p4 = x[idx < maxIdx - 1 ? idx + 2 : (idx + 2 - Math.floor((idx + 2)/xLen) * xLen)];
      dst[k] = h1 * p2 + h2 * p3 + 0.5 * (h3 * (p3 - p1) + h4 * (p4 - p2));
    }
  };

  ArrayMath.pack = function (dst, offset, stride, src1, src2, src3, src4) {
    var dstCount = Math.floor(Math.max(0, (dst.length - offset)) / stride);
    var count = Math.min(dstCount, src1.length);
    if (src2) {
      var count = Math.min(count, src2.length);
      if (src3) {
        var count = Math.min(count, src3.length);
        if (src4) {
          var count = Math.min(count, src4.length);
          for (var k = 0; k < count; ++k) {
            dst[offset] = src1[k];
            dst[offset + 1] = src2[k];
            dst[offset + 2] = src3[k];
            dst[offset + 3] = src4[k];
            offset += stride;
          }
        }
        else
          for (var k = 0; k < count; ++k) {
            dst[offset] = src1[k];
            dst[offset + 1] = src2[k];
            dst[offset + 2] = src3[k];
            offset += stride;
          }
      }
      else
        for (var k = 0; k < count; ++k) {
          dst[offset] = src1[k];
          dst[offset + 1] = src2[k];
          offset += stride;
        }
    }
    else
      for (var k = 0; k < count; ++k) {
        dst[offset] = src1[k];
        offset += stride;
      }
  };

  ArrayMath.unpack = function (src, offset, stride, dst1, dst2, dst3, dst4) {
    var srcCount = Math.floor(Math.max(0, (src.length - offset)) / stride);
    var count = Math.min(srcCount, dst1.length);
    if (dst2) {
      var count = Math.min(count, dst2.length);
      if (dst3) {
        var count = Math.min(count, dst3.length);
        if (dst4) {
          var count = Math.min(count, dst4.length);
          for (var k = 0; k < count; ++k) {
            dst1[k] = src[offset];
            dst2[k] = src[offset + 1];
            dst3[k] = src[offset + 2];
            dst4[k] = src[offset + 3];
            offset += stride;
          }
        }
        else
          for (var k = 0; k < count; ++k) {
            dst1[k] = src[offset];
            dst2[k] = src[offset + 1];
            dst3[k] = src[offset + 2];
            offset += stride;
          }
      }
      else
        for (var k = 0; k < count; ++k) {
          dst1[k] = src[offset];
          dst2[k] = src[offset + 1];
          offset += stride;
        }
    }
    else
      for (var k = 0; k < count; ++k) {
        dst1[k] = src[offset];
        offset += stride;
      }
  };

  context.ArrayMath = ArrayMath;
})();


//------------------------------------------------------------------------------
// interface Filter
//------------------------------------------------------------------------------

(function () {
  var context = typeof (window) !== "undefined" ? window :
    typeof (self) !== "undefined" ? self :
    typeof module !== "undefined" && module.exports ? module.exports :
    global;

  if (context.Filter) return;

  var Filter = function (bSize, aSize) {
    if (isNaN(parseFloat(bSize)) || !isFinite(bSize))
      bSize = 1;
    if (!aSize)
      aSize = 0;
    this._b = new Float32Array(bSize);
    this._b[0] = 1;
    this._a = new Float32Array(aSize);
    this._bHist = new Float32Array(bSize);
    this._aHist = new Float32Array(aSize);
  };

  Filter.prototype.filter = function (dst, x) {
    // Put commonly accessed objects and properties in local variables
    var a = this._a, aLen = a.length,
        b = this._b, bLen = b.length,
        aHist = this._aHist, bHist = this._bHist,
        xLen = x.length, dstLen = dst.length;

    // Perform run-in part using the history (slow)
    var bHistRunIn = bLen - 1;
    var aHistRunIn = aLen;
    var k;
    for (k = 0; (bHistRunIn || aHistRunIn) && k < xLen; ++k) {
      var m, noHistLen;

      // FIR part
      noHistLen = bLen - bHistRunIn;
      bHistRunIn && bHistRunIn--;
      var res = b[0] * x[k];
      for (m = 1; m < noHistLen; ++m)
        res += b[m] * x[k - m];
      for (; m < bLen; ++m)
        res += b[m] * bHist[m - noHistLen];

      // Recursive part
      noHistLen = aLen - aHistRunIn;
      aHistRunIn && aHistRunIn--;
      for (m = 0; m < noHistLen; ++m)
        res -= a[m] * dst[k - 1 - m];
      for (; m < aLen; ++m)
        res -= a[m] * aHist[m - noHistLen];

      dst[k] = res;
    }

    // Perform history-free part (fast)
    if (bLen == 3 && aLen == 2) {
      // Optimized special case: biquad filter
      var b0 = b[0], b1 = b[1], b2 = b[2], a1 = a[0], a2 = a[1];
      var x0 = x[k-1], x1 = x[k-2], x2;
      var y0 = dst[k-1], y1 = dst[k-2], y2;
      for (; k < xLen; ++k) {
        x2 = x1;
        x1 = x0;
        x0 = x[k];
        y2 = y1;
        y1 = y0;
        y0 = b0 * x0 + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
        dst[k] = y0;
      }
    }
    else {
      // Generic case
      for (; k < xLen; ++k) {
        var m;

        // FIR part
        var res = b[0] * x[k];
        for (m = 1; m < bLen; ++m)
          res += b[m] * x[k - m];

        // Recursive part
        for (m = 0; m < aLen; ++m)
          res -= a[m] * dst[k - 1 - m];

        dst[k] = res;
      }
    }

    // Update history state
    var histCopy = Math.min(bLen - 1, xLen);
    for (k = bLen - 2; k >= histCopy; --k)
      bHist[k] = bHist[k - histCopy];
    for (k = 0; k < histCopy; ++k)
      bHist[k] = x[xLen - 1 - k];
    histCopy = Math.min(aLen, dstLen);
    for (k = aLen - 1; k >= histCopy; --k)
      aHist[k] = aHist[k - histCopy];
    for (k = 0; k < histCopy; ++k)
      aHist[k] = dst[xLen - 1 - k];
  };

  Filter.prototype.clearHistory = function () {
    for (var k = this._bHist.length - 1; k >= 0; --k)
      this._bHist[k] = 0;
    for (var k = this._aHist.length - 1; k >= 0; --k)
      this._aHist[k] = 0;
  };

  Filter.prototype.setB = function (values) {
    var len = Math.min(this._b.length, values.length);
    for (var k = 0; k < len; ++k)
      this._b[k] = values[k];
  };

  Filter.prototype.setA = function (values) {
    var len = Math.min(this._a.length, values.length);
    for (var k = 0; k < len; ++k)
      this._a[k] = values[k];
  };

  context.Filter = Filter;
})();


//------------------------------------------------------------------------------
// interface FFT
//
// NOTE: This is essentially a hand-translation of the C language Kiss FFT
// library, copyright by Mark Borgerding, relicensed with permission from the
// author.
//
// The algorithm implements mixed radix FFT and supports transforms of any size
// (not just powers of 2). For optimal performance, use sizes that can be
// factorized into factors 2, 3, 4 and 5.
//------------------------------------------------------------------------------

(function () {
  var context = typeof (window) !== "undefined" ? window :
    typeof (self) !== "undefined" ? self :
    typeof module !== "undefined" && module.exports ? module.exports :
    global;
    
  if (context.FFT) return;

  var butterfly2 = function (outRe, outIm, outIdx, stride, twRe, twIm, m) {
    var scratch0Re, scratch0Im,
        out0Re, out0Im, out1Re, out1Im,
        tRe, tIm;

    var tw1 = 0,
        idx0 = outIdx,
        idx1 = outIdx + m;

    var scale = 0.7071067811865475; // sqrt(1/2)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(2)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(2)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;

      // scratch0 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch0Re = out1Re * tRe - out1Im * tIm;
      scratch0Im = out1Re * tIm + out1Im * tRe;

      // out[idx1] = out0 - scratch0
      outRe[idx1] = out0Re - scratch0Re;
      outIm[idx1] = out0Im - scratch0Im;

      // out[idx0] = out0 + scratch0
      outRe[idx0] = out0Re + scratch0Re;
      outIm[idx0] = out0Im + scratch0Im;

      tw1 += stride;
      ++idx0; ++idx1;
    }
  };

  var butterfly3 = function (outRe, outIm, outIdx, stride, twRe, twIm, m) {
    var scratch0Re, scratch0Im, scratch1Re, scratch1Im,
        scratch2Re, scratch2Im, scratch3Re, scratch3Im,
        out0Re, out0Im, out1Re, out1Im, out2Re, out2Im,
        tRe, tIm;

    var tw1 = 0,
        tw2 = 0,
        stride2 = 2 * stride,
        idx0 = outIdx,
        idx1 = outIdx + m,
        idx2 = outIdx + 2 * m;

    var epi3Im = twIm[stride*m];

    var scale = 0.5773502691896258; // sqrt(1/3)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(3)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(3)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;
      // out2 = out[idx2] / sqrt(3)
      out2Re = outRe[idx2] * scale;
      out2Im = outIm[idx2] * scale;

      // scratch1 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch1Re = out1Re * tRe - out1Im * tIm;
      scratch1Im = out1Re * tIm + out1Im * tRe;

      // scratch2 = out2 * tw[tw2]
      tRe = twRe[tw2]; tIm = twIm[tw2];
      scratch2Re = out2Re * tRe - out2Im * tIm;
      scratch2Im = out2Re * tIm + out2Im * tRe;

      // scratch3 = scratch1 + scratch2
      scratch3Re = scratch1Re + scratch2Re;
      scratch3Im = scratch1Im + scratch2Im;

      // scratch0 = scratch1 - scratch2
      scratch0Re = scratch1Re - scratch2Re;
      scratch0Im = scratch1Im - scratch2Im;

      // out1 = out0 - scratch3 / 2
      out1Re = out0Re - scratch3Re * 0.5;
      out1Im = out0Im - scratch3Im * 0.5;

      // scratch0 *= epi3.i
      scratch0Re *= epi3Im;
      scratch0Im *= epi3Im;

      // out[idx0] = out0 + scratch3
      outRe[idx0] = out0Re + scratch3Re;
      outIm[idx0] = out0Im + scratch3Im;

      outRe[idx2] = out1Re + scratch0Im;
      outIm[idx2] = out1Im - scratch0Re;

      outRe[idx1] = out1Re - scratch0Im;
      outIm[idx1] = out1Im + scratch0Re;

      tw1 += stride; tw2 += stride2;
      ++idx0; ++idx1; ++idx2;
    }
  };

  var butterfly4 = function (outRe, outIm, outIdx, stride, twRe, twIm, m, inverse) {
    var scratch0Re, scratch0Im, scratch1Re, scratch1Im, scratch2Re, scratch2Im,
        scratch3Re, scratch3Im, scratch4Re, scratch4Im, scratch5Re, scratch5Im,
        out0Re, out0Im, out1Re, out1Im, out2Re, out2Im, out3Re, out3Im,
        tRe, tIm;

    var tw1 = 0,
        tw2 = 0,
        tw3 = 0,
        stride2 = 2 * stride,
        stride3 = 3 * stride,
        idx0 = outIdx,
        idx1 = outIdx + m,
        idx2 = outIdx + 2 * m,
        idx3 = outIdx + 3 * m;

    var scale = 0.5; // sqrt(1/4)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(4)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(4)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;
      // out2 = out[idx2] / sqrt(4)
      out2Re = outRe[idx2] * scale;
      out2Im = outIm[idx2] * scale;
      // out3 = out[idx3] / sqrt(4)
      out3Re = outRe[idx3] * scale;
      out3Im = outIm[idx3] * scale;

      // scratch0 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch0Re = out1Re * tRe - out1Im * tIm;
      scratch0Im = out1Re * tIm + out1Im * tRe;

      // scratch1 = out2 * tw[tw2]
      tRe = twRe[tw2]; tIm = twIm[tw2];
      scratch1Re = out2Re * tRe - out2Im * tIm;
      scratch1Im = out2Re * tIm + out2Im * tRe;

      // scratch2 = out3 * tw[tw3]
      tRe = twRe[tw3]; tIm = twIm[tw3];
      scratch2Re = out3Re * tRe - out3Im * tIm;
      scratch2Im = out3Re * tIm + out3Im * tRe;

      // scratch5 = out0 - scratch1
      scratch5Re = out0Re - scratch1Re;
      scratch5Im = out0Im - scratch1Im;

      // out0 += scratch1
      out0Re += scratch1Re;
      out0Im += scratch1Im;

      // scratch3 = scratch0 + scratch2
      scratch3Re = scratch0Re + scratch2Re;
      scratch3Im = scratch0Im + scratch2Im;

      // scratch4 = scratch0 - scratch2
      scratch4Re = scratch0Re - scratch2Re;
      scratch4Im = scratch0Im - scratch2Im;

      // out[idx2] = out0 - scratch3
      outRe[idx2] = out0Re - scratch3Re;
      outIm[idx2] = out0Im - scratch3Im;

      // out[idx0] = out0 + scratch3
      outRe[idx0] = out0Re + scratch3Re;
      outIm[idx0] = out0Im + scratch3Im;

      if (inverse) {
        outRe[idx1] = scratch5Re - scratch4Im;
        outIm[idx1] = scratch5Im + scratch4Re;
        outRe[idx3] = scratch5Re + scratch4Im;
        outIm[idx3] = scratch5Im - scratch4Re;
      }
      else {
        outRe[idx1] = scratch5Re + scratch4Im;
        outIm[idx1] = scratch5Im - scratch4Re;
        outRe[idx3] = scratch5Re - scratch4Im;
        outIm[idx3] = scratch5Im + scratch4Re;
      }

      tw1 += stride; tw2 += stride2; tw3 += stride3;
      ++idx0; ++idx1; ++idx2; ++idx3;
    }
  };

  var butterfly5 = function (outRe, outIm, outIdx, stride, twRe, twIm, m) {
    var scratch0Re, scratch0Im, scratch1Re, scratch1Im, scratch2Re, scratch2Im,
        scratch3Re, scratch3Im, scratch4Re, scratch4Im, scratch5Re, scratch5Im,
        scratch6Re, scratch6Im, scratch7Re, scratch7Im, scratch8Re, scratch8Im,
        scratch9Re, scratch9Im, scratch10Re, scratch10Im, scratch11Re, scratch11Im,
        scratch12Re, scratch12Im,
        out0Re, out0Im, out1Re, out1Im, out2Re, out2Im, out3Re, out3Im, out4Re, out4Im,
        tRe, tIm;

    var tw1 = 0,
        tw2 = 0,
        tw3 = 0,
        tw4 = 0,
        stride2 = 2 * stride,
        stride3 = 3 * stride,
        stride4 = 4 * stride;

    var idx0 = outIdx,
        idx1 = outIdx + m,
        idx2 = outIdx + 2 * m,
        idx3 = outIdx + 3 * m,
        idx4 = outIdx + 4 * m;

    // ya = tw[stride*m];
    var yaRe = twRe[stride * m],
        yaIm = twIm[stride * m];
    // yb = tw[stride*2*m];
    var ybRe = twRe[stride * 2 * m],
        ybIm = twIm[stride * 2 * m];

    var scale = 0.4472135954999579; // sqrt(1/5)
    var idx0End = idx0 + m;
    while (idx0 < idx0End) {
      // out0 = out[idx0] / sqrt(5)
      out0Re = outRe[idx0] * scale;
      out0Im = outIm[idx0] * scale;
      // out1 = out[idx1] / sqrt(5)
      out1Re = outRe[idx1] * scale;
      out1Im = outIm[idx1] * scale;
      // out2 = out[idx2] / sqrt(5)
      out2Re = outRe[idx2] * scale;
      out2Im = outIm[idx2] * scale;
      // out3 = out[idx3] / sqrt(5)
      out3Re = outRe[idx3] * scale;
      out3Im = outIm[idx3] * scale;
      // out4 = out[idx4] / sqrt(5)
      out4Re = outRe[idx4] * scale;
      out4Im = outIm[idx4] * scale;

      // scratch0 = out0;
      scratch0Re = out0Re;
      scratch0Im = out0Im;

      // scratch1 = out1 * tw[tw1]
      tRe = twRe[tw1]; tIm = twIm[tw1];
      scratch1Re = out1Re * tRe - out1Im * tIm;
      scratch1Im = out1Re * tIm + out1Im * tRe;
      // scratch2 = out2 * tw[tw2]
      tRe = twRe[tw2]; tIm = twIm[tw2];
      scratch2Re = out2Re * tRe - out2Im * tIm;
      scratch2Im = out2Re * tIm + out2Im * tRe;
      // scratch3 = out3 * tw[tw3]
      tRe = twRe[tw3]; tIm = twIm[tw3];
      scratch3Re = out3Re * tRe - out3Im * tIm;
      scratch3Im = out3Re * tIm + out3Im * tRe;
      // scratch4 = out4 * tw[tw4]
      tRe = twRe[tw4]; tIm = twIm[tw4];
      scratch4Re = out4Re * tRe - out4Im * tIm;
      scratch4Im = out4Re * tIm + out4Im * tRe;

      // scratch7 = scratch1 + scratch4
      scratch7Re = scratch1Re + scratch4Re;
      scratch7Im = scratch1Im + scratch4Im;
      // scratch10 = scratch1 - scratch4
      scratch10Re = scratch1Re - scratch4Re;
      scratch10Im = scratch1Im - scratch4Im;
      // scratch8 = scratch2 + scratch2
      scratch8Re = scratch2Re + scratch3Re;
      scratch8Im = scratch2Im + scratch3Im;
      // scratch9 = scratch2 - scratch3
      scratch9Re = scratch2Re - scratch3Re;
      scratch9Im = scratch2Im - scratch3Im;

      // out[idx0] = out0 + scratch7 + scratch8
      outRe[idx0] = out0Re + scratch7Re + scratch8Re;
      outIm[idx0] = out0Im + scratch7Im + scratch8Im;

      scratch5Re = scratch0Re + scratch7Re * yaRe + scratch8Re * ybRe;
      scratch5Im = scratch0Im + scratch7Im * yaRe + scratch8Im * ybRe;

      scratch6Re = scratch10Im * yaIm + scratch9Im * ybIm;
      scratch6Im = -scratch10Re * yaIm - scratch9Re * ybIm;

      // out[idx1] = scratch5 - scratch6
      outRe[idx1] = scratch5Re - scratch6Re;
      outIm[idx1] = scratch5Im - scratch6Im;
      // out[idx4] = scratch5 + scratch6
      outRe[idx4] = scratch5Re + scratch6Re;
      outIm[idx4] = scratch5Im + scratch6Im;

      scratch11Re = scratch0Re + scratch7Re * ybRe + scratch8Re * yaRe;
      scratch11Im = scratch0Im + scratch7Im * ybRe + scratch8Im * yaRe;

      scratch12Re = -scratch10Im * ybIm + scratch9Im * yaIm;
      scratch12Im = scratch10Re * ybIm - scratch9Re * yaIm;

      // out[idx2] = scratch11 + scratch12
      outRe[idx2] = scratch11Re + scratch12Re;
      outIm[idx2] = scratch11Im + scratch12Im;
      // out[idx3] = scratch11 - scratch12
      outRe[idx3] = scratch11Re - scratch12Re;
      outIm[idx3] = scratch11Im - scratch12Im;

      tw1 += stride; tw2 += stride2; tw3 += stride3; tw4 += stride4;
      ++idx0; ++idx1; ++idx2; ++idx3; ++idx4;
    }
  };

  var butterflyN = function (outRe, outIm, outIdx, stride, twRe, twIm, m, p, size) {
    var u, q1, q, idx0;
    var out0Re, out0Im, aRe, aIm, tRe, tIm;

    // FIXME: Allocate statically
    var scratchRe = new Float32Array(p);
    var scratchIm = new Float32Array(p);

    var scale = Math.sqrt(1 / p);
    for (u = 0; u < m; ++u) {
      idx0 = outIdx + u;
      for (q1 = 0; q1 < p; ++q1) {
        // scratch[q1] = out[idx0] / sqrt(p)
        scratchRe[q1] = outRe[idx0] * scale;
        scratchIm[q1] = outIm[idx0] * scale;
        idx0 += m;
      }

      idx0 = outIdx + u;
      var tw1Incr = stride * u;
      for (q1 = 0; q1 < p; ++q1) {
        // out0 = scratch[0]
        out0Re = scratchRe[0];
        out0Im = scratchIm[0];

        var tw1 = 0;
        for (q = 1; q < p; ++q) {
          tw1 += tw1Incr;
          if (tw1 >= size)
            tw1 -= size;

          // out0 += scratch[q] * tw[tw1]
          aRe = scratchRe[q], aIm = scratchIm[q];
          tRe = twRe[tw1], tIm = twIm[tw1];
          out0Re += aRe * tRe - aIm * tIm;
          out0Im += aRe * tIm + aIm * tRe;
        }

        // out[idx0] = out0
        outRe[idx0] = out0Re;
        outIm[idx0] = out0Im;

        idx0 += m;
        tw1Incr += stride;
      }
    }
  };

  var work = function (outRe, outIm, outIdx, fRe, fIm, fIdx, stride, inStride, factors, factorsIdx, twRe, twIm, size, inverse) {
    var p = factors[factorsIdx++];  // Radix
    var m = factors[factorsIdx++];  // Stage's FFT length / p

    var outIdxBeg = outIdx;
    var outIdxEnd = outIdx + p * m;

    var fIdxIncr = stride * inStride;
    if (m == 1) {
      do {
        outRe[outIdx] = fRe[fIdx];
        outIm[outIdx] = fIm[fIdx];
        fIdx += fIdxIncr;
        ++outIdx;
      }
      while (outIdx != outIdxEnd);
    }
    else {
      do {
        // DFT of size m*p performed by doing p instances of smaller DFTs of
        // size m, each one takes a decimated version of the input.
        work(outRe, outIm, outIdx, fRe, fIm, fIdx, stride * p, inStride, factors, factorsIdx, twRe, twIm, size, inverse);
        fIdx += fIdxIncr;
        outIdx += m;
      }
      while (outIdx != outIdxEnd);
    }

    outIdx = outIdxBeg;

    // Recombine the p smaller DFTs
    switch (p) {
      case 2:  butterfly2(outRe, outIm, outIdx, stride, twRe, twIm, m); break;
      case 3:  butterfly3(outRe, outIm, outIdx, stride, twRe, twIm, m); break;
      case 4:  butterfly4(outRe, outIm, outIdx, stride, twRe, twIm, m, inverse); break;
      case 5:  butterfly5(outRe, outIm, outIdx, stride, twRe, twIm, m); break;
      default: butterflyN(outRe, outIm, outIdx, stride, twRe, twIm, m, p, size); break;
    }
  };

  /*  facBuf is populated by p1,m1,p2,m2, ...
      where
      p[i] * m[i] = m[i-1]
      m0 = n                  */
  var factor = function (n, facBuf) {
    // Factor out powers of 4, powers of 2, then any remaining primes
    var p = 4;
    var floorSqrt = Math.floor(Math.sqrt(n));
    var idx = 0;
    do {
      while (n % p) {
        switch (p) {
          case 4:  p = 2; break;
          case 2:  p = 3; break;
          default: p += 2; break;
        }
        if (p > floorSqrt)
          p = n;
      }
      n = Math.floor(n / p);
      facBuf[idx++] = p;
      facBuf[idx++] = n;
    }
    while (n > 1);
  };

  var FFT = function (size) {
    if (!size)
      size = 256;
    Object.defineProperty(this, "size", {
      configurable: false,
      writable: false,
      value: size
    });

    // Allocate arrays for twiddle factors
    this._twiddlesFwdRe = new Float32Array(size);
    this._twiddlesFwdIm = new Float32Array(size);
    this._twiddlesInvRe = this._twiddlesFwdRe;
    this._twiddlesInvIm = new Float32Array(size);

    // Init twiddle factors (both forward & reverse)
    for (var i = 0; i < size; ++i) {
        var phase = -2 * Math.PI * i / size;
        var cosPhase = Math.cos(phase), sinPhase = Math.sin(phase);
        this._twiddlesFwdRe[i] = cosPhase;
        this._twiddlesFwdIm[i] = sinPhase;
        this._twiddlesInvIm[i] = -sinPhase;
    }

    // Allocate arrays for radix plan
    this._factors = new Int32Array(2 * 32);  // MAXFACTORS = 32

    // Init radix factors (mixed radix breakdown)
    // FIXME: Something seems to go wrong when using an FFT size that can be
    // factorized into more than one butterflyN (e.g. try an FFT size of 11*13).
    factor(size, this._factors);
  };

  FFT.prototype.forwardCplx = function (dstReal, dstImag, xReal, xImag) {
    var twRe = this._twiddlesFwdRe;
    var twIm = this._twiddlesFwdIm;
    work(dstReal, dstImag, 0, xReal, xImag, 0, 1, 1, this._factors, 0, twRe, twIm, this.size, false);
  };

  FFT.prototype.forward = function (dstReal, dstImag, x) {
    // FIXME: Optimize this case (real input signal)
    this.forwardCplx(dstReal, dstImag, x, new Float32Array(this.size));
  };

  FFT.prototype.inverseCplx = function (dstReal, dstImag, xReal, xImag) {
    var twRe = this._twiddlesInvRe;
    var twIm = this._twiddlesInvIm;
    work(dstReal, dstImag, 0, xReal, xImag, 0, 1, 1, this._factors, 0, twRe, twIm, this.size, true);
  };

  FFT.prototype.inverse = function (dst, xReal, xImag) {
    // FIXME: Optimize this case (real output signal)
    this.inverseCplx(dst, new Float32Array(this.size), xReal, xImag);
  };

  context.FFT = FFT;
})();
;
/** Random.js library.
 *
 * The code is licensed as LGPL.
*/

/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
 */

var Random = function(seed) {
	seed = (seed === undefined) ? (new Date()).getTime() : seed;
	if (typeof(seed) !== 'number'                             // ARG_CHECK
		|| Math.ceil(seed) != Math.floor(seed)) {             // ARG_CHECK
		throw new TypeError("seed value must be an integer"); // ARG_CHECK
	}                                                         // ARG_CHECK


	/* Period parameters */
	this.N = 624;
	this.M = 397;
	this.MATRIX_A = 0x9908b0df;   /* constant vector a */
	this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

	this.mt = new Array(this.N); /* the array for the state vector */
	this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */

	//this.init_genrand(seed);
	this.init_by_array([seed], 1);
};

/* initializes mt[N] with a seed */
Random.prototype.init_genrand = function(s) {
	this.mt[0] = s >>> 0;
	for (this.mti=1; this.mti<this.N; this.mti++) {
		var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
		this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
		+ this.mti;
		/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
		/* In the previous versions, MSBs of the seed affect   */
		/* only MSBs of the array mt[].                        */
		/* 2002/01/09 modified by Makoto Matsumoto             */
		this.mt[this.mti] >>>= 0;
		/* for >32 bit machines */
	}
};

/* initialize by an array with array-length */
/* init_key is the array for initializing keys */
/* key_length is its length */
/* slight change for C++, 2004/2/26 */
Random.prototype.init_by_array = function(init_key, key_length) {
	var i, j, k;
	this.init_genrand(19650218);
	i=1; j=0;
	k = (this.N>key_length ? this.N : key_length);
	for (; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))
		+ init_key[j] + j; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++; j++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
		if (j>=key_length) j=0;
	}
	for (k=this.N-1; k; k--) {
		var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);
		this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))
		- i; /* non linear */
		this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
		i++;
		if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }
	}

	this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
};

/* generates a random number on [0,0xffffffff]-interval */
Random.prototype.genrand_int32 = function() {
	var y;
	var mag01 = new Array(0x0, this.MATRIX_A);
	/* mag01[x] = x * MATRIX_A  for x=0,1 */

	if (this.mti >= this.N) { /* generate N words at one time */
		var kk;

		if (this.mti == this.N+1)   /* if init_genrand() has not been called, */
			this.init_genrand(5489); /* a default initial seed is used */

		for (kk=0;kk<this.N-this.M;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (;kk<this.N-1;kk++) {
			y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
			this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
		this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = this.mt[this.mti++];

	/* Tempering */
	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
};

/* generates a random number on [0,0x7fffffff]-interval */
Random.prototype.genrand_int31 = function() {
	return (this.genrand_int32()>>>1);
};

/* generates a random number on [0,1]-real-interval */
Random.prototype.genrand_real1 = function() {
	return this.genrand_int32()*(1.0/4294967295.0);
	/* divided by 2^32-1 */
};

/* generates a random number on [0,1)-real-interval */
Random.prototype.random = function() {
	if (this.pythonCompatibility) {
		if (this.skip) {
			this.genrand_int32();
		}
		this.skip = true;
	}
	return this.genrand_int32()*(1.0/4294967296.0);
	/* divided by 2^32 */
};

/* generates a random number on (0,1)-real-interval */
Random.prototype.genrand_real3 = function() {
	return (this.genrand_int32() + 0.5)*(1.0/4294967296.0);
	/* divided by 2^32 */
};

/* generates a random number on [0,1) with 53-bit resolution*/
Random.prototype.genrand_res53 = function() {
	var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6;
	return(a*67108864.0+b)*(1.0/9007199254740992.0);
};

/* These real versions are due to Isaku Wada, 2002/01/09 added */


/**************************************************************************/
Random.prototype.LOG4 = Math.log(4.0);
Random.prototype.SG_MAGICCONST = 1.0 + Math.log(4.5);

Random.prototype.exponential = function (lambda) {
	if (arguments.length != 1) {                         // ARG_CHECK
		throw new SyntaxError("exponential() must "     // ARG_CHECK
				+ " be called with 'lambda' parameter"); // ARG_CHECK
	}                                                   // ARG_CHECK

	var r = this.random();
	return -Math.log(r) / lambda;
};

Random.prototype.gamma = function (alpha, beta) {
	if (arguments.length != 2) {                         // ARG_CHECK
		throw new SyntaxError("gamma() must be called"  // ARG_CHECK
				+ " with alpha and beta parameters"); // ARG_CHECK
	}                                                   // ARG_CHECK

	/* Based on Python 2.6 source code of random.py.
	 */

	if (alpha > 1.0) {
		var ainv = Math.sqrt(2.0 * alpha - 1.0);
		var bbb = alpha - this.LOG4;
		var ccc = alpha + ainv;

		while (true) {
			var u1 = this.random();
			if ((u1 < 1e-7) || (u > 0.9999999)) {
				continue;
			}
			var u2 = 1.0 - this.random();
			var v = Math.log(u1 / (1.0 - u1)) / ainv;
			var x = alpha * Math.exp(v);
			var z = u1 * u1 * u2;
			var r = bbb + ccc * v - x;
			if ((r + this.SG_MAGICCONST - 4.5 * z >= 0.0) || (r >= Math.log(z))) {
				return x * beta;
			}
		}
	} else if (alpha == 1.0) {
		var u = this.random();
		while (u <= 1e-7) {
			u = this.random();
		}
		return - Math.log(u) * beta;
	} else {
		while (true) {
			var u = this.random();
			var b = (Math.E + alpha) / Math.E;
			var p = b * u;
			if (p <= 1.0) {
				var x = Math.pow(p, 1.0 / alpha);
			} else {
				var x = - Math.log((b - p) / alpha);
			}
			var u1 = this.random();
			if (p > 1.0) {
				if (u1 <= Math.pow(x, (alpha - 1.0))) {
					break;
				}
			} else if (u1 <= Math.exp(-x)) {
				break;
			}
		}
		return x * beta;
	}

};

Random.prototype.normal = function (mu, sigma) {
	if (arguments.length != 2) {                          // ARG_CHECK
		throw new SyntaxError("normal() must be called"  // ARG_CHECK
				+ " with mu and sigma parameters");      // ARG_CHECK
	}                                                    // ARG_CHECK

	var z = this.lastNormal;
	this.lastNormal = NaN;
	if (!z) {
		var a = this.random() * 2 * Math.PI;
		var b = Math.sqrt(-2.0 * Math.log(1.0 - this.random()));
		z = Math.cos(a) * b;
		this.lastNormal = Math.sin(a) * b;
	}
	return mu + z * sigma;
};

Random.prototype.pareto = function (alpha) {
	if (arguments.length != 1) {                         // ARG_CHECK
		throw new SyntaxError("pareto() must be called" // ARG_CHECK
				+ " with alpha parameter");             // ARG_CHECK
	}                                                   // ARG_CHECK

	var u = this.random();
	return 1.0 / Math.pow((1 - u), 1.0 / alpha);
};

Random.prototype.triangular = function (lower, upper, mode) {
	// http://en.wikipedia.org/wiki/Triangular_distribution
	if (arguments.length != 3) {                         // ARG_CHECK
		throw new SyntaxError("triangular() must be called" // ARG_CHECK
		+ " with lower, upper and mode parameters");    // ARG_CHECK
	}                                                   // ARG_CHECK

	var c = (mode - lower) / (upper - lower);
	var u = this.random();

	if (u <= c) {
		return lower + Math.sqrt(u * (upper - lower) * (mode - lower));
	} else {
		return upper - Math.sqrt((1 - u) * (upper - lower) * (upper - mode));
	}
};

Random.prototype.uniform = function (lower, upper) {
	if (arguments.length != 2) {                         // ARG_CHECK
		throw new SyntaxError("uniform() must be called" // ARG_CHECK
		+ " with lower and upper parameters");    // ARG_CHECK
	}                                                   // ARG_CHECK
	return lower + this.random() * (upper - lower);
};

Random.prototype.weibull = function (alpha, beta) {
	if (arguments.length != 2) {                         // ARG_CHECK
		throw new SyntaxError("weibull() must be called" // ARG_CHECK
		+ " with alpha and beta parameters");    // ARG_CHECK
	}                                                   // ARG_CHECK
	var u = 1.0 - this.random();
	return alpha * Math.pow(-Math.log(u), 1.0 / beta);
};

if (typeof window === "undefined" && typeof module !== "undefined" && module.exports) {
    module.exports = Random;
}
;/*! Flocking 0.1, Copyright 2011-2014 Colin Clark | flockingjs.org */

/*
* Flocking - Creative audio synthesis for the Web!
* http://github.com/colinbdclark/flocking
*
* Copyright 2011-2014, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, Float32Array, window, AudioContext, webkitAudioContext*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    var $ = fluid.registerNamespace("jQuery");

    flock.fluid = fluid;

    flock.init = function (options) {
        var enviroOpts = !options ? undefined : {
            components: {
                audioSystem: {
                    options: {
                        model: options
                    }
                }
            }
        };

        var enviro = flock.enviro(enviroOpts);
        fluid.staticEnvironment.environment = flock.environment = enviro;

        // flock.enviro.shared is deprecated. Use "flock.environment"
        // or an IoC reference to {environment} instead
        flock.enviro.shared = enviro;

        return enviro;
    };

    flock.ALL_CHANNELS = 32; // TODO: This should go.
    flock.OUT_UGEN_ID = "flocking-out";

    flock.PI = Math.PI;
    flock.TWOPI = 2.0 * Math.PI;
    flock.HALFPI = Math.PI / 2.0;
    flock.LOG01 = Math.log(0.1);
    flock.LOG001 = Math.log(0.001);
    flock.ROOT2 = Math.sqrt(2);

    flock.rates = {
        AUDIO: "audio",
        CONTROL: "control",
        SCHEDULED: "scheduled",
        DEMAND: "demand",
        CONSTANT: "constant"
    };

    fluid.registerNamespace("flock.debug");
    flock.debug.failHard = true;

    flock.browser = function () {
        if (typeof navigator === "undefined") {
            return {};
        }

        // This is a modified version of jQuery's browser detection code,
        // which they removed from jQuery 2.0.
        // Some of us still have to live in the messy reality of the web.
        var ua = navigator.userAgent.toLowerCase(),
            browser = {},
            match,
            matched;

        match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

        matched = {
            browser: match[1] || "",
            version: match[2] || "0"
        };

        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
        }

        // Chrome is Webkit, but Webkit is also Safari.
        if (browser.chrome) {
            browser.webkit = true;
        } else if (browser.webkit) {
            browser.safari = true;
        }

        return browser;
    };

    // TODO: Move to components in the static environment and into the appropriate platform files.
    fluid.registerNamespace("flock.platform");
    flock.platform.isBrowser = typeof window !== "undefined";
    flock.platform.hasRequire = typeof require !== "undefined";
    flock.platform.os = flock.platform.isBrowser ? window.navigator.platform : fluid.require("os").platform();
    flock.platform.isLinux = flock.platform.os.indexOf("Linux") > -1;
    flock.platform.isAndroid = flock.platform.isLinux && flock.platform.os.indexOf("arm") > -1;
    flock.platform.isIOS = flock.platform.os === "iPhone" || flock.platform.os === "iPad" || flock.platform.os === "iPod";
    flock.platform.isMobile = flock.platform.isAndroid || flock.platform.isIOS;
    flock.platform.browser = flock.browser();
    flock.platform.isWebAudio = typeof AudioContext !== "undefined" || typeof webkitAudioContext !== "undefined";
    flock.platform.audioEngine = flock.platform.isBrowser ? "webAudio" : "nodejs";
    fluid.staticEnvironment.audioEngine = fluid.typeTag("flock.platform." + flock.platform.audioEngine);

    flock.shim = {
        URL: flock.platform.isBrowser ? (window.URL || window.webkitURL || window.msURL) : undefined
    };


    flock.requireModule = function (moduleName, globalName) {
        if (flock.platform.isBrowser) {
            return window[globalName || moduleName];
        }

        if (!flock.platform.hasRequire) {
            return undefined;
        }

        var resolvedName = flock.requireModule.paths[moduleName] || moduleName;
        var togo = require(resolvedName);

        return globalName ? togo[globalName] : togo;
    };

    flock.requireModule.paths = {
        webarraymath: "../third-party/webarraymath/js/webarraymath.js",
        Random: "../third-party/simjs/js/random-0.26.js"
    };

    /*************
     * Utilities *
     *************/

    flock.noOp = function () {};

    flock.isIterable = function (o) {
        var type = typeof o;
        return o && o.length !== undefined && type !== "string" && type !== "function";
    };

    flock.hasTag = function (obj, tag) {
        if (!obj || !tag) {
            return false;
        }
        return obj.tags && obj.tags.indexOf(tag) > -1;
    };

    // TODO: Chrome profiler marks this function as unoptimized.
    // This should probably be factored into separate functions for
    // new and existing arrays. (e.g. "generate" vs. "fill")
    flock.generate = function (bufOrSize, generator) {
        var buf = typeof bufOrSize === "number" ? new Float32Array(bufOrSize) : bufOrSize,
            isFunc = typeof generator === "function",
            i;

        for (i = 0; i < buf.length; i++) {
            buf[i] = isFunc ? generator(i, buf) : generator;
        }

        return buf;
    };

    flock.generate.silence = function (bufOrSize) {
        if (typeof bufOrSize === "number") {
            return new Float32Array(bufOrSize);
        }

        var buf = bufOrSize,
            i;
        for (i = 0; i < buf.length; i++) {
            buf[i] = 0.0;
        }
        return buf;
    };

    /**
     * Performs an in-place reversal of all items in the array.
     *
     * @arg {Iterable} b a buffer or array to reverse
     * @return {Iterable} the buffer, reversed
     */
    flock.reverse = function (b) {
        if (!b || !flock.isIterable(b) || b.length < 2) {
            return b;
        }

        // A native implementation of reverse() exists for regular JS arrays
        // and is partially implemented for TypedArrays. Use it if possible.
        if (typeof b.reverse === "function") {
            return b.reverse();
        }

        var t;
        for (var l = 0, r = b.length - 1; l < r; l++, r--) {
            t = b[l];
            b[l] = b[r];
            b[r] = t;
        }

        return b;
    };

    /**
     * Randomly selects an index from the specified array.
     */
    flock.randomIndex = function (arr) {
        var max = arr.length - 1;
        return Math.round(Math.random() * max);
    };

    /**
     * Randomly selects an item from an array-like object.
     *
     * @param {Array-like object} arr the array to choose from
     * @param {Function} a selection strategy; defaults to flock.randomIndex
     * @return a randomly selected list item
     */
    flock.arrayChoose = function (arr, strategy) {
        strategy = strategy || flock.randomIndex;
        arr = fluid.makeArray(arr);
        var idx = strategy(arr);
        return arr[idx];
    };

    /**
     * Randomly selects an item from an array or object.
     *
     * @param {Array-like object|Object} collection the object to choose from
     * @return a randomly selected item from collection
     */
    flock.choose = function (collection, strategy) {
        var key, val;

        if (flock.isIterable(collection)) {
            val = flock.arrayChoose(collection, strategy);
            return val;
        }

        key = flock.arrayChoose(collection.keys, strategy);
        val = collection[key];
        return val;
    };

    /**
     * Normalizes the specified buffer in place to the specified value.
     *
     * @param {Arrayable} buffer the buffer to normalize
     * @param {Number} normal the value to normalize the buffer to
     * @param {Arrayable} a buffer to output values into; if omitted, buffer will be modified in place
     * @return the buffer, normalized in place
     */
    flock.normalize = function (buffer, normal, output) {
        output = output || buffer;

        var maxVal = 0.0,
            i,
            current,
            val;

        normal = normal === undefined ? 1.0 : normal;
        // Find the maximum value in the buffer.
        for (i = 0; i < buffer.length; i++) {
            current = Math.abs(buffer[i]);
            if (current > maxVal) {
                maxVal = current;
            }
        }

        // And then normalize the buffer in place.
        if (maxVal > 0.0) {
            for (i = 0; i < buffer.length; i++) {
                val = buffer[i];
                output[i] = (val / maxVal) * normal;
            }
        }

        return output;
    };

    flock.generateFourierTable = function (size, scale, numHarms, phase, amps) {
        phase *= flock.TWOPI;

        return flock.generate(size, function (i) {
            var harm,
                amp,
                w,
                val = 0.0;

            for (harm = 0; harm < numHarms; harm++) {
                amp = amps ? amps[harm] : 1.0;
                w = (harm + 1) * (i * scale);
                val += amp * Math.cos(w + phase);
            }

            return val;
        });
    };

    flock.generateNormalizedFourierTable = function (size, scale, numHarms, phase, ampGenFn) {
        var amps = flock.generate(numHarms, function (harm) {
            return ampGenFn(harm + 1); //  Harmonics are indexed from 1 instead of 0.
        });

        var table = flock.generateFourierTable(size, scale, numHarms, phase, amps);
        return flock.normalize(table);
    };

    flock.fillTable = function (sizeOrTable, fillFn) {
        var len = typeof (sizeOrTable) === "number" ? sizeOrTable : sizeOrTable.length;
        return fillFn(sizeOrTable, flock.TWOPI / len);
    };

    flock.tableGenerators = {
        sin: function (size, scale) {
            return flock.generate(size, function (i) {
                return Math.sin(i * scale);
            });
        },

        tri: function (size, scale) {
            return flock.generateNormalizedFourierTable(size, scale, 1000, 1.0, function (harm) {
                // Only odd harmonics,
                // amplitudes decreasing by the inverse square of the harmonic number
                return harm % 2 === 0 ? 0.0 : 1.0 / (harm * harm);
            });
        },

        saw: function (size, scale) {
            return flock.generateNormalizedFourierTable(size, scale, 10, -0.25, function (harm) {
                // All harmonics,
                // amplitudes decreasing by the inverse of the harmonic number
                return 1.0 / harm;
            });
        },

        square: function (size, scale) {
            return flock.generateNormalizedFourierTable(size, scale, 10, -0.25, function (harm) {
                // Only odd harmonics,
                // amplitudes decreasing by the inverse of the harmonic number
                return harm % 2 === 0 ? 0.0 : 1.0 / harm;
            });
        },

        hann: function (size) {
            // Hanning envelope: sin^2(i) for i from 0 to pi
            return flock.generate(size, function (i) {
                var y = Math.sin(Math.PI * i / size);
                return y * y;
            });
        },

        sinWindow: function (size) {
            return flock.generate(size, function (i) {
                return Math.sin(Math.PI * i / size);
            });
        }
    };

    flock.range = function (buf) {
        var range = {
            max: Number.NEGATIVE_INFINITY,
            min: Infinity
        };
        var i, val;

        for (i = 0; i < buf.length; i++) {
            val = buf[i];
            if (val > range.max) {
                range.max = val;
            }
            if (val < range.min) {
                range.min = val;
            }
        }

        return range;
    };

    flock.scale = function (buf) {
        if (!buf) {
            return;
        }

        var range = flock.range(buf),
            mul = (range.max - range.min) / 2,
            sub = (range.max + range.min) / 2,
            i;

        for (i = 0; i < buf.length; i++) {
            buf[i] = (buf[i] - sub) / mul;
        }

        return buf;
    };

    flock.copyBuffer = function (buffer, start, end) {
        if (end === undefined) {
            end = buffer.length;
        }

        var len = end - start,
            target = new Float32Array(len),
            i,
            j;

        for (i = start, j = 0; i < end; i++, j++) {
            target[j] = buffer[i];
        }

        return target;
    };

    flock.parseMidiString = function (midiStr) {
        if (!midiStr || midiStr.length < 2) {
            return NaN;
        }

        midiStr = midiStr.toLowerCase();

        var secondChar = midiStr.charAt(1),
            splitIdx = secondChar === "#" || secondChar === "b" ? 2 : 1,
            note = midiStr.substring(0, splitIdx),
            octave = Number(midiStr.substring(splitIdx)),
            pitchClass = flock.midiFreq.noteNames[note],
            midiNum = octave * 12 + pitchClass;

        return midiNum;
    };

    flock.midiFreq = function (midi, a4Freq, a4NoteNum, notesPerOctave) {
        a4Freq = a4Freq === undefined ? 440 : a4Freq;
        a4NoteNum = a4NoteNum === undefined ? 69 : a4NoteNum;
        notesPerOctave = notesPerOctave || 12;

        if (typeof midi === "string") {
            midi = flock.parseMidiString(midi);
        }

        return a4Freq * Math.pow(2, (midi - a4NoteNum) * 1 / notesPerOctave);
    };

    flock.midiFreq.noteNames = {
        "b#": 0,
        "c": 0,
        "c#": 1,
        "db": 1,
        "d": 2,
        "d#": 3,
        "eb": 3,
        "e": 4,
        "e#": 5,
        "f": 5,
        "f#": 6,
        "gb": 6,
        "g": 7,
        "g#": 8,
        "ab": 8,
        "a": 9,
        "a#": 10,
        "bb": 10,
        "b": 11,
        "cb": 11
    };

    flock.interpolate = {
        /**
         * Performs simple truncation.
         */
        none: function (idx, table) {
            idx = idx % table.length;

            return table[idx | 0];
        },

        /**
         * Performs linear interpolation.
         */
        linear: function (idx, table) {
            var len = table.length;
            idx = idx % len;

            var i1 = idx | 0,
                i2 = (i1 + 1) % len,
                frac = idx - i1,
                y1 = table[i1],
                y2 = table[i2];

            return y1 + frac * (y2 - y1);
        },

        /**
         * Performs Hermite cubic interpolation.
         *
         * Based on Laurent De Soras' implementation at:
         * http://www.musicdsp.org/showArchiveComment.php?ArchiveID=93
         *
         * @param idx {Number} an index into the table
         * @param table {Arrayable} the table from which values around idx should be drawn and interpolated
         * @return {Number} an interpolated value
         */
        hermite: function (idx, table) {
            var len = table.length,
                intPortion = Math.floor(idx),
                i0 = intPortion % len,
                frac = idx - intPortion,
                im1 = i0 > 0 ? i0 - 1 : len - 1,
                i1 = (i0 + 1) % len,
                i2 = (i0 + 2) % len,
                xm1 = table[im1],
                x0 = table[i0],
                x1 = table[i1],
                x2 = table[i2],
                c = (x1 - xm1) * 0.5,
                v = x0 - x1,
                w = c + v,
                a = w + v + (x2 - x0) * 0.5,
                bNeg = w + a,
                val = (((a * frac) - bNeg) * frac + c) * frac + x0;

            return val;
        }
    };

    flock.interpolate.cubic = flock.interpolate.hermite;

    flock.log = {
        fail: function (msg) {
            fluid.log(fluid.logLevel.FAIL, msg);
        },

        warn: function (msg) {
            fluid.log(fluid.logLevel.WARN, msg);
        },

        debug: function (msg) {
            fluid.log(fluid.logLevel.INFO, msg);
        }
    };

    flock.fail = function (msg) {
        if (flock.debug.failHard) {
            throw new Error(msg);
        } else {
            flock.log.fail(msg);
        }
    };

    flock.pathParseError = function (root, path, token) {
        var msg = "Error parsing path '" + path + "'. Segment '" + token +
            "' could not be resolved. Root object was: " + fluid.prettyPrintJSON(root);

        flock.fail(msg);
    };

    flock.get = function (root, path) {
        if (!root) {
            return fluid.getGlobalValue(path);
        }

        if (arguments.length === 1 && typeof root === "string") {
            return fluid.getGlobalValue(root);
        }

        if (!path || path === "") {
            return;
        }

        var tokenized = path === "" ? [] : String(path).split("."),
            valForSeg = root[tokenized[0]],
            i;

        for (i = 1; i < tokenized.length; i++) {
            if (valForSeg === null || valForSeg === undefined) {
                flock.pathParseError(root, path, tokenized[i - 1]);
                return;
            }
            valForSeg = valForSeg[tokenized[i]];
        }

        return valForSeg;
    };

    flock.set = function (root, path, value) {
        if (!root || !path || path === "") {
            return;
        }

        var tokenized = String(path).split("."),
            l = tokenized.length,
            prop = tokenized[0],
            i,
            type;

        for (i = 1; i < l; i++) {
            root = root[prop];
            type = typeof root;
            if (type !== "object") {
                flock.fail("Error while setting a value at path '" + path +
                    "'. A non-container object was found at segment '" + prop + "'. Value: " + root);

                return;
            }
            prop = tokenized[i];
            if (root[prop] === undefined) {
                root[prop] = {};
            }
        }
        root[prop] = value;

        return value;
    };

    flock.invoke = function (root, path, args) {
        var fn = typeof root === "function" ? root : flock.get(root, path);
        if (typeof fn !== "function") {
            flock.fail("Path '" + path + "' does not resolve to a function.");
            return;
        }
        return fn.apply(null, args);
    };


    flock.input = {};

    flock.input.shouldExpand = function (inputName) {
        return flock.parse.specialInputs.indexOf(inputName) < 0;
    };

    // TODO: Replace this with a regular expression;
    // this produces too much garbage!
    flock.input.pathExpander = function (path) {
        var segs = fluid.model.parseEL(path),
            separator = "inputs",
            len = segs.length,
            penIdx = len - 1,
            togo = [],
            i;

        for (i = 0; i < penIdx; i++) {
            var seg = segs[i];
            var nextSeg = segs[i + 1];

            togo.push(seg);

            if (nextSeg === "model" || nextSeg === "options") {
                togo = togo.concat(segs.slice(i + 1, penIdx));
                break;
            }

            if (!isNaN(Number(nextSeg))) {
                continue;
            }

            togo.push(separator);
        }

        togo.push(segs[penIdx]);

        return togo.join(".");
    };

    flock.input.expandPaths = function (paths) {
        var expanded = {},
            path,
            expandedPath,
            value;

        for (path in paths) {
            expandedPath = flock.input.pathExpander(path);
            value = paths[path];
            expanded[expandedPath] = value;
        }

        return expanded;
    };

    flock.input.expandPath = function (path) {
        return (typeof path === "string") ? flock.input.pathExpander(path) : flock.input.expandPaths(path);
    };

    flock.input.getValueForPath = function (root, path) {
        path = flock.input.expandPath(path);
        var input = flock.get(root, path);

        // If the unit generator is a valueType ugen, return its value, otherwise return the ugen itself.
        return flock.hasTag(input, "flock.ugen.valueType") ? input.inputs.value : input;
    };

    flock.input.getValuesForPathArray = function (root, paths) {
        var values = {},
            i,
            path;

        for (i = 0; i < paths.length; i++) {
            path = paths[i];
            values[path] = flock.input.get(root, path);
        }

        return values;
    };

    flock.input.getValuesForPathObject = function (root, pathObj) {
        var key;

        for (key in pathObj) {
            pathObj[key] = flock.input.get(root, key);
        }

        return pathObj;
    };

    /**
     * Gets the value of the ugen at the specified path.
     *
     * @param {String} path the ugen's path within the synth graph
     * @return {Number|UGen} a scalar value in the case of a value ugen, otherwise the ugen itself
     */
    flock.input.get = function (root, path) {
        return typeof path === "string" ? flock.input.getValueForPath(root, path) :
            flock.isIterable(path) ? flock.input.getValuesForPathArray(root, path) :
            flock.input.getValuesForPathObject(root, path);
    };

    flock.input.resolveValue = function (root, path, val, target, inputName, previousInput, valueParser) {
        // Check to see if the value is actually a "get expression"
        // (i.e. an EL path wrapped in ${}) and resolve it if necessary.
        if (typeof val === "string") {
            var extracted = fluid.extractEL(val, flock.input.valueExpressionSpec);
            if (extracted) {
                var resolved = flock.input.getValueForPath(root, extracted);
                if (resolved === undefined) {
                    flock.log.debug("The value expression '" + val + "' resolved to undefined. " +
                    "If this isn't expected, check to ensure that your path is valid.");
                }

                return resolved;
            }
        }

        return flock.input.shouldExpand(inputName) && valueParser ?
            valueParser(val, path, target, previousInput) : val;
    };

    flock.input.valueExpressionSpec = {
        ELstyle: "${}"
    };

    flock.input.setValueForPath = function (root, path, val, baseTarget, valueParser) {
        path = flock.input.expandPath(path);

        var previousInput = flock.get(root, path),
            lastDotIdx = path.lastIndexOf("."),
            inputName = path.slice(lastDotIdx + 1),
            target = lastDotIdx > -1 ? flock.get(root, path.slice(0, path.lastIndexOf(".inputs"))) :
                baseTarget,
            resolvedVal = flock.input.resolveValue(root, path, val, target, inputName, previousInput, valueParser);

        flock.set(root, path, resolvedVal);

        if (target && target.onInputChanged) {
            target.onInputChanged(inputName);
        }

        return resolvedVal;
    };

    flock.input.setValuesForPaths = function (root, valueMap, baseTarget, valueParser) {
        var resultMap = {},
            path,
            val,
            result;

        for (path in valueMap) {
            val = valueMap[path];
            result = flock.input.set(root, path, val, baseTarget, valueParser);
            resultMap[path] = result;
        }

        return resultMap;
    };

    /**
     * Sets the value of the ugen at the specified path.
     *
     * @param {String} path the ugen's path within the synth graph
     * @param {Number || UGenDef} val a scalar value (for Value ugens) or a UGenDef object
     * @return {UGen} the newly created UGen that was set at the specified path
     */
    flock.input.set = function (root, path, val, baseTarget, valueParser) {
        return typeof path === "string" ?
            flock.input.setValueForPath(root, path, val, baseTarget, valueParser) :
            flock.input.setValuesForPaths(root, path, baseTarget, valueParser);
    };


    fluid.defaults("flock.nodeList", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        members: {
            nodes: [],
            namedNodes: {}
        },

        invokers: {
            insert: {
                funcName: "flock.nodeList.insert",
                // TODO: Backwards arguments?
                args: [
                    "{arguments}.0", // The index to insert it at.
                    "{arguments}.1", // The node to insert.
                    "{that}.nodes",
                    "{that}.events.onInsert.fire"
                ]
            },

            head: {
                func: "{that}.insert",
                args: [0, "{arguments}.0"]
            },

            tail: {
                funcName: "flock.nodeList.tail",
                args: ["{arguments}.0", "{that}.nodes", "{that}.insert"]
            },

            before: {
                funcName: "flock.nodeList.before",
                args: [
                    "{arguments}.0", // Reference node.
                    "{arguments}.1", // Node to add.
                    "{that}.nodes",
                    "{that}.insert"
                ]
            },

            after: {
                funcName: "flock.nodeList.after",
                args: [
                    "{arguments}.0", // Reference node.
                    "{arguments}.1", // Node to add.
                    "{that}.nodes",
                    "{that}.insert"
                ]
            },

            remove: {
                funcName: "flock.nodeList.remove",
                args: [
                    "{arguments}.0", // Node to remove.
                    "{that}.nodes",
                    "{that}.events.onRemove.fire"
                ]
            },

            replace: {
                funcName: "flock.nodeList.replace",
                args: [
                    // TODO: Backwards arguments?
                    "{arguments}.0", // New node.
                    "{arguments}.1", // Old node.
                    "{that}.nodes",
                    "{that}.head",
                    "{that}.events.onRemove.fire",
                    "{that}.events.onInsert.fire"
                ]
            },

            clearAll: {
                func: "{that}.events.onClearAll.fire"
            }
        },

        events: {
            onInsert: null,
            onRemove: null,
            onClearAll: null
        },

        listeners: {
            onClearAll: [
                {
                    func: "fluid.clear",
                    args: "{that}.nodes"
                },
                {
                    func: "fluid.clear",
                    args: "{that}.namedNodes"
                }
            ],

            onInsert: {
                funcName: "flock.nodeList.registerNode",
                args: ["{arguments}.0", "{that}.namedNodes"]
            },

            onRemove: {
                funcName: "flock.nodeList.unregisterNode",
                args: ["{arguments}.0", "{that}.namedNodes"]
            }
        }
    });

    flock.nodeList.insert = function (idx, node, nodes, onInsert) {
        if (idx < 0) {
            idx = 0;
        }

        nodes.splice(idx, 0, node);
        onInsert(node, idx);

        return idx;
    };

    flock.nodeList.registerNode = function (node, namedNodes) {
        if (!node.nickName) {
            return;
        }

        namedNodes[node.nickName] = node;
    };

    flock.nodeList.before = function (refNode, node, nodes, insertFn) {
        var refIdx = nodes.indexOf(refNode);
        return insertFn(refIdx, node);
    };

    flock.nodeList.after = function (refNode, node, nodes, insertFn) {
        var refIdx = nodes.indexOf(refNode),
            atIdx = refIdx + 1;

        return insertFn(atIdx, node);
    };

    flock.nodeList.tail = function (node, nodes, insertFn) {
        var idx = nodes.length;
        return insertFn(idx, node);
    };

    flock.nodeList.remove = function (node, nodes, onRemove) {
        var idx = nodes.indexOf(node);
        if (idx > -1) {
            nodes.splice(idx, 1);
            onRemove(node);
        }

        return idx;
    };

    flock.nodeList.unregisterNode = function (node, namedNodes) {
        delete namedNodes[node.nickName];
    };

    flock.nodeList.replace = function (newNode, oldNode, nodes, notFoundFn, onRemove, onInsert) {
        var idx = nodes.indexOf(oldNode);
        if (idx < 0) {
            return notFoundFn(newNode);
        }

        nodes[idx] = newNode;
        onRemove(oldNode);
        onInsert(newNode);

        return idx;
    };


    /***********************
     * Synths and Playback *
     ***********************/

    fluid.defaults("flock.audioSystem", {
        gradeNames: ["fluid.standardRelayComponent", "autoInit"],

        channelRange: {
            min: 1,
            max: 32
        },

        outputBusRange: {
            min: 2,
            max: 1024
        },

        inputBusRange: {
            min: 1, // TODO: This constraint should be removed.
            max: 32
        },

        model: {
            rates: {
                audio: 44100,
                control: 689.0625,
                scheduled: 0,
                demand: 0,
                constant: 0
            },
            blockSize: 64,
            numBlocks: 16,
            chans: 2,
            numInputBuses: 2,
            numBuses: 8,
            bufferSize: "@expand:flock.audioSystem.defaultBufferSize()"
        },

        modelRelay: [
            {
                target: "rates.control",
                singleTransform: {
                    type: "fluid.transforms.binaryOp",
                    left: "{that}.model.rates.audio",
                    operator: "/",
                    right: "{that}.model.blockSize"
                }
            },
            {
                target: "numBlocks",
                singleTransform: {
                    type: "fluid.transforms.binaryOp",
                    left: "{that}.model.bufferSize",
                    operator: "/",
                    right: "{that}.model.blockSize"
                }
            },
            {
                target: "chans",
                singleTransform: {
                    type: "fluid.transforms.limitRange",
                    input: "{that}.model.chans",
                    min: "{that}.options.channelRange.min",
                    max: "{that}.options.channelRange.max"
                }
            },
            {
                target: "numInputBuses",
                singleTransform: {
                    type: "fluid.transforms.limitRange",
                    input: "{that}.model.numInputBuses",
                    min: "{that}.options.inputBusRange.min",
                    max: "{that}.options.inputBusRange.max"
                }
            },
            {
                target: "numBuses",
                singleTransform: {
                    type: "fluid.transforms.free",
                    func: "flock.audioSystem.clampNumBuses",
                    args: ["{that}.model.numBuses", "{that}.options.outputBusRange", "{that}.model.chans"]
                }
            }
        ]
    });

    flock.audioSystem.clampNumBuses = function (numBuses, outputBusRange, chans) {
        numBuses = Math.max(numBuses, Math.max(chans, outputBusRange.min));
        numBuses = Math.min(numBuses, outputBusRange.max);

        return numBuses;
    };

    flock.audioSystem.defaultBufferSize = function () {
        return flock.platform.isMobile ? 8192 :
            flock.platform.browser.mozilla ? 2048 : 1024;
    };


    /*****************
     * Node Evalutor *
     *****************/

    fluid.defaults("flock.nodeEvaluator", {
        gradeNames: ["fluid.standardRelayComponent", "autoInit"],

        model: "{audioSystem}.model",

        members: {
            nodes: "{enviro}.nodes",
            buses: "{busManager}.buses"
        },

        invokers: {
            gen: {
                funcName: "flock.nodeEvaluator.gen",
                args: ["{that}.nodes"]
            },

            clearBuses: {
                funcName: "flock.nodeEvaluator.clearBuses",
                args: [
                    "{that}.model.numBuses",
                    "{that}.model.blockSize",
                    "{that}.buses"
                ]
            }
        }
    });

    flock.nodeEvaluator.gen = function (nodes) {
        var i,
            node;

        // Now evaluate each node.
        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];
            node.genFn(node);
        }
    };


    flock.nodeEvaluator.clearBuses = function (numBuses, busLen, buses) {
        for (var i = 0; i < numBuses; i++) {
            var bus = buses[i];
            for (var j = 0; j < busLen; j++) {
                bus[j] = 0;
            }
        }
    };


    fluid.defaults("flock.audioStrategy", {
        gradeNames: ["fluid.standardRelayComponent"],

        components: {
            nodeEvaluator: {
                type: "flock.nodeEvaluator"
            }
        },

        invokers: {
            reset: {
                func: "{that}.events.onReset.fire"
            }
        },

        events: {
            onStart: "{enviro}.events.onStart",
            onStop: "{enviro}.events.onStop",
            onReset: "{enviro}.events.onReset"
        }
    });

    // TODO: Refactor how buses work so that they're clearly
    // delineated into types--input, output, and interconnect.
    // TODO: Get rid of the concept of buses altogether.
    fluid.defaults("flock.busManager", {
        gradeNames: ["fluid.standardRelayComponent", "autoInit"],

        model: {
            nextAvailableBus: {
                input: 0,
                interconnect: 0
            }
        },

        members: {
            buses: {
                expander: {
                    funcName: "flock.enviro.createAudioBuffers",
                    args: ["{audioSystem}.model.numBuses", "{audioSystem}.model.blockSize"]
                }
            }
        },

        invokers: {
            acquireNextBus: {
                funcName: "flock.busManager.acquireNextBus",
                args: [
                    "{arguments}.0", // The type of bus, either "input" or "interconnect".
                    "{that}.buses",
                    "{that}.applier",
                    "{that}.model",
                    "{audioSystem}.model.chans",
                    "{audioSystem}.model.numInputBuses"
                ]
            }
        }
    });

    flock.busManager.acquireNextBus = function (type, buses, applier, m, chans, numInputBuses) {
        var busNum = m.nextAvailableBus[type];

        if (busNum === undefined) {
            flock.fail("An invalid bus type was specified when invoking " +
                "flock.busManager.acquireNextBus(). Type was: " + type);
            return;
        }

        // Input buses start immediately after the output buses.
        var offsetBusNum = busNum + chans,
            offsetBusMax = chans + numInputBuses;

        // Interconnect buses are after the input buses.
        if (type === "interconnect") {
            offsetBusNum += numInputBuses;
            offsetBusMax = buses.length;
        }

        if (offsetBusNum >= offsetBusMax) {
            flock.fail("Unable to aquire a bus. There are insufficient buses available. " +
                "Please use an existing bus or configure additional buses using the enviroment's " +
                "numBuses and numInputBuses parameters.");
            return;
        }

        applier.change("nextAvailableBus." + type, ++busNum);

        return offsetBusNum;
    };


    fluid.defaults("flock.enviro", {
        gradeNames: ["fluid.standardRelayComponent", "flock.nodeList", "autoInit"],

        members: {
            buffers: {},
            bufferSources: {}
        },

        components: {
            asyncScheduler: {
                type: "flock.scheduler.async"
            },

            audioSystem: {
                type: "flock.audioSystem.platform"
            },

            audioStrategy: {
                type: "flock.audioStrategy.platform",
                options: {
                    audioSettings: "{audioSystem}.model"
                }
            },

            busManager: {
                type: "flock.busManager"
            }
        },

        model: {
            isPlaying: false
        },

        invokers: {
            /**
             * Generates a block of samples by evaluating all registered nodes.
             */
            gen: "flock.enviro.gen({audioStrategy}.nodeEvaluator)",

            /**
             * Starts generating samples from all synths.
             *
             * @param {Number} dur optional duration to play in seconds
             */
            start: "flock.enviro.start({that}.model, {that}.events.onStart.fire)",

            /**
             * Deprecated. Use start() instead.
             */
            play: "{that}.start",

            /**
             * Stops generating samples.
             */
            stop: "flock.enviro.stop({that}.model, {that}.events.onStop.fire)",


            /**
             * Fully resets the state of the environment.
             */
            reset: "{that}.events.onReset.fire()",

            /**
             * Registers a shared buffer.
             *
             * @param {BufferDesc} bufDesc the buffer description object to register
             */
            registerBuffer: "flock.enviro.registerBuffer({arguments}.0, {that}.buffers)",

            /**
             * Releases a shared buffer.
             *
             * @param {String|BufferDesc} bufDesc the buffer description (or string id) to release
             */
            releaseBuffer: "flock.enviro.releaseBuffer({arguments}.0, {that}.buffers)",

            /**
             * Saves a buffer to the user's computer.
             *
             * @param {String|BufferDesc} id the id of the buffer to save
             * @param {String} path the path to save the buffer to (if relevant)
             */
            saveBuffer: {
                funcName: "flock.enviro.saveBuffer",
                args: [
                    "{arguments}.0",
                    "{that}.buffers",
                    "{audioStrategy}"
                ]
            }
        },

        events: {
            onStart: null,
            onPlay: "{that}.events.onStart", // Deprecated. Use onStart instead.
            onStop: null,
            onReset: null
        },

        listeners: {
            onStart: [
                "{that}.applier.change(isPlaying, true)",
            ],

            onStop: [
                "{that}.applier.change(isPlaying, false)"
            ],

            onReset: [
                "{that}.stop()",
                "{asyncScheduler}.clearAll()",
                {
                    func: "{that}.applier.change",
                    args: ["nextAvailableBus.input", []]
                },
                {
                    func: "{that}.applier.change",
                    args: ["nextAvailableBus.interconnect", []]
                },
                "{that}.clearAll()"
            ]
        }
    });

    flock.enviro.registerBuffer = function (bufDesc, buffers) {
        if (bufDesc.id) {
            buffers[bufDesc.id] = bufDesc;
        }
    };

    flock.enviro.releaseBuffer = function (bufDesc, buffers) {
        if (!bufDesc) {
            return;
        }

        var id = typeof bufDesc === "string" ? bufDesc : bufDesc.id;
        delete buffers[id];
    };

    flock.enviro.saveBuffer = function (o, buffers, audioStrategy) {
        if (typeof o === "string") {
            o = {
                buffer: o
            };
        }

        if (typeof o.buffer === "string") {
            var id = o.buffer;
            o.buffer = buffers[id];
            o.buffer.id = id;
        }

        o.type = o.type || "wav";
        o.path = o.path || o.buffer.id + "." + o.type;
        o.format = o.format || "int16";

        return audioStrategy.saveBuffer(o, o.buffer);
    };

    flock.enviro.gen = function (nodeEvaluator) {
        nodeEvaluator.clearBuses();
        nodeEvaluator.gen();
    };

    flock.enviro.start = function (model, onStart) {
        if (!model.isPlaying) {
            onStart();
        }
    };

    flock.enviro.stop = function (model, onStop) {
        if (model.isPlaying) {
            onStop();
        }
    };

    flock.enviro.createAudioBuffers = function (numBufs, blockSize) {
        var bufs = [],
            i;
        for (i = 0; i < numBufs; i++) {
            bufs[i] = new Float32Array(blockSize);
        }
        return bufs;
    };


    fluid.defaults("flock.autoEnviro", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        members: {
            enviro: "@expand:flock.autoEnviro.initEnvironment()"
        }
    });

    flock.autoEnviro.initEnvironment = function () {
        if (!flock.environment) {
            flock.init();
        }

        return flock.environment;
    };

    fluid.defaults("flock.node", {
        gradeNames: ["flock.autoEnviro", "fluid.standardRelayComponent", "autoInit"],
        model: {}
    });

    fluid.defaults("flock.ugenNodeList", {
        gradeNames: ["flock.nodeList", "autoInit"],

        invokers: {
            /**
             * Inserts a unit generator and all its inputs into the node list,
             * starting at the specified index.
             *
             * Note that the node itself will not be inserted into the list at this index;
             * its inputs must must be ahead of it in the list.
             *
             * @param {Number} idx the index to start adding the new node and its inputs at
             * @param {UGen} node the node to add, along with its inputs
             * @return {Number} the index at which the specified node was inserted
             */
            insertTree: {
                funcName: "flock.ugenNodeList.insertTree",
                args: [
                    "{arguments}.0", // The index at whcih to add the new node.
                    "{arguments}.1", // The node to add.
                    "{that}.insert"
                ]
            },

            /**
             * Removes the specified unit generator and all its inputs from the node list.
             *
             * @param {UGen} node the node to remove along with its inputs
             * @return {Number} the index at which the node was removed
             */
            removeTree: {
                funcName: "flock.ugenNodeList.removeTree",
                args: [
                    "{arguments}.0", // The node to remove.
                    "{that}.remove"
                ]
            },

            /**
             * Replaces one node and all its inputs with a new node and its inputs.
             *
             * @param {UGen} newNode the node to add to the list
             * @param {UGen} oldNode the node to remove from the list
             * @return {Number} idx the index at which the new node was added
             */
            //flock.ugenNodeList.replaceTree = function (newNode, oldNode, insertFn, removeFn) {
            replaceTree: {
                funcName: "flock.ugenNodeList.replaceTree",
                args: [
                    "{arguments}.0", // The node to add.
                    "{arguments}.1", // The node to replace.
                    "{that}.nodes",
                    "{that}.insert",
                    "{that}.remove"
                ]
            },

            /**
             * Swaps one node in the list for another in place, attaching the previous unit generator's
             * inputs to the new one. If a list of inputsToReattach is specified, only these inputs will
             * be swapped.
             *
             * Note that this function will directly modify the nodes in question.
             *
             * @param {UGen} newNode the node to add to the list, swapping it in place for the old one
             * @param {UGen} oldNode the node remove from the list
             * @param {Array} inputsToReattach a list of inputNames to attach to the new node from the old one
             * @return the index at which the new node was inserted
             */
            //flock.ugenNodeList.swapTree = function (newNode, oldNode, inputsToReattach, removeFn, replaceTreeFn, replaceFn) {

            swapTree: {
                funcName: "flock.ugenNodeList.swapTree",
                args: [
                    "{arguments}.0", // The node to add.
                    "{arguments}.1", // The node to replace.
                    "{arguments}.2", // A list of inputs to attach to the new node from the old.
                    "{that}.remove",
                    "{that}.replaceTree",
                    "{that}.replace"
                ]
            }
        }
    });

    flock.ugenNodeList.insertTree = function (idx, node, insertFn) {
        var inputs = node.inputs,
            key,
            input;

        for (key in inputs) {
            input = inputs[key];
            if (flock.isUGen(input)) {
                idx = flock.ugenNodeList.insertTree(idx, input, insertFn);
                idx++;
            }
        }

        return insertFn(idx, node);
    };

    flock.ugenNodeList.removeTree = function (node, removeFn) {
        var inputs = node.inputs,
            key,
            input;

        for (key in inputs) {
            input = inputs[key];
            if (flock.isUGen(input)) {
                flock.ugenNodeList.removeTree(input, removeFn);
            }
        }

        return removeFn(node);
    };

    flock.ugenNodeList.replaceTree = function (newNode, oldNode, nodes, insertFn, removeFn) {
        if (!oldNode) {
             // Can't use .tail() because it won't recursively add inputs.
            return flock.ugenNodeList.insertTree(nodes.length, newNode, insertFn);
        }

        var idx = flock.ugenNodeList.removeTree(oldNode, removeFn);
        flock.ugenNodeList.insertTree(idx, newNode, insertFn);

        return idx;
    };

    flock.ugenNodeList.swapTree = function (newNode, oldNode, inputsToReattach, removeFn, replaceTreeFn, replaceFn) {
        if (!inputsToReattach) {
            newNode.inputs = oldNode.inputs;
        } else {
            flock.ugenNodeList.reattachInputs(newNode, oldNode, inputsToReattach, removeFn);
            flock.ugenNodeList.replaceInputs(newNode, oldNode, inputsToReattach, replaceTreeFn);
        }

        return replaceFn(newNode, oldNode);
    };

    flock.ugenNodeList.reattachInputs = function (newNode, oldNode, inputsToReattach, removeFn) {
        for (var inputName in oldNode.inputs) {
            if (inputsToReattach.indexOf(inputName) < 0) {
                flock.ugenNodeList.removeTree(oldNode.inputs[inputName], removeFn);
            } else {
                newNode.inputs[inputName] = oldNode.inputs[inputName];
            }
        }
    };

    flock.ugenNodeList.replaceInputs = function (newNode, oldNode, inputsToReattach, replaceTreeFn) {
        for (var inputName in newNode.inputs) {
            if (inputsToReattach.indexOf(inputName) < 0) {
                replaceTreeFn(
                    newNode.inputs[inputName],
                    oldNode.inputs[inputName]
                );
            }
        }
    };


    /**
     * Synths represent a collection of signal-generating units,
     * wired together to form an instrument.
     * They are created with a synthDef object, which is a declarative structure
     * that describes the synth's unit generator graph.
     */
    fluid.defaults("flock.synth", {
        gradeNames: ["flock.node", "flock.ugenNodeList", "autoInit"],

        addToEnvironment: "tail",
        rate: flock.rates.AUDIO,

        members: {
            rate: "{that}.options.rate",
            audioSettings: "{enviro}.audioSystem.model", // TODO: Move this.
            out: {
                expander: {
                    funcName: "flock.synth.parseSynthDef",
                    args: [
                        "{that}.options.synthDef",
                        "{that}.rate",
                        "{enviro}.audioSystem.model",
                        "{that}.enviro.buffers",
                        "{that}.enviro.busManager.buses",
                        "{that}.tail"
                    ]
                }
            },

            genFn: "@expand:fluid.getGlobalValue({that}.options.invokers.gen.funcName)"
        },

        components: {
            enviro: "{environment}"
        },

        model: {
            blockSize: "@expand:flock.synth.calcBlockSize({that}.rate, {enviro}.audioSystem.model)"
        },

        invokers: {
            /**
             * Plays the synth. This is a convenience method that will add the synth to the tail of the
             * environment's node graph and then play the environmnent.
             *
             * @param {Number} dur optional duration to play this synth in seconds
             */
            play: {
                funcName: "flock.synth.play",
                args: ["{that}", "{that}.enviro", "{that}.addToEnvironment"]
            },

            /**
             * Stops the synth if it is currently playing.
             * This is a convenience method that will remove the synth from the environment's node graph.
             */
            pause: {
                funcName: "flock.synth.pause",
                args: ["{that}", "{that}.enviro"]
            },

            /**
             * Sets the value of the ugen at the specified path.
             *
             * @param {String} path the ugen's path within the synth graph
             * @param {Number || UGenDef} val a scalar value (for Value ugens) or a UGenDef object
             * @param {Boolean} swap ??
             * @return {UGen} the newly created UGen that was set at the specified path
             */
            set: {
                funcName: "flock.synth.set",
                args: ["{that}", "{that}.namedNodes", "{arguments}.0", "{arguments}.1", "{arguments}.2"]
            },

            /**
             * Gets the value of the ugen at the specified path.
             *
             * @param {String} path the ugen's path within the synth graph
             * @return {Number|UGen} a scalar value in the case of a value ugen, otherwise the ugen itself
             */
            get: {
                funcName: "flock.input.get",
                args: ["{that}.namedNodes", "{arguments}.0"]
            },

            /**
             * Deprecated.
             *
             * Gets or sets the value of a ugen at the specified path
             *
             * @param {String} path the ugen's path within the synth graph
             * @param {Number || UGenDef || Array} val an optional value to to set--a scalar value, a UGenDef object, or an array of UGenDefs
             * @param {Boolean || Object} swap specifies if the existing inputs should be swapped onto the new value
             * @return {Number || UGenDef || Array} the value that was set or retrieved
             */
            input: {
                funcName: "flock.synth.input",
                args: [
                    "{arguments}",
                    "{that}.get",
                    "{that}.set"
                ]
            },

            /**
             * Generates one block of audio rate signal by evaluating this synth's unit generator graph.
             */
            gen: {
                funcName: "flock.synth.gen",
                args: "{that}"
            },

            /**
             * Adds the synth to its environment's list of active nodes.
             *
             * @param {String || Boolean || Number} position the place to insert the node at;
             *     if undefined, the synth's addToEnvironment option will be used.
             */
            addToEnvironment: {
                funcName: "flock.synth.addToEnvironment",
                args: ["{that}", "{arguments}.0", "{that}.options", "{that}.enviro"]
            }
        },

        listeners: {
            onCreate: {
                funcName: "flock.synth.addToEnvironment",
                args: ["{that}", undefined, "{that}.options", "{that}.enviro"]
            },

            onDestroy: {
                "func": "{that}.pause"
            }
        }
    });

    flock.synth.calcBlockSize = function (rate, audioSettings) {
        return rate === flock.rates.AUDIO ? audioSettings.blockSize : 1;
    };

    flock.synth.parseSynthDef = function (synthDef, rate, audioSettings, buffers, buses, tailFn) {
        if (!synthDef) {
            fluid.log(fluid.logLevel.IMPORTANT,
                "Warning: Instantiating a flock.synth instance with an empty synth def.");
        }

        // At demand or schedule rates, override the rate of all non-constant ugens.
        var overrideRate = rate === flock.rates.SCHEDULED || rate === flock.rates.DEMAND;

        // Parse the synthDef into a graph of unit generators.
        return flock.parse.synthDef(synthDef, {
            rate: rate,
            overrideRate: overrideRate,
            visitors: tailFn,
            buffers: buffers,
            buses: buses,
            audioSettings: audioSettings
        });
    };

    flock.synth.play = function (synth, enviro, addToEnviroFn) {
        if (enviro.nodes.indexOf(synth) === -1) {
            var position = synth.options.addToEnvironment || "tail";
            addToEnviroFn(position);
        }

        // TODO: This behaviour is confusing
        // since calling mySynth.play() will cause
        // all synths in the environment to be played.
        // This functionality should be removed.
        if (!enviro.model.isPlaying) {
            enviro.play();
        }
    };

    flock.synth.pause = function (synth, enviro) {
        enviro.remove(synth);
    };

    flock.synth.set = function (that, namedNodes, path, val, swap) {
        return flock.input.set(namedNodes, path, val, undefined, function (ugenDef, path, target, prev) {
            return flock.synth.ugenValueParser(that, ugenDef, prev, swap);
        });
    };

    flock.synth.gen = function (that) {
        var nodes = that.nodes,
            m = that.model,
            i,
            node;

        for (i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if (node.gen !== undefined) {
                node.gen(node.model.blockSize); // TODO: De-thatify.
            }

            m.value = node.model.value;
        }
    };

    flock.synth.input = function (args, getFn, setFn) {
        //path, val, swap
        var path = args[0];

        return !path ? undefined : typeof path === "string" ?
            args.length < 2 ? getFn(path) : setFn.apply(null, args) :
            flock.isIterable(path) ? getFn(path) : setFn.apply(null, args);
    };

    flock.synth.addToEnvironment = function (synth, position, options, enviro) {
        if (position === undefined) {
            position = options.addToEnvironment;
        }

        // Add this synth to the tail of the synthesis environment if appropriate.
        if (position === undefined || position === null || position === false) {
            return;
        }

        var type = typeof (position);
        if (type === "string" && position === "head" || position === "tail") {
            enviro[position](synth);
        } else if (type === "number") {
            enviro.insert(position, synth);
        } else {
            enviro.tail(synth);
        }
    };

    // TODO: Reduce all these dependencies on "that" (i.e. a synth instance).
    flock.synth.ugenValueParser = function (that, ugenDef, prev, swap) {
        if (ugenDef === null || ugenDef === undefined) {
            return prev;
        }

        var parsed = flock.parse.ugenDef(ugenDef, {
            audioSettings: that.audioSettings,
            buses: that.enviro.buses,
            buffers: that.enviro.buffers
        });

        var newUGens = flock.isIterable(parsed) ? parsed : (parsed !== undefined ? [parsed] : []),
            oldUGens = flock.isIterable(prev) ? prev : (prev !== undefined ? [prev] : []);

        var replaceLen = Math.min(newUGens.length, oldUGens.length),
            replaceFn = swap ? that.swapTree : that.replaceTree,
            i,
            atIdx,
            j;

        // TODO: Improve performance by handling arrays inline instead of repeated function calls.
        for (i = 0; i < replaceLen; i++) {
            atIdx = replaceFn(newUGens[i], oldUGens[i]);
        }

        for (j = i; j < newUGens.length; j++) {
            atIdx++;
            that.insertTree(atIdx, newUGens[j]);
        }

        for (j = i; j < oldUGens.length; j++) {
            that.removeTree(oldUGens[j]);
        }

        return parsed;
    };


    fluid.defaults("flock.synth.value", {
        gradeNames: ["flock.synth", "autoInit"],

        rate: "demand",

        addToEnvironment: false,

        invokers: {
            value: {
                funcName: "flock.synth.value.genValue",
                args: ["{that}.model", "{that}.gen"]
            }
        }
    });

    flock.synth.value.genValue = function (m, genFn) {
        genFn(1);
        return m.value;
    };


    fluid.defaults("flock.synth.frameRate", {
        gradeNames: ["flock.synth.value", "autoInit"],

        rate: "scheduled",

        fps: 60,

        audioSettings: {
            rates: {
                scheduled: "{that}.options.fps"
            }
        }
    });


    // TODO: At the moment, flock.synth.group attempts to act as a proxy for
    // a collection of synths, allowing users to address it as if it were
    // a single synth. However, it does nothing to ensure that its contained synths
    // are managed properly with the environment. There's currently no way to ensure that
    // when a group is removed from the environment, all its synths are too.
    // This should be completely refactored in favour of an approach using dynamic components.
    fluid.defaults("flock.synth.group", {
        gradeNames: ["flock.synth", "autoInit"],

        members: {
            out: null,
        },

        methodEventMap: {
            "onSet": "set",
            "onGen": "gen",
            "onPlay": "play",
            "onPause": "pause"
        },

        invokers: {
            play: "{that}.events.onPlay.fire",
            pause: "{that}.events.onPause.fire",
            set: "{that}.events.onSet.fire",
            get: "flock.synth.group.get({arguments}, {that}.nodes)",
            input: {
                funcName: "flock.synth.group.input",
                args: ["{arguments}", "{that}.get", "{that}.events.onSet.fire"]
            },
            gen: {
                funcName: "flock.synth.group.gen",
                args: "{that}"
            }
        },

        events: {
            onSet: null,
            onGen: null,
            onPlay: null,
            onPause: null
        },

        listeners: {
            onInsert: [
                {
                    funcName: "flock.synth.group.bindMethods",
                    args: [
                        "{arguments}.0", // The newly added node.
                        "{that}.options.methodEventMap",
                        "{that}.events",
                        "addListener"
                    ]
                },

                // Brute force and unreliable way of ensuring that
                // children of a group don't get directly added to the environment.
                {
                    funcName: "flock.synth.pause",
                    args: ["{arguments}.0", "{that}.enviro"]
                }
            ],

            onRemove: {
                funcName: "flock.synth.group.bindMethods",
                args: [
                    "{arguments}.0", // The removed node.
                    "{that}.options.methodEventMap",
                    "{that}.events",
                    "removeListener"
                ]
            }
        }
    });

    flock.synth.group.gen = function (that) {
        flock.nodeEvaluator.gen(that.nodes);
    };

    flock.synth.group.get = function (args, nodes) {
        var tailIdx = nodes.length - 1,
            tailNode = nodes[tailIdx];

        return tailNode.get.apply(tailNode, args);
    };

    flock.synth.group.input = function (args, onGet, onSet) {
        var evt = args.length > 1 ? onSet : onGet;
        return evt.apply(null, args);
    };

    flock.synth.group.bindMethods = function (node, methodEventMap, events, eventActionName) {
        for (var eventName in methodEventMap) {
            var methodName = methodEventMap[eventName],
                method = node[methodName],
                firer = events[eventName],
                eventAction = firer[eventActionName];

            eventAction(method);
        }
    };

    fluid.defaults("flock.synth.polyphonic", {
        gradeNames: ["flock.synth.group", "autoInit"],

        maxVoices: 16,
        amplitudeNormalizer: "static", // "dynamic", "static", Function, falsey
        amplitudeKey: "env.sustain",

        noteSpecs: {
            on: {
                "env.gate": 1
            },
            off: {
                "env.gate": 0
            }
        },

        components: {
            voiceAllocator: {
                type: "flock.synth.voiceAllocator.lazy",
                options: {
                    // TODO: Replace these with distributeOptions.
                    synthDef: "{polyphonic}.options.synthDef",
                    maxVoices: "{polyphonic}.options.maxVoices",
                    amplitudeNormalizer: "{polyphonic}.options.amplitudeNormalizer",
                    amplitudeKey: "{polyphonic}.options.amplitudeKey",

                    listeners: {
                        onCreateVoice: "{polyphonic}.tail({arguments}.0)"
                    }
                }
            }
        },

        invokers: {
            noteChange: {
                funcName: "flock.synth.polyphonic.noteChange",
                args: [
                    "{arguments}.0", // The voice synth to change.
                    "{arguments}.1", // The note event name (i.e. "on" or "off").
                    "{arguments}.2", // The note change spec to apply.
                    "{that}.options.noteSpecs"
                ]
            },

            noteOn: {
                funcName: "flock.synth.polyphonic.noteOn",
                args: [
                    "{arguments}.0", // Note name.
                    "{arguments}.1", // Optional changeSpec
                    "{voiceAllocator}",
                    "{that}.noteOff",
                    "{that}.noteChange"
                ]
            },

            noteOff: {
                funcName: "flock.synth.polyphonic.noteOff",
                args: [
                    "{arguments}.0", // Note name.
                    "{arguments}.1", // Optional changeSpec
                    "{voiceAllocator}",
                    "{that}.noteChange"
                ]
            },

            createVoice: {
                funcName: "flock.synth.polyphonic.createVoice",
                args: ["{that}.options", "{that}.insert"]
            }
        }
    });

    flock.synth.polyphonic.noteChange = function (voice, eventName, changeSpec, noteSpecs) {
        var noteEventSpec = noteSpecs[eventName];
        changeSpec = $.extend({}, noteEventSpec, changeSpec);
        voice.input(changeSpec);
    };

    flock.synth.polyphonic.noteOn = function (noteName, changeSpec, voiceAllocator, noteOff, noteChange) {
        var voice = voiceAllocator.getFreeVoice();
        if (voiceAllocator.activeVoices[noteName]) {
            noteOff(noteName);
        }
        voiceAllocator.activeVoices[noteName] = voice;
        noteChange(voice, "on", changeSpec);

        return voice;
    };

    flock.synth.polyphonic.noteOff = function (noteName, changeSpec, voiceAllocator, noteChange) {
        var voice = voiceAllocator.activeVoices[noteName];
        if (!voice) {
            return null;
        }
        noteChange(voice, "off", changeSpec);
        delete voiceAllocator.activeVoices[noteName];
        voiceAllocator.freeVoices.push(voice);

        return voice;
    };

    fluid.defaults("flock.synth.voiceAllocator", {
        gradeNames: ["fluid.standardComponent", "autoInit"],

        maxVoices: 16,
        amplitudeNormalizer: "static", // "dynamic", "static", Function, falsey
        amplitudeKey: "env.sustain",

        members: {
            activeVoices: {},
            freeVoices: []
        },

        invokers: {
            createVoice: {
                funcName: "flock.synth.voiceAllocator.createVoice",
                args: ["{that}.options", "{that}.events.onCreateVoice.fire"]
            }
        },

        events: {
            onCreateVoice: null
        }
    });


    flock.synth.voiceAllocator.createVoice = function (options, onCreateVoice) {
        var voice = flock.synth({
            synthDef: options.synthDef,
            addToEnvironment: false
        });

        var normalizer = options.amplitudeNormalizer,
            ampKey = options.amplitudeKey,
            normValue;

        if (normalizer) {
            if (typeof normalizer === "function") {
                normalizer(voice, ampKey);
            } else if (normalizer === "static") {
                normValue = 1.0 / options.maxVoices;
                voice.input(ampKey, normValue);
            }
            // TODO: Implement dynamic voice normalization.
        }

        onCreateVoice(voice);

        return voice;
    };

    fluid.defaults("flock.synth.voiceAllocator.lazy", {
        gradeNames: ["flock.synth.voiceAllocator", "autoInit"],

        invokers: {
            getFreeVoice: {
                funcName: "flock.synth.voiceAllocator.lazy.get",
                args: [
                    "{that}.freeVoices",
                    "{that}.activeVoices",
                    "{that}.createVoice",
                    "{that}.options.maxVoices"
                ]
            }
        }
    });

    flock.synth.voiceAllocator.lazy.get = function (freeVoices, activeVoices, createVoiceFn, maxVoices) {
        return freeVoices.length > 1 ?
            freeVoices.pop() : Object.keys(activeVoices).length > maxVoices ?
            null : createVoiceFn();
    };

    fluid.defaults("flock.synth.voiceAllocator.pool", {
        gradeNames: ["flock.synth.voiceAllocator", "autoInit"],

        invokers: {
            getFreeVoice: "flock.synth.voiceAllocator.pool.get({that}.freeVoices)"
        }
    });

    flock.synth.voiceAllocator.pool.get = function (freeVoices) {
        if (freeVoices.length > 0) {
            return freeVoices.pop();
        }
    };

    flock.synth.voiceAllocator.pool.allocateVoices = function (freeVoices, createVoiceFn, maxVoices) {
        for (var i = 0; i < maxVoices; i++) {
            freeVoices[i] = createVoiceFn();
        }

    };


    /**
     * flock.band provides an IoC-friendly interface for a collection of named synths.
     */
    // TODO: Unit tests.
    fluid.defaults("flock.band", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        invokers: {
            play: {
                func: "{that}.events.onPlay.fire"
            },

            pause: {
                func: "{that}.events.onPause.fire"
            },

            set: {
                func: "{that}.events.onSet.fire"
            }
        },

        events: {
            onPlay: null,
            onPause: null,
            onSet: null
        },

        distributeOptions: [
            {
                source: "{that}.options.childListeners",
                removeSource: true,
                target: "{that fluid.eventedComponent}.options.listeners"
            },
            {
                source: "{that}.options.synthListeners",
                removeSource: true,
                target: "{that flock.synth}.options.listeners"
            }
        ],

        childListeners: {
            "{band}.events.onDestroy": {
                func: "{that}.destroy"
            }
        },

        synthListeners: {
            "{band}.events.onPlay": {
                func: "{that}.play"
            },

            "{band}.events.onPause": {
                func: "{that}.pause"
            },

            "{band}.events.onSet": {
                func: "{that}.set"
            }
        }
    });

    /*******************************
     * Error Handling Conveniences *
     *******************************/

    flock.bufferDesc = function () {
        throw new Error("flock.bufferDesc is not defined. Did you forget to include the flocking-buffers.js file?");
    };
}());
;/*
* Flocking Audio Buffers
* http://github.com/colinbdclark/flocking
*
* Copyright 2013-14, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, AudioBuffer*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    // Based on Brian Cavalier and John Hann's Tiny Promises library.
    // https://github.com/unscriptable/promises/blob/master/src/Tiny2.js
    function Promise() {
        var resolve = function (result) {
            complete("resolve", result);
            promise.state = "fulfilled";
        };

        var reject = function (err) {
            complete("reject", err);
            promise.state = "rejected";
        };

        var then = function (resolve, reject) {
            if (callbacks) {
                callbacks.push({
                    resolve: resolve,
                    reject: reject
                });
            } else {
                var fn = promise.state === "fulfilled" ? resolve : reject;
                fn(promise.value);
            }

            return this;
        };

        var callbacks = [],
            promise = {
                state: "pending",
                value: undefined,
                resolve: resolve,
                reject: reject,
                then: then,
                safe: {
                    then: function safeThen(resolve, reject) {
                        promise.then(resolve, reject);
                        return this;
                    }
                }
            };


        function complete(type, result) {
            var rejector = function (resolve, reject) {
                reject(result);
                return this;
            };

            var resolver = function (resolve) {
                resolve(result);
                return this;
            };

            promise.value = result;
            promise.then = type === "reject" ? rejector : resolver;
            promise.resolve = promise.reject = function () {
                throw new Error("Promise already completed");
            };

            invokeCallbacks(type, result);
        }

        function invokeCallbacks (type, result) {
            var i,
                cb;

            for (i = 0; i < callbacks.length; i++) {
                cb = callbacks[i];

                if (cb[type]) {
                    cb[type](result);
                }
            }

            callbacks = null;
        }

        return promise;
    }

    fluid.defaults("flock.promise", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        members: {
            promise: {
                expander: {
                    funcName: "flock.promise.make"
                }
            }
        }
    });

    flock.promise.make = function () {
        return new Promise();
    };

    // TODO: This is actually part of the interpreter's expansion process
    // and should be clearly named as such.
    flock.bufferDesc = function (data, sampleRate, numChannels) {
        var fn = flock.platform.isWebAudio && data instanceof AudioBuffer ?
            flock.bufferDesc.fromAudioBuffer : flock.isIterable(data) ?
            flock.bufferDesc.fromChannelArray : flock.bufferDesc.expand;

        return fn(data, sampleRate, numChannels);
    };

    flock.bufferDesc.inferFormat = function (bufDesc, sampleRate, numChannels) {
        var format = bufDesc.format,
            data = bufDesc.data;

        format.sampleRate = sampleRate || format.sampleRate || 44100;
        format.numChannels = numChannels || format.numChannels || bufDesc.data.channels.length;
        format.numSampleFrames = format.numSampleFrames ||
            data.channels.length > 0 ? data.channels[0].length : 0;
        format.duration = format.numSampleFrames / format.sampleRate;

        return bufDesc;
    };

    flock.bufferDesc.fromChannelArray = function (arr, sampleRate, numChannels) {
        if (arr instanceof Float32Array) {
            arr = [arr];
        }

        var bufDesc = {
            container: {},

            format: {
                numChannels: numChannels,
                sampleRate: sampleRate,
                numSampleFrames: arr[0].length
            },

            data: {
                channels: arr
            }
        };

        return flock.bufferDesc.inferFormat(bufDesc, sampleRate, numChannels);
    };

    flock.bufferDesc.expand = function (bufDesc, sampleRate, numChannels) {
        bufDesc = bufDesc || {
            data: {
                channels: []
            }
        };

        bufDesc.container = bufDesc.container || {};
        bufDesc.format = bufDesc.format || {};
        bufDesc.format.numChannels = numChannels ||
            bufDesc.format.numChannels || bufDesc.data.channels.length; // TODO: Duplication with inferFormat.

        if (bufDesc.data && bufDesc.data.channels) {
            // Special case for an unwrapped single-channel array.
            if (bufDesc.format.numChannels === 1 && bufDesc.data.channels.length !== 1) {
                bufDesc.data.channels = [bufDesc.data.channels];
            }

            if (bufDesc.format.numChannels !== bufDesc.data.channels.length) {
                throw new Error("The specified number of channels does not match " +
                    "the actual channel data. " +
                    "numChannels was: " + bufDesc.format.numChannels +
                    " but the sample data contains " + bufDesc.data.channels.length + " channels.");
            }
        }

        return flock.bufferDesc.inferFormat(bufDesc, sampleRate, numChannels);
    };

    flock.bufferDesc.fromAudioBuffer = function (audioBuffer) {
        var desc = {
            container: {},
            format: {
                sampleRate: audioBuffer.sampleRate,
                numChannels: audioBuffer.numberOfChannels,
                numSampleFrames: audioBuffer.length,
                duration: audioBuffer.duration
            },
            data: {
                channels: []
            }
        },
        i;

        for (i = 0; i < audioBuffer.numberOfChannels; i++) {
            desc.data.channels.push(audioBuffer.getChannelData(i));
        }

        return desc;
    };


    /**
     * Represents a source for fetching buffers.
     */
    fluid.defaults("flock.bufferSource", {
        gradeNames: ["fluid.standardComponent", "autoInit"],

        model: {
            state: "start",
            src: null
        },

        components: {
            bufferPromise: {
                createOnEvent: "onRefreshPromise",
                type: "flock.promise",
                options: {
                    listeners: {
                        onCreate: {
                            "this": "{that}.promise",
                            method: "then",
                            args: ["{bufferSource}.events.afterFetch.fire", "{bufferSource}.events.onError.fire"]
                        }
                    }
                }
            }
        },

        invokers: {
            get: {
                funcName: "flock.bufferSource.get",
                args: ["{that}", "{arguments}.0"]
            },

            set: {
                funcName: "flock.bufferSource.set",
                args: ["{that}", "{arguments}.0"]
            },

            error: {
                funcName: "flock.bufferSource.error",
                args: ["{that}", "{arguments}.0"]
            }
        },

        listeners: {
            onCreate: {
                funcName: "{that}.events.onRefreshPromise.fire"
            },

            onRefreshPromise: {
                funcName: "{that}.applier.requestChange",
                args: ["state", "start"]
            },

            onFetch: {
                funcName: "{that}.applier.requestChange",
                args: ["state", "in-progress"]
            },

            afterFetch: [
                {
                    funcName: "{that}.applier.requestChange",
                    args: ["state", "fetched"]
                },
                {
                    funcName: "{that}.events.onBufferUpdated.fire", // TODO: Replace with boiling?
                    args: ["{arguments}.0"]
                }
            ],

            onBufferUpdated: "{environment}.registerBuffer({arguments}.0)",

            onError: {
                funcName: "{that}.applier.requestChange",
                args: ["state", "error"]
            }
        },

        events: {
            onRefreshPromise: null,
            onError: null,
            onFetch: null,
            afterFetch: null,
            onBufferUpdated: null
        }
    });

    flock.bufferSource.get = function (that, bufDef) {
        if (that.model.state === "in-progress" || (bufDef.src === that.model.src && !bufDef.replace)) {
            // We've already fetched the buffer or are in the process of doing so.
            return that.bufferPromise.promise;
        }

        if (bufDef.src) {
            if ((that.model.state === "fetched" || that.model.state === "errored") &&
                (that.model.src !== bufDef.src || bufDef.replace)) {
                that.events.onRefreshPromise.fire();
            }

            if (that.model.state === "start") {
                that.model.src = bufDef.src;
                that.events.onFetch.fire(bufDef);
                flock.audio.decode({
                    src: bufDef.src,
                    success: function (bufDesc) {
                        if (bufDef.id) {
                            bufDesc.id = bufDef.id;
                        }

                        that.set(bufDesc);
                    },
                    error: that.error
                });
            }
        }

        return that.bufferPromise.promise;
    };

    flock.bufferSource.set = function (that, bufDesc) {
        var state = that.model.state;
        if (state === "start" || state === "in-progress") {
            that.bufferPromise.promise.resolve(bufDesc);
        }

        return that.bufferPromise.promise;
    };

    flock.bufferSource.error = function (that, msg) {
        that.bufferPromise.promise.reject(msg);

        return that.bufferPromise.promise;
    };

    /**
     * A Buffer Loader is responsible for loading a collection
     * of buffers asynchronously, and will fire an event when they
     * are all ready.
     */
    fluid.defaults("flock.bufferLoader", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        members: {
            buffers: []
        },

        // A list of BufferDef objects to resolve.
        bufferDefs: [],

        events: {
            afterBuffersLoaded: null
        },

        listeners: {
            onCreate: {
                funcName: "flock.bufferLoader.loadBuffers",
                args: ["{that}.options.bufferDefs", "{that}.buffers", "{that}.events.afterBuffersLoaded.fire"]
            }
        }
    });

    flock.bufferLoader.idFromURL = function (url) {
        var lastSlash = url.lastIndexOf("/"),
            idStart = lastSlash > -1 ? lastSlash + 1 : 0,
            ext = url.lastIndexOf("."),
            idEnd = ext > -1 ? ext : url.length;

        return url.substring(idStart, idEnd);
    };

    flock.bufferLoader.idsFromURLs = function (urls) {
        return fluid.transform(urls, flock.bufferLoader.idFromURL);
    };

    flock.bufferLoader.expandFileSequence = function (fileURLs) {
        fileURLs = fileURLs || [];

        var bufDefs = [],
            i,
            url,
            id;

        for (i = 0; i < fileURLs.length; i++) {
            url = fileURLs[i];
            id = flock.bufferLoader.idFromURL(url);
            bufDefs.push({
                id: id,
                url: url
            });
        }

        return bufDefs;
    };

    flock.bufferLoader.loadBuffers = function (bufferDefs, decodedBuffers, afterBuffersLoaded) {
        bufferDefs = fluid.makeArray(bufferDefs);

        // TODO: This is a sign that flock.parse.bufferForDef is still terribly broken.
        var bufferTarget = {
            setBuffer: function (decoded) {
                decodedBuffers.push(decoded);

                if (decodedBuffers.length === bufferDefs.length) {
                    afterBuffersLoaded(decodedBuffers);
                }
            }
        };

        for (var i = 0; i < bufferDefs.length; i++) {
            var bufDef = bufferDefs[i];
            if (bufDef.id === undefined && bufDef.url !== undefined) {
                bufDef.id = flock.bufferLoader.idFromURL(bufDef.url);
            }

            // TODO: Hardcoded reference to the shared environment.
            flock.parse.bufferForDef(bufferDefs[i], bufferTarget, flock.environment);
        }
    };

}());
;/*
* Flocking Parser
* http://github.com/colinbdclark/flocking
*
* Copyright 2011-2014, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, Float32Array*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    var $ = fluid.registerNamespace("jQuery");
    fluid.registerNamespace("flock.parse");

    flock.parse.synthDef = function (ugenDef, options) {
        if (!ugenDef) {
            ugenDef = [];
        }

        if (!flock.parse.synthDef.hasOutUGen(ugenDef)) {
            // We didn't get an out ugen specified, so we need to make one.
            ugenDef = flock.parse.synthDef.makeOutUGen(ugenDef, options);
        }

        return flock.parse.ugenForDef(ugenDef, options);
    };

    flock.parse.synthDef.hasOutUGen = function (synthDef) {
        // TODO: This is hostile to third-party extension.
        return !flock.isIterable(synthDef) && (
            synthDef.id === flock.OUT_UGEN_ID ||
            synthDef.ugen === "flock.ugen.out" ||
            synthDef.ugen === "flock.ugen.valueOut"
        );
    };

    flock.parse.synthDef.makeOutUGen = function (ugenDef, options) {
        ugenDef = {
            id: flock.OUT_UGEN_ID,
            ugen: "flock.ugen.valueOut",
            inputs: {
                sources: ugenDef
            }
        };

        if (options.rate === flock.rates.AUDIO) {
            ugenDef.ugen = "flock.ugen.out";
            ugenDef.inputs.bus = 0;
            ugenDef.inputs.expand = options.audioSettings.chans;
        }

        return ugenDef;
    };

    flock.parse.makeUGen = function (ugenDef, parsedInputs, options) {
        var rates = options.audioSettings.rates,
            blockSize = options.audioSettings.blockSize;

        // Assume audio rate if no rate was specified by the user.
        if (!ugenDef.rate) {
            ugenDef.rate = flock.rates.AUDIO;
        }

        var sampleRate;
        // Set the ugen's sample rate value according to the rate the user specified.
        if (ugenDef.options && ugenDef.options.sampleRate !== undefined) {
            sampleRate = ugenDef.options.sampleRate;
        } else {
            sampleRate = rates[ugenDef.rate];
        }

        // TODO: Infusion options merging!
        ugenDef.options = $.extend(true, {}, ugenDef.options, {
            sampleRate: sampleRate,
            rate: ugenDef.rate,
            audioSettings: {
                rates: rates,
                blockSize: blockSize
            }
        });
        // TODO: When we switch to Infusion options merging, these should have a mergePolicy of preserve.
        ugenDef.options.buffers = options.buffers;
        ugenDef.options.buses = options.buses;

        var outputBufferSize = ugenDef.rate === flock.rates.AUDIO ? blockSize : 1,
            outputBuffers;

        if (flock.hasTag(ugenDef.options, "flock.ugen.multiChannelOutput")) {
            var numOutputs = ugenDef.options.numOutputs || 1;
            outputBuffers = [];

            for (var i = 0; i < numOutputs; i++) {
                outputBuffers.push(new Float32Array(outputBufferSize));
            }
        } else {
            outputBuffers = new Float32Array(outputBufferSize);
        }

        return flock.invoke(undefined, ugenDef.ugen, [
            parsedInputs,
            outputBuffers,
            ugenDef.options
        ]);
    };


    flock.parse.reservedWords = ["id", "ugen", "rate", "inputs", "options"];
    flock.parse.specialInputs = ["value", "buffer", "list", "table", "envelope", "durations", "values"];

    flock.parse.expandInputs = function (ugenDef) {
        if (ugenDef.inputs) {
            return ugenDef;
        }

        var inputs = {},
            prop;

        // Copy any non-reserved properties from the top-level ugenDef object into the inputs property.
        for (prop in ugenDef) {
            if (flock.parse.reservedWords.indexOf(prop) === -1) {
                inputs[prop] = ugenDef[prop];
                delete ugenDef[prop];
            }
        }
        ugenDef.inputs = inputs;

        return ugenDef;
    };

    flock.parse.ugenDefForConstantValue = function (value) {
        return {
            ugen: "flock.ugen.value",
            rate: flock.rates.CONSTANT,
            inputs: {
                value: value
            }
        };
    };

    flock.parse.expandValueDef = function (ugenDef) {
        var type = typeof (ugenDef);
        if (type === "number") {
            return flock.parse.ugenDefForConstantValue(ugenDef);
        }

        if (type === "object") {
            return ugenDef;
        }

        throw new Error("Invalid value type found in ugen definition. UGenDef was: " +
            fluid.prettyPrintJSON(ugenDef));
    };

    flock.parse.rateMap = {
        "ar": flock.rates.AUDIO,
        "kr": flock.rates.CONTROL,
        "sr": flock.rates.SCHEDULED,
        "dr": flock.rates.DEMAND,
        "cr": flock.rates.CONSTANT
    };

    flock.parse.expandRate = function (ugenDef, options) {
        ugenDef.rate = flock.parse.rateMap[ugenDef.rate] || ugenDef.rate;
        if (options.overrideRate && ugenDef.rate !== flock.rates.CONSTANT) {
            ugenDef.rate = options.rate;
        }

        return ugenDef;
    };

    flock.parse.ugenDef = function (ugenDefs, options) {
        var parseFn = flock.isIterable(ugenDefs) ? flock.parse.ugensForDefs : flock.parse.ugenForDef;
        var parsed = parseFn(ugenDefs, options);
        return parsed;
    };

    flock.parse.ugenDef.mergeOptions = function (ugenDef) {
        // TODO: Infusion options merging.
        var defaults = fluid.defaults(ugenDef.ugen) || {};

        // TODO: Insane!
        defaults = fluid.copy(defaults);
        defaults.options = defaults.ugenOptions;
        delete defaults.ugenOptions;
        //

        return $.extend(true, {}, defaults, ugenDef);
    };

    flock.parse.ugensForDefs = function (ugenDefs, options) {
        var parsed = [],
            i;
        for (i = 0; i < ugenDefs.length; i++) {
            parsed[i] = flock.parse.ugenForDef(ugenDefs[i], options);
        }
        return parsed;
    };

    /**
     * Creates a unit generator for the specified unit generator definition spec.
     *
     * ugenDefs are plain old JSON objects describing the characteristics of the desired unit generator, including:
     *      - ugen: the type of unit generator, as string (e.g. "flock.ugen.sinOsc")
     *      - rate: the rate at which the ugen should be run, either "audio", "control", or "constant"
     *      - id: an optional unique name for the unit generator, which will make it available as a synth input
     *      - inputs: a JSON object containing named key/value pairs for inputs to the unit generator
     *           OR
     *      - inputs keyed by name at the top level of the ugenDef
     *
     * @param {UGenDef} ugenDef the unit generator definition to parse
     * @param {Object} options an options object containing:
     *           {Object} audioSettings the environment's audio settings
     *           {Array} buses the environment's global buses
     *           {Array} buffers the environment's global buffers
     *           {Array of Functions} visitors an optional list of visitor functions to invoke when the ugen has been created
     * @return the parsed unit generator object
     */
    flock.parse.ugenForDef = function (ugenDef, options) {
        options = $.extend(true, {
            audioSettings: flock.environment.audioSystem.model,
            buses: flock.environment.busManager.buses,
            buffers: flock.environment.buffers
        }, options);

        var o = options,
            visitors = o.visitors,
            rates = o.audioSettings.rates;

        // If we receive a plain scalar value, expand it into a value ugenDef.
        ugenDef = flock.parse.expandValueDef(ugenDef);

        // We received an array of ugen defs.
        if (flock.isIterable(ugenDef)) {
            return flock.parse.ugensForDefs(ugenDef, options);
        }

        ugenDef = flock.parse.expandInputs(ugenDef);

        flock.parse.expandRate(ugenDef, options);
        ugenDef = flock.parse.ugenDef.mergeOptions(ugenDef, options);

        var inputDefs = ugenDef.inputs,
            inputs = {},
            inputDef;

        // TODO: This notion of "special inputs" should be refactored as a pluggable system of
        // "input expanders" that are responsible for processing input definitions of various sorts.
        // In particular, buffer management should be here so that we can initialize bufferDefs more
        // proactively and remove this behaviour from flock.ugen.buffer.
        for (inputDef in inputDefs) {
            var inputDefVal = inputDefs[inputDef];

            if (inputDefVal === null) {
                continue; // Skip null inputs.
            }

            // Create ugens for all inputs except special inputs.
            inputs[inputDef] = flock.input.shouldExpand(inputDef, ugenDef) ?
                flock.parse.ugenForDef(inputDefVal, options) : // Parse the ugendef and create a ugen instance.
                inputDefVal; // Don't instantiate a ugen, just pass the def on as-is.
        }

        if (!ugenDef.ugen) {
            throw new Error("Unit generator definition lacks a 'ugen' property; " +
                "can't initialize the synth graph. Value: " + fluid.prettyPrintJSON(ugenDef));
        }

        var ugen = flock.parse.makeUGen(ugenDef, inputs, options);
        if (ugenDef.id) {
            ugen.id = ugenDef.id;
            ugen.nickName = ugenDef.id; // TODO: Normalize nicknames and ids.
        }

        ugen.options.ugenDef = ugenDef;

        if (visitors) {
            visitors = fluid.makeArray(visitors);
            fluid.each(visitors, function (visitor) {
                visitor(ugen, ugenDef, rates);
            });
        }

        return ugen;
    };

    flock.parse.expandBufferDef = function (bufDef) {
        return typeof bufDef === "string" ? {id: bufDef} :
            (flock.isIterable(bufDef) || bufDef.data || bufDef.format) ?
            flock.bufferDesc(bufDef) : bufDef;
    };

    flock.parse.bufferForDef = function (bufDef, ugen, enviro) {
        bufDef = flock.parse.expandBufferDef(bufDef);

        if (bufDef.data && bufDef.data.channels) {
            bufDef = flock.bufferDesc(bufDef);
            flock.parse.bufferForDef.resolveBuffer(bufDef, ugen, enviro);
        } else {
            flock.parse.bufferForDef.resolveDef(bufDef, ugen, enviro);
        }
    };

    flock.parse.bufferForDef.findSource = function (defOrDesc, enviro) {
        var source;

        if (enviro && defOrDesc.id) {
            source = enviro.bufferSources[defOrDesc.id];
            if (!source) {
                source = enviro.bufferSources[defOrDesc.id] = flock.bufferSource();
            }
        } else {
            source = flock.bufferSource();
        }

        return source;
    };

    flock.parse.bufferForDef.bindToPromise = function (p, source, ugen) {
        // TODO: refactor this.
        var success = function (bufDesc) {
            source.events.onBufferUpdated.addListener(success);
            if (ugen) {
                ugen.setBuffer(bufDesc);
            }
        };

        var error = function (msg) {
            if (!msg && source.model.src && source.model.src.indexOf(".aif")) {
                msg = "if this is an AIFF file, you might need to include" +
                " flocking-audiofile-compatibility.js in some browsers.";
            }
            throw new Error("Error while resolving buffer " + source.model.src + ": " + msg);
        };

        p.then(success, error);
    };

    flock.parse.bufferForDef.resolveDef = function (bufDef, ugen, enviro) {
        var source = flock.parse.bufferForDef.findSource(bufDef, enviro),
            p;

        bufDef.src = bufDef.url || bufDef.src;
        if (bufDef.selector && typeof(document) !== "undefined") {
            bufDef.src = document.querySelector(bufDef.selector).files[0];
        }

        p = source.get(bufDef);
        flock.parse.bufferForDef.bindToPromise(p, source, ugen);
    };


    flock.parse.bufferForDef.resolveBuffer = function (bufDesc, ugen, enviro) {
        var source = flock.parse.bufferForDef.findSource(bufDesc, enviro),
            p = source.set(bufDesc);

        flock.parse.bufferForDef.bindToPromise(p, source, ugen);
    };

}());
;/*
 * Flocking Audio File Utilities
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2011-2014, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, ArrayBuffer, Uint8Array, File, FileReader */
/*jshint white: false, newcap: true, regexp: true, browser: true,
forin: false, nomen: true, bitwise: false, maxerr: 100,
indent: 4, plusplus: false, curly: true, eqeqeq: true,
freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {

    "use strict";

    /**
     * Applies the specified function in the next round of the event loop.
     */
    // TODO: Replace this and the code that depends on it with a good Promise implementation.
    flock.applyDeferred = function (fn, args, delay) {
        if (!fn) {
            return;
        }

        delay = typeof (delay) === "undefined" ? 0 : delay;
        setTimeout(function () {
            fn.apply(null, args);
        }, delay);
    };


    /*********************
     * Network utilities *
     *********************/

    fluid.registerNamespace("flock.net");

    /**
     * Loads an ArrayBuffer into memory using XMLHttpRequest.
     */
    flock.net.readBufferFromUrl = function (options) {
        var src = options.src,
            xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    options.success(xhr.response, flock.file.parseFileExtension(src));
                } else {
                    if (!options.error) {
                        throw new Error(xhr.statusText);
                    }

                    options.error(xhr.statusText);
                }
            }
        };

        xhr.open(options.method || "GET", src, true);
        xhr.responseType = options.responseType || "arraybuffer";
        xhr.send(options.data);
    };


    /*****************
     * File Utilties *
     *****************/

    fluid.registerNamespace("flock.file");

    flock.file.mimeTypes = {
        "audio/wav": "wav",
        "audio/x-wav": "wav",
        "audio/wave": "wav",
        "audio/x-aiff": "aiff",
        "audio/aiff": "aiff",
        "sound/aiff": "aiff"
    };

    flock.file.typeAliases = {
        "aif": "aiff",
        "wave": "wav"
    };

    flock.file.parseFileExtension = function (fileName) {
        var lastDot = fileName.lastIndexOf("."),
            ext,
            alias;

        // TODO: Better error handling in cases where we've got unrecognized file extensions.
        //       i.e. we should try to read the header instead of relying on extensions.
        if (lastDot < 0) {
            return undefined;
        }

        ext = fileName.substring(lastDot + 1);
        ext = ext.toLowerCase();
        alias =  flock.file.typeAliases[ext];

        return alias || ext;
    };

    flock.file.parseMIMEType = function (mimeType) {
        return flock.file.mimeTypes[mimeType];
    };

    /**
     * Converts a binary string to an ArrayBuffer, suitable for use with a DataView.
     *
     * @param {String} s the raw string to convert to an ArrayBuffer
     *
     * @return {Uint8Array} the converted buffer
     */
    flock.file.stringToBuffer = function (s) {
        var len = s.length,
            b = new ArrayBuffer(len),
            v = new Uint8Array(b),
            i;
        for (i = 0; i < len; i++) {
            v[i] = s.charCodeAt(i);
        }
        return v.buffer;
    };

    /**
     * Asynchronously parses the specified data URL into an ArrayBuffer.
     */
    flock.file.readBufferFromDataUrl = function (options) {
        var url = options.src,
            delim = url.indexOf(","),
            header = url.substring(0, delim),
            data = url.substring(delim + 1),
            base64Idx = header.indexOf(";base64"),
            isBase64 =  base64Idx > -1,
            mimeTypeStartIdx = url.indexOf("data:") + 5,
            mimeTypeEndIdx = isBase64 ? base64Idx : delim,
            mimeType = url.substring(mimeTypeStartIdx, mimeTypeEndIdx);

        if (isBase64) {
            data = atob(data);
        }

        flock.applyDeferred(function () {
            var buffer = flock.file.stringToBuffer(data);
            options.success(buffer, flock.file.parseMIMEType(mimeType));
        });
    };

    /**
     * Asynchronously reads the specified File into an ArrayBuffer.
     */
    flock.file.readBufferFromFile = function (options) {
        var reader  = new FileReader();
        reader.onload = function (e) {
            options.success(e.target.result, flock.file.parseFileExtension(options.src.name));
        };
        reader.readAsArrayBuffer(options.src);

        return reader;
    };


    fluid.registerNamespace("flock.audio");

    /**
     * Asychronously loads an ArrayBuffer into memory.
     *
     * Options:
     *  - src: the URL to load the array buffer from
     *  - method: the HTTP method to use (if applicable)
     *  - data: the data to be sent as part of the request (it's your job to query string-ize this if it's an HTTP request)
     *  - success: the success callback, which takes the ArrayBuffer response as its only argument
     *  - error: a callback that will be invoked if an error occurs, which takes the error message as its only argument
     */
    flock.audio.loadBuffer = function (options) {
        var src = options.src || options.url;
        if (!src) {
            return;
        }

        if (src instanceof ArrayBuffer) {
            flock.applyDeferred(options.success, [src, options.type]);
        }

        var reader = flock.audio.loadBuffer.readerForSource(src);

        reader(options);
    };

    flock.audio.loadBuffer.readerForSource = function (src) {
        return (typeof (File) !== "undefined" && src instanceof File) ? flock.file.readBufferFromFile :
            src.indexOf("data:") === 0 ? flock.file.readBufferFromDataUrl : flock.net.readBufferFromUrl;
    };


    /**
     * Loads and decodes an audio file. By default, this is done asynchronously in a Web Worker.
     * This decoder currently supports WAVE and AIFF file formats.
     */
    flock.audio.decode = function (options) {
        var success = options.success;

        var wrappedSuccess = function (rawData, type) {
            var strategies = flock.audio.decoderStrategies,
                strategy = strategies[type] || strategies["default"];

            if (options.decoder) {
                strategy = typeof (options.decoder) === "string" ?
                     fluid.getGlobalValue(options.decoder) : options.decoder;
            }

            strategy({
                rawData: rawData,
                type: type,
                success: success,
                error: options.error,
                sampleRate: options.sampleRate ||
                    (flock.environment ? flock.environment.audioSystem.model.rates.audio : undefined)
            });
        };

        options.success = wrappedSuccess;
        flock.audio.loadBuffer(options);
    };

    /**
     * Asynchronously decodes the specified ArrayBuffer rawData using
     * the browser's Web Audio Context.
     */
    flock.audio.decode.webAudio = function (o) {
        var ctx = flock.environment.audioSystem.context,
            success = function (audioBuffer) {
                var bufDesc = flock.bufferDesc.fromAudioBuffer(audioBuffer);
                o.success(bufDesc);
            };

        ctx.decodeAudioData(o.rawData, success, o.error);
    };

    flock.audio.decoderStrategies = {
        "default": flock.audio.decode.webAudio
    };

    flock.audio.registerDecoderStrategy = function (type, strategy) {
        if (!type) {
            return;
        }

        if (typeof type === "object") {
            for (var key in type) {
                flock.audio.decoderStrategies[key] = type[key];
            }

            return;
        }

        if (typeof strategy === "string") {
            strategy = fluid.getGlobalValue(strategy);
        }

        flock.audio.decoderStrategies[type] = strategy;
    };
}());
;/*
 * Flocking Audio Encoders
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2015, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, ArrayBuffer, Uint8Array */
/*jshint white: false, newcap: true, regexp: true, browser: true,
forin: false, nomen: true, bitwise: false, maxerr: 100,
indent: 4, plusplus: false, curly: true, eqeqeq: true,
freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {

    "use strict";

    fluid.registerNamespace("flock.audio.encode");

    flock.audio.interleave = function (bufDesc) {
        var numFrames = bufDesc.format.numSampleFrames,
            chans = bufDesc.data.channels,
            numChans = bufDesc.format.numChannels,
            numSamps = numFrames * numChans,
            out = new Float32Array(numSamps),
            outIdx = 0,
            frame,
            chan;

        for (frame = 0; frame < numFrames; frame++) {
            for (chan = 0; chan < numChans; chan++) {
                out[outIdx] = chans[chan][frame];
                outIdx++;
            }
        }

        return out;
    };

    flock.audio.encode = function (bufDesc, type, format) {
        type = type || "wav";
        if (type.toLowerCase() !== "wav") {
            flock.fail("Flocking currently only supports encoding WAVE files.");
        }

        return flock.audio.encode.wav(bufDesc, format);
    };

    flock.audio.encode.writeFloat32Array = function (offset, dv, buf) {
        for (var i = 0; i < buf.length; i++) {
            dv.setFloat32(offset, buf[i], true);
            offset += 4;
        }

        return dv;
    };

    flock.audio.encode.setString = function (dv, offset, str){
        for (var i = 0; i < str.length; i++){
            dv.setUint8(offset + i, str.charCodeAt(i));
        }
    };

    flock.audio.encode.setBytes = function (dv, offset, bytes) {
        for (var i = 0; i < bytes.length; i++) {
            dv.setUint8(offset + i, bytes[i]);
        }
    };


    flock.audio.encode.writeAsPCM = function (formatSpec, offset, dv, buf) {
        if (formatSpec.setter === "setFloat32" && buf instanceof Float32Array) {
            return flock.audio.encode.writeFloat32Array(offset, dv, buf);
        }

        for (var i = 0; i < buf.length; i++) {
            // Clamp to within bounds.
            var s = Math.min(1.0, buf[i]);
            s = Math.max(-1.0, s);

            // Scale to the otuput number format.
            s = s < 0 ? s * formatSpec.scaleNeg : s * formatSpec.scalePos;

            // Write the sample to the DataView.
            dv[formatSpec.setter](offset, s, true);
            offset += formatSpec.width;
        }

        return dv;
    };

    flock.audio.pcm = {
        int16: {
            scalePos: 32767,
            scaleNeg: 32768,
            setter: "setInt16",
            width: 2
        },

        int32: {
            scalePos: 2147483647,
            scaleNeg: 2147483648,
            setter: "setInt32",
            width: 4
        },

        float32: {
            scalePos: 1,
            scaleNeg: 1,
            setter: "setFloat32",
            width: 4
        }
    };

    flock.audio.encode.wav = function (bufDesc, format) {
        format = format || flock.audio.pcm.int16;

        var formatSpec = typeof format === "string" ? flock.audio.pcm[format] : format;
        if (!formatSpec) {
            flock.fail("Flocking does not support encoding " + format + " format PCM wave files.");
        }

        var interleaved = flock.audio.interleave(bufDesc),
            numChans = bufDesc.format.numChannels,
            sampleRate = bufDesc.format.sampleRate,
            isPCM = formatSpec.setter !== "setFloat32",
            riffHeaderSize = 8,
            formatHeaderSize = 12,
            formatBodySize = 16,
            formatTag = 1,
            dataHeaderSize = 8,
            dataBodySize = interleaved.length * formatSpec.width,
            dataChunkSize = dataHeaderSize + dataBodySize,
            bitsPerSample = 8 * formatSpec.width;

        if (numChans > 2 || !isPCM) {
            var factHeaderSize = 8,
                factBodySize = 4,
                factChunkSize = factHeaderSize + factBodySize;

            formatBodySize += factChunkSize;

            if (numChans > 2) {
                formatBodySize += 24;
                formatTag = 0xFFFE; // Extensible.
            } else {
                formatBodySize += 2;
                formatTag = 3; // Two-channel IEEE float.
            }
        }

        var formatChunkSize = formatHeaderSize + formatBodySize,
            riffBodySize = formatChunkSize + dataChunkSize,
            numBytes = riffHeaderSize + riffBodySize,
            out = new ArrayBuffer(numBytes),
            dv = new DataView(out);

        // RIFF chunk header.
        flock.audio.encode.setString(dv, 0, "RIFF"); // ckID
        dv.setUint32(4, riffBodySize, true); // cksize

        // Format Header
        flock.audio.encode.setString(dv, 8, "WAVE"); // WAVEID
        flock.audio.encode.setString(dv, 12, "fmt "); // ckID
        dv.setUint32(16, formatBodySize, true); // cksize, length of the format chunk.

        // Format Body
        dv.setUint16(20, formatTag, true); // wFormatTag
        dv.setUint16(22, numChans, true); // nChannels
        dv.setUint32(24, sampleRate, true); // nSamplesPerSec
        dv.setUint32(28, sampleRate * 4, true); // nAvgBytesPerSec (sample rate * block align)
        dv.setUint16(32, numChans * formatSpec.width, true); //nBlockAlign (channel count * bytes per sample)
        dv.setUint16(34, bitsPerSample, true); // wBitsPerSample

        var offset = 36;
        if (formatTag === 3) {
            // IEEE Float. Write out a fact chunk.
            dv.setUint16(offset, 0, true); // cbSize: size of the extension
            offset += 2;
            offset = flock.audio.encode.wav.writeFactChunk(dv, offset, bufDesc.format.numSampleFrames);
        } else if (formatTag === 0xFFFE) {
            // Extensible format (i.e. > 2 channels).
            // Write out additional format fields and fact chunk.
            dv.setUint16(offset, 22, true); // cbSize: size of the extension
            offset += 2;

            // Additional format fields.
            offset = flock.audio.encode.wav.additionalFormat(offset, dv, bitsPerSample, isPCM);

            // Fact chunk.
            offset = flock.audio.encode.wav.writeFactChunk(dv, offset, bufDesc.format.numSampleFrames);
        }

        flock.audio.encode.wav.writeDataChunk(formatSpec, offset, dv, interleaved, dataBodySize);

        return dv.buffer;
    };

    flock.audio.encode.wav.subformats = {
        pcm: new Uint8Array([1, 0, 0, 0, 0, 0, 16, 0, 128, 0, 0, 170, 0, 56, 155, 113]),
        float: new Uint8Array([3, 0, 0, 0, 0, 0, 16, 0, 128, 0, 0, 170, 0, 56, 155, 113])
    };

    flock.audio.encode.wav.additionalFormat = function (offset, dv, bitsPerSample, isPCM) {
        dv.setUint16(offset, bitsPerSample, true); // wValidBitsPerSample
        offset += 2;

        dv.setUint32(offset, 0x80000000, true); // dwChannelMask, hardcoded to SPEAKER_RESERVED
        offset += 4;

        // Subformat GUID.
        var subformat = flock.audio.encode.wav.subformats[isPCM ? "pcm" : "float"];
        flock.audio.encode.setBytes(dv, offset, subformat);
        offset += 16;

        return offset;
    };

    flock.audio.encode.wav.writeFactChunk = function (dv, offset, numSampleFrames) {
        flock.audio.encode.setString(dv, offset, "fact"); // ckID
        offset += 4;

        dv.setUint32(offset, 4, true); //cksize
        offset += 4;

        dv.setUint32(offset, numSampleFrames, true); // dwSampleLength
        offset += 4;

        return offset;
    };

    flock.audio.encode.wav.writeDataChunk = function (formatSpec, offset, dv, interleaved, numSampleBytes) {
        // Data chunk Header
        flock.audio.encode.setString(dv, offset, "data");
        offset += 4;
        dv.setUint32(offset, numSampleBytes, true); // Length of the datahunk.
        offset += 4;

        flock.audio.encode.writeAsPCM(formatSpec, offset, dv, interleaved);
    };
}());
;/*
* Flocking Scheduler
* http://github.com/colinbdclark/flocking
*
* Copyright 2013-2014, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, self*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    // TODO: This duplicates code in flocking-core and should be factored differently.
    flock.shim = {
        URL: typeof window !== "undefined" ? window.URL || window.webkitURL || window.msURL : undefined
    };

    flock.worker = function (code) {
        var type = typeof code,
            url,
            blob;

        if (type === "function") {
            code = "(" + code.toString() + ")();";
        } else if (type !== "string") {
            throw new Error("A flock.worker must be initialized with a String or a Function.");
        }

        if (window.Blob) {
            blob = new Blob([code], {
                type: "text/javascript"
            });
            url = flock.shim.URL.createObjectURL(blob);
        } else {
            url = "data:text/javascript;base64," + window.btoa(code);
        }
        return new Worker(url);
    };


    fluid.registerNamespace("flock.scheduler");


    /**********
     * Clocks *
     **********/
    fluid.defaults("flock.scheduler.clock", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        events: {
            tick: null
        }
    });

    fluid.defaults("flock.scheduler.intervalClock", {
        gradeNames: ["flock.scheduler.clock", "autoInit"],

        members: {
            scheduled: {}
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.intervalClock.schedule",
                args: [
                    "{arguments}.0", // The inverval to clear.
                    "{that}.scheduled",
                    "{that}.events.tick.fire",
                    "{that}.events.onClear.fire"
                ]
            },

            clear: {
                funcName: "flock.scheduler.intervalClock.clear",
                args:[
                    "{arguments}.0", // The inverval to clear.
                    "{that}.scheduled",
                    "{that}.events.onClear.fire"
                ]
            },

            clearAll: {
                funcName: "flock.scheduler.intervalClock.clearAll",
                args: ["{that}.scheduled", "{that}.events.onClear.fire"]
            },

            end: "{that}.clearAll"
        }
    });

    flock.scheduler.intervalClock.schedule = function (interval, scheduled, onTick) {
        var id = setInterval(function () {
            onTick(interval);
        }, interval);
        scheduled[interval] = id;
    };

    flock.scheduler.intervalClock.clear = function (interval, scheduled) {
        var id = scheduled[interval];
        clearInterval(id);
        delete scheduled[interval];
    };

    flock.scheduler.intervalClock.clearAll = function (scheduled, onClear) {
        for (var interval in scheduled) {
            flock.scheduler.intervalClock.clear(interval, scheduled, onClear);
        }
    };


    fluid.defaults("flock.scheduler.scheduleClock", {
        gradeNames: ["flock.scheduler.clock", "autoInit"],

        members: {
            scheduled: []
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.scheduleClock.schedule",
                args: [
                    "{arguments}.0",
                    "{that}.scheduled",
                    "{that}.events"
                ]
            },

            clear: {
                funcName: "flock.scheduler.scheduleClock.clear",
                args: [
                    "{arguments}.0",
                    "{arguments}.1",
                    "{that}.scheduled",
                    "{that}.events.onClear.fire"
                ]
            },

            clearAll: {
                funcName: "flock.scheduler.scheduleClock.clearAll",
                args: [
                    "{that}.scheduled",
                    "{that}.events.onClear.fire"
                ]
            },

            end: "{that}.clearAll"
        }
    });

    flock.scheduler.scheduleClock.schedule = function (timeFromNow, scheduled, events) {
        var id;
        id = setTimeout(function () {
            clearTimeout(id);
            events.tick.fire(timeFromNow);
        }, timeFromNow);

        scheduled.push(id);
    };

    flock.scheduler.scheduleClock.clear = function (id, idx, scheduled) {
        idx = idx === undefined ? scheduled.indexOf(id) : idx;
        if (idx > -1) {
            scheduled.splice(idx, 1);
            clearTimeout(id);
        }
    };

    flock.scheduler.scheduleClock.clearAll = function (scheduled) {
        for (var i = 0; i < scheduled.length; i++) {
            var id = scheduled[i];
            clearTimeout(id);
        }

        scheduled.length = 0;
    };


    fluid.defaults("flock.scheduler.webWorkerClock", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        members: {
            worker: {
                expander: {
                    funcName: "flock.worker",
                    args: "@expand:fluid.getGlobalValue(flock.scheduler.webWorkerClock.workerImpl)"
                }
            }
        },

        invokers: {
            postToWorker: {
                funcName: "flock.scheduler.webWorkerClock.postToWorker",
                args: [
                    "{arguments}.0", // Message name.
                    "{arguments}.1", // Value.
                    "{that}.options.messages",
                    "{that}.worker"
                ]
            },

            schedule: "{that}.postToWorker(schedule, {arguments}.0)",

            clear: "{that}.postToWorker(clear, {arguments}.0)",

            clearAll: "{that}.postToWorker(clearAll)",

            end: "{that}.postToWorker(end)"
        },

        events: {
            tick: null
        },

        listeners: {
            onCreate: {
                funcName: "flock.scheduler.webWorkerClock.init",
                args: ["{that}"]
            }
        },

        startMsg: {
            msg: "start",
            value: "{that}.options.clockType"
        },

        messages: {
            schedule: {
                msg: "schedule"
            },

            clear: {
                msg: "clear"
            },

            clearAll: {
                msg: "clearAll"
            },

            end: {
                msg: "end"
            }
        }
    });

    flock.scheduler.webWorkerClock.init = function (that) {
        that.worker.addEventListener("message", function (e) {
            that.events.tick.fire(e.data.value);
        }, false);

        that.worker.postMessage(that.options.startMsg);
    };

    flock.scheduler.webWorkerClock.postToWorker = function (msgName, value, messages, worker) {
        var msg = messages[msgName];
        if (value !== undefined) {
            msg.value = value;
        }
        worker.postMessage(msg);
    };

    // This code is only intended to run from within a Worker, via flock.worker.
    flock.scheduler.webWorkerClock.workerImpl = function () {
        "use strict"; // jshint ignore:line

        var flock = flock || {};
        flock.worker = flock.worker || {};

        flock.worker.clock = function () {
            var that = {};

            that.tick = function (interval) {
                self.postMessage({
                    msg: "tick",
                    value: interval
                });
            };

            return that;
        };

        flock.worker.intervalClock = function () {
            var that = flock.worker.clock();
            that.scheduled = {};

            // TODO: Copy-pasted from flock.scheduler.intervalClock.
            that.schedule = function (interval) {
                var id = setInterval(function () {
                    that.tick(interval);
                }, interval);
                that.scheduled[interval] = id;
            };

            // TODO: Copy-pasted from flock.scheduler.intervalClock.
            that.clear = function (interval) {
                var id = that.scheduled[interval];
                clearInterval(id);
                delete that.scheduled[interval];
            };

            // TODO: Copy-pasted from flock.scheduler.intervalClock.
            that.clearAll = function () {
                for (var interval in that.scheduled) {
                    that.clear(interval);
                }
            };

            return that;
        };

        flock.worker.scheduleClock = function () {
            var that = flock.worker.clock();
            that.scheduled = [];

            // TODO: Copy-pasted from flock.scheduler.scheduleClock.
            that.schedule = function (timeFromNow) {
                var id;
                id = setTimeout(function () {
                    that.clear(id);
                    that.tick(timeFromNow);
                }, timeFromNow);
                that.scheduled.push(id);
            };

            // TODO: Copy-pasted from flock.scheduler.scheduleClock.
            that.clear = function (id, idx) {
                idx = idx === undefined ? that.scheduled.indexOf(id) : idx;
                if (idx > -1) {
                    that.scheduled.splice(idx, 1);
                }
                clearTimeout(id);
            };

            // TODO: Copy-pasted from flock.scheduler.scheduleClock.
            that.clearAll = function () {
                for (var i = 0; i < that.scheduled.length; i++) {
                    var id = that.scheduled[i];
                    clearTimeout(id);
                }
                that.scheduled.length = 0;
            };

            return that;
        };

        self.addEventListener("message", function (e) {
            if (e.data.msg === "start") {
                flock.clock = flock.worker[e.data.value]();
            } else if (e.data.msg === "end") {
                if (flock.clock) {
                    flock.clock.clearAll();
                    self.close();
                }
            } else if (flock.clock) {
                flock.clock[e.data.msg](e.data.value);
            }
        }, false);
    };

    fluid.defaults("flock.scheduler.webWorkerIntervalClock", {
        gradeNames: ["flock.scheduler.webWorkerClock", "autoInit"],
        clockType: "intervalClock"
    });

    fluid.defaults("flock.scheduler.webWorkerScheduleClock", {
        gradeNames: ["flock.scheduler.webWorkerClock", "autoInit"],
        clockType: "scheduleClock"
    });


    /**************
     * Schedulers *
     **************/

    fluid.defaults("flock.scheduler", {
        gradeNames: ["fluid.standardComponent", "autoInit"],

        events: {
            onScheduled: null,
            onFinished: null,
            onClearAll: null
        },

        listeners: {
            onClearAll: [
                "{that}.clock.clearAll()"
            ]
        }
    });

    flock.scheduler.addListener = function (listener, listeners, onAdded) {
        listeners.push(listener);
        onAdded(listener);

        return listener;
    };

    flock.scheduler.removeListener = function (listener, listeners, onRemoved) {
        if (!listener) {
            return;
        }

        var idx = listeners.indexOf(listener);
        if (idx > -1) {
            listeners.splice(idx, 1);
            onRemoved(listener);
        } else if (listener.wrappedListener) {
            flock.scheduler.removeListener(listener.wrappedListener, listeners, onRemoved);
        }
    };

    fluid.defaults("flock.scheduler.repeat", {
        gradeNames: ["flock.scheduler", "autoInit"],

        members: {
            listeners: {}
        },

        components: {
            clock: {
                type: "flock.scheduler.webWorkerIntervalClock"
            }
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.repeat.schedule",
                args: [
                    "{arguments}.0", // The interval to schedule.
                    "{arguments}.1", // The listener.
                    "{timeConverter}",
                    "{synthContext}",
                    "{that}.listeners",
                    "{that}.events.onScheduled.fire"
                ]
            },

            clear: "{that}.events.onFinished.fire",

            clearAll: {
                funcName: "flock.scheduler.repeat.clearAll",
                args: [
                    "{that}.listeners",
                    "{that}.events.onFinished.fire",
                    "{that}.events.onClearAll.fire"
                ]
            },

            clearInterval: {
                funcName: "flock.scheduler.repeat.clearInterval",
                args: ["{arguments}.0", "{that}.listeners", "{that}.events.onFinished.fire"]
            }
        },

        listeners: {
            onScheduled: [
                {
                    funcName: "flock.scheduler.addListener",
                    args: [
                        "{arguments}.1", // The listener.
                        {
                            expander: {
                                funcName: "flock.scheduler.repeat.intervalListeners",
                                args: ["{arguments}.0", "{that}.listeners"]
                            }
                        },
                        "{that}.clock.events.tick.addListener"
                    ]
                },
                {
                    func: "{that}.clock.schedule",
                    args: ["{arguments}.0"]
                }
            ],
            onFinished: {
                funcName: "flock.scheduler.removeListener",
                args: [
                    "{arguments}.1",    // The listener.
                    {
                        expander: {
                            funcName: "flock.scheduler.repeat.intervalListeners",
                            args: ["{arguments}.0", "{that}.listeners"]
                        }
                    },
                    "{that}.clock.events.tick.removeListener"
                ]
            }
        }
    });

    flock.scheduler.repeat.intervalListeners = function (interval, listeners) {
        return listeners[interval];
    };

    flock.scheduler.repeat.schedule = function (interval, listener, timeConverter, synthContext, listeners, onScheduled) {
        interval = timeConverter.value(interval);
        listener = flock.scheduler.async.prepareListener(listener, synthContext);

        var wrapper = flock.scheduler.repeat.wrapValueListener(interval, listener);

        flock.scheduler.repeat.addInterval(interval, listeners);
        onScheduled(interval, wrapper);

        return wrapper;
    };

    flock.scheduler.repeat.wrapValueListener = function (value, listener) {
        var wrapper = function (time) {
            if (time === value) {
                listener(time);
            }
        };

        wrapper.wrappedListener = listener;

        return wrapper;
    };

    flock.scheduler.repeat.addInterval = function (interval, listeners) {
        var listenersForInterval = listeners[interval];
        if (!listenersForInterval) {
            listenersForInterval = listeners[interval] = [];
        }
    };

    flock.scheduler.repeat.clearAll = function (listeners, onFinished, onClearAll) {
        for (var interval in listeners) {
            flock.scheduler.repeat.clearInterval(interval, listeners, onFinished);
        }

        onClearAll();
    };

    flock.scheduler.repeat.clearInterval = function (interval, listeners, onFinished) {
        var listenersForInterval = listeners[interval];

        if (!listenersForInterval) {
            return;
        }

        for (var i = 0; i < listenersForInterval.length; i++) {
            var listener = listenersForInterval[i];
            onFinished(interval, listener);
        }
    };


    fluid.defaults("flock.scheduler.once", {
        gradeNames: ["flock.scheduler", "autoInit"],

        members: {
            listeners: []
        },

        components: {
            clock: {
                type: "flock.scheduler.webWorkerScheduleClock"
            }
        },

        invokers: {
            schedule: {
                funcName: "flock.scheduler.once.schedule",
                args: [
                    "{arguments}.0", // The scheduled time.
                    "{arguments}.1", // The listener.
                    "{timeConverter}",
                    "{synthContext}",
                    "{that}.clear",
                    "{that}.events.onScheduled.fire"
                ]
            },

            clear: "{that}.events.onFinished.fire",

            clearAll: {
                funcName: "flock.scheduler.once.clearAll",
                args: [
                    "{that}.listeners",
                    "{that}.events.onFinished.fire",
                    "{that}.events.onClearAll.fire"
                ]
            }
        },

        listeners: {
            onScheduled: [
                {
                    funcName: "flock.scheduler.addListener",
                    args: [
                        "{arguments}.1", // The listener.
                        "{that}.listeners", // All registered listeners.
                        "{that}.clock.events.tick.addListener"
                    ]
                },
                {
                    func: "{that}.clock.schedule",
                    args: ["{arguments}.0"]
                }
            ],
            onFinished: {
                funcName: "flock.scheduler.removeListener",
                args: [
                    "{arguments}.0",    // The listener.
                    "{that}.listeners", // All registered listeners.
                    "{that}.clock.events.tick.removeListener"
                ]
            }
        }
    });

    flock.scheduler.once.wrapValueListener = function (value, listener, removeFn) {
        var wrapper = function (time) {
            if (time === value) {
                listener(time);
                removeFn(wrapper);
            }
        };

        wrapper.wrappedListener = listener;

        return wrapper;
    };

    flock.scheduler.once.schedule = function (time, listener, timeConverter, synthContext, removeFn, onScheduled) {
        time = timeConverter.value(time);
        listener = flock.scheduler.async.prepareListener(listener, synthContext);

        var wrapper = flock.scheduler.once.wrapValueListener(time, listener, removeFn);
        onScheduled(time, wrapper);

        return wrapper;
    };

    flock.scheduler.once.clearAll = function (listeners, onFinished, onClearAll) {
        for (var i = 0; i < listeners.length; i++) {
            onFinished(listeners[i]);
        }

        onClearAll();
    };


    fluid.defaults("flock.scheduler.async", {
        gradeNames: ["fluid.standardComponent", "autoInit"],

        subSchedulerOptions: {
            components: {
                timeConverter: "{async}.timeConverter"
            },

            listeners: {
                "{async}.events.onClear": "{that}.clear()",
                "{async}.events.onClearAll": "{that}.clearAll()",
                "{async}.events.onEnd": "{that}.clock.end()"
            }
        },

        distributeOptions: {
            source: "{that}.options.subSchedulerOptions",
            removeSource: true,
            target: "{that flock.scheduler}.options"
        },

        components: {
            timeConverter: {
                type: "flock.convert.seconds"
            },

            onceScheduler: {
                type: "flock.scheduler.once"
            },

            repeatScheduler: {
                type: "flock.scheduler.repeat"
            },

            // This is user-specified.
            // Typically a flock.band instance or a synth itself,
            // but can be anything that has a set of named synths.
            synthContext: undefined
        },

        invokers: {
            /**
             * Schedules a listener to be invoked repeatedly at the specified interval.
             *
             * @param {Number} interval the interval to schedule
             * @param {Function} listener the listener to invoke
             */
            repeat: {
                func: "{repeatScheduler}.schedule",
                args: ["{arguments}.0", "{arguments}.1"]
            },

            /**
             * Schedules a listener to be invoked once at a future time.
             *
             * @param {Number} time the time (relative to now) when the listener should be invoked
             * @param {Function} listener the listener to invoke
             */
            once: {
                func: "{onceScheduler}.schedule",
                args: ["{arguments}.0", "{arguments}.1"]
            },

            /**
             * Schedules a series of "once" events.
             *
             * @param {Array} times an array of times to schedule
             * @param {Object} changeSpec the change spec that should be applied
             */
            sequence: {
                funcName: "flock.scheduler.async.sequence",
                args: [
                    "{arguments}.0", // Array of times to schedule.
                    "{arguments}.1", // The changeSpec to schedule.
                    "{that}.once"
                ]
            },

            /**
             * Schedules a score.
             *
             * @param {Array} score an array of score object
             */
            schedule: {
                funcName: "flock.scheduler.async.schedule",
                args: ["{arguments}.0", "{that}"]
            },

            /**
             * Deprecated.
             *
             * Clears a previously-registered listener.
             *
             * Note that this function is relatively ineffecient, and
             * a direct call to the clear() method of either the repeatScheduler
             * or the onceScheduler is more effective.
             *
             * @param {Function} listener the listener to clear
             */
            clear: "{that}.events.onClear.fire",

            /**
             * Clears all listeners for all scheduled and repeating events.
             */
            clearAll: "{that}.events.onClearAll.fire",

            /**
             * Clears all registered listeners and stops this scheduler's
             * clocks.
             */
            end: "{that}.events.onEnd.fire"
        },

        events: {
            onClear: null,
            onClearAll: null,
            onEnd: null
        },

        listeners: {
            onCreate: "{that}.schedule({that}.options.score)",
            onEnd: "{that}.clearAll",
            onDestroy: "{that}.end()"
        }
    });

    flock.scheduler.async.sequence = function (times, changeSpec, onceFn) {
        var listeners = [];

        for (var i = 0; i < times.length; i++) {
            var listener = onceFn(times[i], changeSpec);
            listeners.push(listener);
        }

        return listeners;
    };

    // TODO: This function is implemented suspiciously.
    flock.scheduler.async.schedule = function (schedules, that) {
        if (!schedules) {
            return;
        }

        schedules = flock.isIterable(schedules) ? schedules : [schedules];

        for (var i = 0; i < schedules.length; i++) {
            var schedule = schedules[i];
            flock.invoke(that, schedule.interval, [schedule.time, schedule.change]);
        }
    };

    flock.scheduler.async.prepareListener = function (changeSpec, synthContext) {
        return typeof changeSpec === "function" ? changeSpec :
            flock.scheduler.async.evaluateChangeSpec(changeSpec, synthContext);
    };

    flock.scheduler.async.getTargetSynth = function (changeSpec, synthContext) {
        var synthPath = changeSpec.synth;

        if (!changeSpec.synth) {
            return synthContext;
        }

        if (typeof synthPath !== "string") {
            return synthPath;
        }

        var synth = synthContext ? fluid.get(synthContext, synthPath) :
            flock.environment.namedNodes[synthPath];

        return synth || flock.environment.namedNodes[synthPath];
    };

    flock.scheduler.async.makeSynthUpdater = function (synths, changeSpec, staticChanges, synthContext) {
        return function () {
            for (var path in synths) {
                var synth = synths[path];
                staticChanges[path] = synth.value();
            }

            var targetSynth = flock.scheduler.async.getTargetSynth(changeSpec, synthContext);

            if (!targetSynth) {
                flock.fail("A target synth named " + changeSpec.synth +
                    " could not be found in either the specified synthContext or the flock.environment.");
            } else {
                targetSynth.set(staticChanges);
            }
        };
    };

    flock.scheduler.async.evaluateChangeSpec = function (changeSpec, synthContext) {
        var synths = {},
            staticChanges = {};

        // Find all synthDefs and create demand rate synths for them.
        for (var path in changeSpec.values) {
            var change = changeSpec.values[path];
            if (change.synthDef) {
                synths[path] = flock.synth.value(change);
            } else {
                staticChanges[path] = change;
            }
        }

        return flock.scheduler.async.makeSynthUpdater(synths, changeSpec, staticChanges, synthContext);
    };

    fluid.defaults("flock.scheduler.async.tempo", {
        gradeNames: ["flock.scheduler.async", "autoInit"],

        bpm: 60,

        components: {
            timeConverter: {
                type: "flock.convert.beats",
                options: {
                    bpm: "{tempo}.options.bpm"
                }
            }
        }
    });


    /*******************
     * Time Conversion *
     *******************/

    fluid.registerNamespace("flock.convert");

    fluid.defaults("flock.convert.ms", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        invokers: {
            value: "fluid.identity({arguments}.0)"
        }
    });


    fluid.defaults("flock.convert.seconds", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        invokers: {
            value: "flock.convert.seconds.toMillis({arguments}.0)"
        }
    });

    flock.convert.seconds.toMillis = function (secs) {
        return secs * 1000;
    };


    fluid.defaults("flock.convert.beats", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        bpm: 60,

        invokers: {
            value: "flock.convert.beats.toMillis({arguments}.0, {that}.options.bpm)"
        }
    });

    flock.convert.beats.toMillis = function (beats, bpm) {
        return bpm <= 0 ? 0 : (beats / bpm) * 60000;
    };

}());
;/*
* Flocking WebAudio Strategy
* http://github.com/colinbdclark/flocking
*
* Copyright 2013-2014, Colin Clark
* Dual licensed under the MIT and GPL Version 2 licenses.
*/

/*global require, MediaStreamTrack, jQuery*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";

    fluid.registerNamespace("flock.webAudio");

    flock.webAudio.createNode = function (context, nodeSpec) {
        nodeSpec.args = nodeSpec.args ? fluid.makeArray(nodeSpec.args) : undefined;

        var creatorName = "create" + nodeSpec.node,
            nodeStrIdx = creatorName.indexOf("Node");

        // Trim off "Node" if it is present.
        if (nodeStrIdx > -1) {
            creatorName = creatorName.substring(0, nodeStrIdx);
        }

        var node = context[creatorName].apply(context, nodeSpec.args);
        flock.webAudio.initNodeParams(context, node, nodeSpec);
        flock.webAudio.initNodeProperties(node, nodeSpec);
        flock.webAudio.initNodeInputs(node, nodeSpec);

        return node;
    };

    flock.webAudio.setAudioParamValue = function (context, param, value, atTime) {
        atTime = atTime || 0.0;
        var scheduledTime = context.currentTime + atTime;
        param.setValueAtTime(value, scheduledTime);
    };

    // TODO: Add support for other types of AudioParams.
    flock.webAudio.initNodeParams = function (context, node, nodeSpec) {
        var params = nodeSpec.params;

        if (!node || !params) {
            return;
        }

        for (var paramName in params) {
            var param = node[paramName],
                value = params[paramName];

            flock.webAudio.setAudioParamValue(context, param, value);
        }

        return node;
    };

    flock.webAudio.safariPropertyProhibitions = [
        "channelCount",
        "channelCountMode"
    ];

    flock.webAudio.shouldSetProperty = function (propName) {
        return flock.platform.browser.safari ?
            flock.webAudio.safariPropertyProhibitions.indexOf(propName) < 0 :
            true;
    };

    flock.webAudio.initNodeProperties = function (node, nodeSpec) {
        var props = nodeSpec.props;
        if (!props) {
            return;
        }

        for (var propName in props) {
            var value = props[propName];

            if (flock.webAudio.shouldSetProperty(propName)) {
                node[propName] = value;
            }
        }

        return node;
    };

    flock.webAudio.connectInput = function (node, inputNum, input, outputNum) {
        input.connect(node, outputNum, inputNum);
    };

    // TODO: Add the ability to specify the output channel of the connection.
    // TODO: Unify this with AudioParams so they all just look like "inputs".
    flock.webAudio.initNodeInputs = function (node, nodeSpec) {
        var inputs = nodeSpec.inputs;

        for (var inputName in inputs) {
            var inputNodes = inputs[inputName],
                inputNum = parseInt(inputName, 10);

            inputNodes = fluid.makeArray(inputNodes);

            for (var i = 0; i < inputNodes.length; i++) {
                var input = inputNodes[i];
                flock.webAudio.connectInput(node, inputNum, input);
            }
        }
    };


    fluid.defaults("flock.webAudio.audioSystem", {
        gradeNames: ["flock.audioSystem", "autoInit"],

        channelRange: {
            min: "@expand:flock.webAudio.audioSystem.calcMinChannels()",
            max: "@expand:flock.webAudio.audioSystem.calcMaxChannels({that}.context.destination)"
        },

        members: {
            context: "@expand:flock.webAudio.audioSystem.createContext()"
        },

        model: {
            rates: {
                audio: "{that}.context.sampleRate"
            }
        },

        listeners: {
            onCreate: [
                "flock.webAudio.audioSystem.registerContextSingleton({that})",
                "flock.webAudio.audioSystem.configureDestination({that}.context, {that}.model.chans)"
            ]
        }
    });

    flock.webAudio.audioSystem.createContext = function () {
        var singleton = fluid.staticEnvironment.audioSystem;
        return singleton ? singleton.context : new flock.shim.AudioContext();
    };

    flock.webAudio.audioSystem.registerContextSingleton = function (that) {
        fluid.staticEnvironment.audioSystem = that;
    };

    flock.webAudio.audioSystem.calcMaxChannels = function (destination) {
        return flock.platform.browser.safari ? destination.channelCount :
            destination.maxChannelCount;
    };

    flock.webAudio.audioSystem.calcMinChannels = function () {
        return flock.platform.browser.safari ? 2 : 1;
    };

    flock.webAudio.audioSystem.configureDestination = function (context, chans) {
        // Safari will throw an InvalidStateError DOM Exception 11 when
        // attempting to set channelCount on the audioContext's destination.
        // TODO: Remove this conditional when Safari adds support for multiple channels.
        if (!flock.platform.browser.safari) {
            context.destination.channelCount = chans;
            context.destination.channelCountMode = "explicit";
            context.destination.channelInterpretation = "discrete";
        }
    };

    fluid.defaults("flock.webAudio.node", {
        gradeNames: ["fluid.standardRelayComponent", "autoInit"],

        members: {
            node: "@expand:flock.webAudio.createNode({audioSystem}.context, {that}.options.nodeSpec)"
        },

        nodeSpec: {
            args: [],
            params: {},
            properties: {}
        }
    });


    fluid.defaults("flock.webAudio.gain", {
        gradeNames: ["flock.webAudio.node", "autoInit"],

        members: {
            node: "@expand:flock.webAudio.createNode({audioSystem}.context, {that}.options.nodeSpec)"
        },

        nodeSpec: {
            node: "Gain"
        }
    });


    fluid.defaults("flock.webAudio.scriptProcessor", {
        gradeNames: ["flock.webAudio.node", "autoInit"],

        nodeSpec: {
            node: "ScriptProcessor",
            args: [
                "{audioSystem}.model.bufferSize",
                "{audioSystem}.model.numInputBuses",
                "{audioSystem}.model.chans"
            ],
            params: {},
            properties: {
                channelCountMode: "explicit"
            }
        }
    });

    fluid.defaults("flock.webAudio.channelMerger", {
        gradeNames: ["flock.webAudio.node", "autoInit"],

        nodeSpec: {
            node: "ChannelMerger",
            args: ["{audioSystem}.model.numInputBuses"],
            properties: {
                channelCountMode: "discrete"
            }
        }
    });


    // TODO: Remove this when Chrome implements navigator.getMediaDevices().
    fluid.registerNamespace("flock.webAudio.chrome");

    flock.webAudio.chrome.getSources = function (callback) {
        return MediaStreamTrack.getSources(function (infoSpecs) {
            var normalized = fluid.transform(infoSpecs, function (infoSpec) {
                infoSpec.deviceId = infoSpec.id;
                return infoSpec;
            });

            callback(normalized);
        });
    };

    flock.webAudio.mediaStreamFailure = function () {
        flock.fail("Media Capture and Streams are not supported on this browser.");
    };

    var webAudioShims = {
        AudioContext: window.AudioContext || window.webkitAudioContext,

        getUserMediaImpl: navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia || flock.webAudio.mediaStreamFailure,

        getUserMedia: function () {
            flock.shim.getUserMediaImpl.apply(navigator, arguments);
        },

        getMediaDevicesImpl: navigator.getMediaDevices ? navigator.getMediaDevices :
            typeof window.MediaStreamTrack !== "undefined" ?
            flock.webAudio.chrome.getSources : flock.webAudio.mediaStreamFailure,

        getMediaDevice: function () {
            flock.shim.getMediaDevicesImpl.apply(navigator, arguments);
        }
    };

    jQuery.extend(flock.shim, webAudioShims);


    /**
     * Web Audio API Audio Strategy
     */
    fluid.defaults("flock.audioStrategy.web", {
        gradeNames: ["flock.audioStrategy", "autoInit"],

        model: {
            isGenerating: false,
            shouldInitIOS: flock.platform.isIOS
        },

        invokers: {
            start: "{that}.events.onStart.fire()",
            stop: "{that}.events.onStop.fire()",
            saveBuffer: "flock.audioStrategy.web.saveBuffer({arguments}.0)"
        },

        components: {
            nativeNodeManager: {
                type: "flock.webAudio.nativeNodeManager"
            },

            inputDeviceManager: {
                type: "flock.webAudio.inputDeviceManager"
            }
        },

        listeners: {
            onStart: [
                {
                    func: "{that}.applier.change",
                    args: ["isGenerating", true]
                }
            ],

            onStop: [
                {
                    func: "{that}.applier.change",
                    args: ["isGenerating", false]
                }
            ]
        }
    });


    flock.audioStrategy.web.bindWriter = function (jsNode, nodeEvaluator, nativeNodeManager, model, audioSettings) {
        jsNode.model = model;
        jsNode.evaluator = nodeEvaluator;
        jsNode.audioSettings = audioSettings;
        jsNode.inputNodes = nativeNodeManager.inputNodes;
        jsNode.onaudioprocess = flock.audioStrategy.web.writeSamples;
    };

    /**
     * Writes samples to the audio strategy's ScriptProcessorNode.
     *
     * This function must be bound as a listener to the node's
     * onaudioprocess event. It expects to be called in the context
     * of a "this" instance containing the following properties:
     *  - model: the strategy's model object
     *  - inputNodes: a list of native input nodes to be read into input buses
     *  - nodeEvaluator: a nodeEvaluator instance
     *  - audioSettings: the enviornment's audio settings
     */
    flock.audioStrategy.web.writeSamples = function (e) {
        var numInputNodes = this.inputNodes.length,
            evaluator = this.evaluator,
            nodes = evaluator.nodes,
            s = this.audioSettings,
            inBufs = e.inputBuffer,
            outBufs = e.outputBuffer,
            numBlocks = s.numBlocks,
            buses = evaluator.buses,
            numBuses = s.numBuses,
            blockSize = s.blockSize,
            chans = s.chans,
            inChans = inBufs.numberOfChannels,
            chan,
            i,
            samp;

        // If there are no nodes providing samples, write out silence.
        if (evaluator.nodes.length < 1) {
            for (chan = 0; chan < chans; chan++) {
                flock.generate.silence(outBufs.getChannelData(chan));
            }
            return;
        }

        // TODO: Make a formal distinction between input buses,
        // output buses, and interconnect buses in the environment!
        for (i = 0; i < numBlocks; i++) {
            var offset = i * blockSize;

            flock.nodeEvaluator.clearBuses(numBuses, blockSize, buses);

            // Read this ScriptProcessorNode's input buffers
            // into the environment.
            if (numInputNodes > 0) {
                for (chan = 0; chan < inChans; chan++) {
                    var inBuf = inBufs.getChannelData(chan),
                        inBusNumber = chans + chan, // Input buses are located after output buses.
                        targetBuf = buses[inBusNumber];

                    for (samp = 0; samp < blockSize; samp++) {
                        targetBuf[samp] = inBuf[samp + offset];
                    }
                }
            }

            flock.nodeEvaluator.gen(nodes);

            // Output the environment's signal
            // to this ScriptProcessorNode's output channels.
            for (chan = 0; chan < chans; chan++) {
                var sourceBuf = buses[chan],
                    outBuf = outBufs.getChannelData(chan);

                // And output each sample.
                for (samp = 0; samp < blockSize; samp++) {
                    outBuf[samp + offset] = sourceBuf[samp];
                }
            }
        }
    };

    flock.audioStrategy.web.iOSStart = function (model, applier, ctx, jsNode) {
        // Work around a bug in iOS Safari where it now requires a noteOn()
        // message to be invoked before sound will work at all. Just connecting a
        // ScriptProcessorNode inside a user event handler isn't sufficient.
        if (model.shouldInitIOS) {
            var s = ctx.createBufferSource();
            s.connect(jsNode);
            s.start(0);
            s.stop(0);
            s.disconnect(0);
            applier.change("shouldInitIOS", false);
        }
    };

    flock.audioStrategy.web.saveBuffer = function (o) {
        try {
            var encoded = flock.audio.encode.wav(o.buffer, o.format),
                blob = new Blob([encoded], {
                    type: "audio/wav"
                });

            flock.audioStrategy.web.download(o.path, blob);

            if (o.success) {
                o.success(encoded);
            }

            return encoded;
        } catch (e) {
            if (!o.error) {
                flock.fail("There was an error while trying to download the buffer named " +
                    o.buffer.id + ". Error: " + e);
            } else {
                o.error(e);
            }
        }
    };

    flock.audioStrategy.web.download = function (fileName, blob) {
        var dataURL = flock.shim.URL.createObjectURL(blob),
            a = window.document.createElement("a"),
            click = document.createEvent("Event");

        // TODO: This approach currently only works in Chrome.
        // Although Firefox apparently supports it, this method of
        // programmatically clicking the link doesn't seem to have an
        // effect in it.
        // http://caniuse.com/#feat=download
        a.href = dataURL;
        a.download = fileName;
        click.initEvent("click", true, true);
        a.dispatchEvent(click);
    };


    /**
     * Manages a collection of input nodes and an output node,
     * with a JS node in between.
     *
     * Note: this component is slated for removal when Web Audio
     * "islands" are implemented.
     */
    fluid.defaults("flock.webAudio.nativeNodeManager", {
        gradeNames: ["fluid.standardRelayComponent", "autoInit"],

        members: {
            outputNode: undefined,
            inputNodes: []
        },

        components: {
            scriptProcessor: {
                createOnEvent: "onCreateScriptProcessor",
                type: "flock.webAudio.scriptProcessor",
                options: {
                    nodeSpec: {
                        inputs: {
                            "0": "{inputMerger}"
                        }
                    },

                    listeners: {
                        onCreate: [
                            // TODO: Where should this really go?
                            {
                                funcName: "flock.audioStrategy.web.bindWriter",
                                args: [
                                    "{that}.node",
                                    "{nodeEvaluator}",
                                    "{nativeNodeManager}",
                                    "{audioStrategy}.model",
                                    "{audioSystem}.model"
                                ]
                            }
                        ]
                    }
                }
            },

            merger: {
                type: "flock.webAudio.channelMerger"
            }
        },

        invokers: {
            connect: "{that}.events.onConnect.fire",

            disconnect: "{that}.events.onDisconnect.fire",

            createNode: {
                funcName: "flock.webAudio.createNode",
                args: [
                    "{audioSystem}.context",
                    "{arguments}.0" // The nodeSpec
                ]
            },

            createInputNode: {
                funcName: "flock.webAudio.nativeNodeManager.createInputNode",
                args: [
                    "{that}",
                    "{arguments}.0", // The nodeSpec.
                    "{arguments}.1", // {optional} The input bus number to insert it at.
                ]
            },

            createMediaStreamInput: {
                funcName: "flock.webAudio.nativeNodeManager.createInputNode",
                dynamic: true,
                args: [
                    "{that}",
                    {
                        node: "MediaStreamSource",
                        args: ["{arguments}.0"] // The MediaStream
                    },
                    "{arguments}.1"  // {optional} The input bus number to insert it at.
                ]
            },

            createMediaElementInput: {
                funcName: "flock.webAudio.nativeNodeManager.createInputNode",
                dynamic: true,
                args: [
                    "{that}",
                    {
                        node: "MediaElementSource",
                        args: ["{arguments}.0"] // The HTMLMediaElement
                    },
                    "{arguments}.1"  // {optional} The input bus number to insert it at.
                ]
            },

            createOutputNode: {
                funcName: "flock.webAudio.nativeNodeManager.createOutputNode",
                args: [
                    "{that}",
                    "{arguments}.0" // The nodeSpec
                ]
            },

            insertInput: {
                funcName: "flock.webAudio.nativeNodeManager.insertInput",
                args: [
                    "{that}",
                    "{audioSystem}.model",
                    "{enviro}",
                    "{arguments}.0", // The node to insert.
                    "{arguments}.1"  // {optional} The bus number to insert it at.
                ]
            },

            removeInput: {
                funcName: "flock.webAudio.nativeNodeManager.removeInput",
                args: ["{arguments}.0", "{that}.inputNodes"]
            },

            removeAllInputs: {
                funcName: "flock.webAudio.nativeNodeManager.removeAllInputs",
                args: "{that}.inputNodes"
            },

            insertOutput: {
                funcName: "flock.webAudio.nativeNodeManager.insertOutput",
                args: ["{that}", "{arguments}.0"]
            },

            removeOutput: {
                funcName: "flock.webAudio.nativeNodeManager.removeOutput",
                dynamic: true,
                args: ["{scriptProcessor}.node"]
            }
        },

        events: {
            onCreateScriptProcessor: null, // TODO: Naming!
            onStart: "{audioStrategy}.events.onStart",
            onConnect: null,
            onStop: "{audioStrategy}.events.onStop",
            onDisconnect: null,
            onReset: "{audioStrategy}.events.onReset"
        },

        listeners: {
            onCreate: [
                "{that}.events.onCreateScriptProcessor.fire()",
                {
                    func: "{that}.insertOutput",
                    args: "{scriptProcessor}.node"
                }
            ],

            onStart: [
                "{nativeNodeManager}.connect()",

                {
                    // TODO: Replace this with some progressive enhancement action.
                    // TODO: Where should this really go?
                    funcName: "flock.audioStrategy.web.iOSStart",
                    args: [
                        "{audioStrategy}.model",
                        "{audioStrategy}.applier",
                        "{audioSystem}.context",
                        "{scriptProcessor}.node"
                    ]
                }
            ],

            onConnect: [
                {
                    "this": "{merger}.node",
                    method: "connect",
                    args: ["{scriptProcessor}.node"]
                },
                {
                    "this": "{that}.outputNode",
                    method: "connect",
                    args: ["{audioSystem}.context.destination"]
                },
                {
                    funcName: "flock.webAudio.nativeNodeManager.connectOutput",
                    args: ["{scriptProcessor}.node", "{that}.outputNode"]
                }
            ],

            onStop: [
                "{nativeNodeManager}.disconnect()"
            ],

            onDisconnect: [
                {
                    "this": "{merger}.node",
                    method: "disconnect",
                    args: [0]
                },
                {
                    "this": "{scriptProcessor}.node",
                    method: "disconnect",
                    args: [0]
                },
                {
                    "this": "{that}.outputNode",
                    method: "disconnect",
                    args: [0]
                }
            ],

            onReset: [
                "{that}.removeAllInputs",
                "{that}.events.onCreateScriptProcessor.fire()"
            ]
        }
    });

    flock.webAudio.nativeNodeManager.createInputNode = function (that, nodeSpec, busNum) {
        var node = that.createNode(nodeSpec);
        return that.insertInput(node, busNum);
    };

    flock.webAudio.nativeNodeManager.createOutputNode = function (that, nodeSpec) {
        var node = that.createNode(nodeSpec);
        return that.insertOutput(node);
    };

    flock.webAudio.nativeNodeManager.connectOutput = function (jsNode, outputNode) {
        if (jsNode !== outputNode) {
            jsNode.connect(outputNode);
        }
    };

    flock.webAudio.nativeNodeManager.removeAllInputs = function (inputNodes) {
        for (var i = 0; i < inputNodes.length; i++) {
            var node = inputNodes[i];
            node.disconnect(0);
        }
        inputNodes.length = 0;
    };

    flock.webAudio.nativeNodeManager.insertInput = function (that, audioSettings, enviro, node, busNum) {
        var maxInputs = audioSettings.numInputBuses;
        if (that.inputNodes.length >= maxInputs) {
            flock.fail("There are too many input nodes connected to Flocking. " +
                "The maximum number of input buses is currently set to " + maxInputs + ". " +
                "Either remove an existing input node or increase Flockings numInputBuses option.");

            return;
        }

        busNum = busNum === undefined ? enviro.busManager.acquireNextBus("input") : busNum;
        var idx = busNum - audioSettings.chans;

        that.inputNodes.push(node);
        node.connect(that.merger.node, 0, idx);

        return busNum;
    };

    flock.webAudio.nativeNodeManager.removeInput = function (node, inputNodes) {
        var idx = inputNodes.indexOf(node);
        if (idx > -1) {
            inputNodes.splice(idx, 1);
        }

        node.disconnect(0);
    };

    flock.webAudio.nativeNodeManager.insertOutput = function (that, node) {
        if (that.outputNode) {
            that.outputNode.disconnect(0);
        }

        that.outputNode = node;

        return node;
    };

    flock.webAudio.nativeNodeManager.removeOutput = function (jsNode) {
        // Replace the current output node with the jsNode.
        flock.webAudio.nativeNodeManager.insertOutput(jsNode);
    };


    /**
     * Manages audio input devices using the Web Audio API.
     */
    // Add a means for disconnecting audio input nodes.
    fluid.defaults("flock.webAudio.inputDeviceManager", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        invokers: {
            /**
             * Opens the specified audio device.
             * If no device is specified, the default device is opened.
             *
             * @param {Object} deviceSpec a device spec containing, optionally, an 'id' or 'label' parameter
             */
            openAudioDevice: {
                funcName: "flock.webAudio.inputDeviceManager.openAudioDevice",
                args: [
                    "{arguments}.0",
                    "{that}.openAudioDeviceWithId",
                    "{that}.openFirstAudioDeviceWithLabel",
                    "{that}.openAudioDeviceWithConstraints"
                ]
            },

            /**
             * Opens an audio device with the specified WebRTC constraints.
             * If no constraints are specified, the default audio device is opened.
             *
             * @param {Object} constraints a WebRTC-compatible constraints object
             */
            openAudioDeviceWithConstraints: {
                funcName: "flock.webAudio.inputDeviceManager.openAudioDeviceWithConstraints",
                args: [
                    "{audioSystem}.context",
                    "{enviro}",
                    "{nativeNodeManager}.createMediaStreamInput",
                    "{arguments}.0"
                ]
            },

            /**
             * Opens an audio device with the specified WebRTC device id.
             *
             * @param {string} id a device identifier
             */
            openAudioDeviceWithId: {
                funcName: "flock.webAudio.inputDeviceManager.openAudioDeviceWithId",
                args: ["{arguments}.0", "{that}.openAudioDeviceWithConstraints"]
            },

            /**
             * Opens the first audio device found with the specified label.
             * The label must be an exact, case-insensitive match.
             *
             * @param {string} label a device label
             */
            openFirstAudioDeviceWithLabel: {
                funcName: "flock.webAudio.inputDeviceManager.openFirstAudioDeviceWithLabel",
                args: ["{arguments}.0", "{that}.openAudioDeviceWithId"]
            }
        }
    });

    flock.webAudio.inputDeviceManager.openAudioDevice = function (sourceSpec, idOpener, labelOpener, specOpener) {
        if (sourceSpec) {
            if (sourceSpec.id) {
                return idOpener(sourceSpec.id);
            } else if (sourceSpec.label) {
                return labelOpener(sourceSpec.label);
            }
        }

        return specOpener();
    };


    flock.webAudio.inputDeviceManager.openAudioDeviceWithId = function (id, deviceOpener) {
        var options = {
            audio: {
                optional: [
                    {
                        sourceId: id
                    }
                ]
            }
        };

        deviceOpener(options);
    };

    flock.webAudio.inputDeviceManager.openFirstAudioDeviceWithLabel = function (label, deviceOpener) {
        if (!label) {
            return;
        }

        // TODO: Can't access device labels until the user agrees
        // to allow access to the current device.
        flock.shim.getMediaDevices(function (deviceInfoSpecs) {
            var matches = deviceInfoSpecs.filter(function (device) {
                if (device.label.toLowerCase() === label.toLowerCase()) {
                    return true;
                }
            });

            if (matches.length > 0) {
                deviceOpener(matches[0].deviceId);
            } else {
                fluid.log(fluid.logLevel.IMPORTANT,
                    "An audio device named '" + label + "' could not be found.");
            }
        });
    };

    flock.webAudio.inputDeviceManager.openAudioDeviceWithConstraints = function (context, enviro, openMediaStream, options) {
        options = options || {
            audio: true
        };

        // Acquire an input bus ahead of time so we can synchronously
        // notify the client where its output will be.
        var busNum = enviro.busManager.acquireNextBus("input");

        function error (err) {
            fluid.log(fluid.logLevel.IMPORTANT,
                "An error occurred while trying to access the user's microphone. " +
                err);
        }

        function success (mediaStream) {
            openMediaStream(mediaStream, busNum);
        }


        flock.shim.getUserMedia(options, success, error);

        return busNum;
    };


    fluid.defaults("flock.webAudio.outputFader", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        fadeDuration: 0.5,

        gainSpec: {
            node: "Gain",

            params: {
                gain: 0.0
            },

            properties: {
                channelCount: "{audioSystem}.model.chans",
                channelCountMode: "explicit"
            }
        },

        members: {
            gainNode: "@expand:flock.webAudio.outputFader.createGainNode({enviro}, {that}.options.gainSpec)",
            context: "{audioSystem}.context"
        },

        invokers: {
            fadeIn: {
                funcName: "flock.webAudio.outputFader.fadeIn",
                args: [
                    "{that}.context",
                    "{that}.gainNode",
                    "{arguments}.0", // Target amplitude
                    "{that}.options.fadeDuration"
                ]
            },

            fadeTo: {
                funcName: "flock.webAudio.outputFader.fadeTo",
                args: [
                    "{that}.context",
                    "{that}.gainNode",
                    "{arguments}.0", // Target amplitude
                    "{that}.options.fadeDuration"
                ]
            }
        }
    });

    flock.webAudio.outputFader.createGainNode = function (enviro, gainSpec) {
        var gainNode = enviro.audioStrategy.nativeNodeManager.createOutputNode(gainSpec);

        return gainNode;
    };

    flock.webAudio.outputFader.fade = function (context, gainNode, start, end, duration) {
        duration = duration || 0.0;

        var now = context.currentTime,
            endTime = now + duration;

        // Set the current value now, then ramp to the target.
        flock.webAudio.setAudioParamValue(context, gainNode.gain, start);
        gainNode.gain.linearRampToValueAtTime(end, endTime);
    };

    flock.webAudio.outputFader.fadeTo = function (context, gainNode, end, duration) {
        flock.webAudio.outputFader.fade(context, gainNode, gainNode.gain.value, end, duration);
    };

    flock.webAudio.outputFader.fadeIn = function (context, gainNode, end, duration) {
        flock.webAudio.outputFader.fade(context, gainNode, 0, end, duration);
    };


    fluid.demands("flock.audioSystem.platform", "flock.platform.webAudio", {
        funcName: "flock.webAudio.audioSystem"
    });

    fluid.demands("flock.audioStrategy.platform", "flock.platform.webAudio", {
        funcName: "flock.audioStrategy.web"
    });

}());
;/*
 * Flocking MIDI
 * http://github.com/colinbdclark/flocking
 *
 * Copyright 2014, Colin Clark
 * Dual licensed under the MIT and GPL Version 2 licenses.
 */

/*global require, Promise, console*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {

    "use strict";

    fluid.registerNamespace("flock.midi");

    flock.midi.requestAccess = function (sysex, onAccessGranted, onError) {
        if (!navigator.requestMIDIAccess) {
            var msg = "The Web MIDI API is not available. You may need to enable it in your browser's settings.";
            fluid.log(fluid.logLevel.WARN, msg);
            onError(msg);
            return;
        }

        var p = navigator.requestMIDIAccess({
            sysex: sysex
        });

        p.then(onAccessGranted, onError);
    };

    flock.midi.getPorts = function (access) {
        var ports = {},
            portCollector = typeof access.inputs === "function" ?
                flock.midi.collectPortsLegacy : flock.midi.collectPorts;

        portCollector("inputs", access, ports);
        portCollector("outputs", access, ports);

        return ports;
    };

    flock.midi.requestPorts = function (success, error) {
        function wrappedSuccess (access) {
            var ports = flock.midi.getPorts(access);
            success(ports);
        }

        flock.midi.requestAccess(false, wrappedSuccess, error);
    };

    flock.midi.createPortViews = function (portsArray) {
        return fluid.transform(portsArray, function (port) {
            return {
                id: port.id,
                name: port.name,
                manufacturer: port.manufacturer,
                state: port.state,
                connection: port.connection
            };
        });
    };

    flock.midi.prettyPrintPorts = function (ports) {
        return fluid.prettyPrintJSON({
            inputs: flock.midi.createPortViews(ports.inputs),
            outputs: flock.midi.createPortViews(ports.outputs)
        });
    };

    flock.midi.logPorts = function () {
        function success (ports) {
            var printed = flock.midi.prettyPrintPorts(ports);
            console.log(printed);
        }

        function error (err) {
            console.log(err);
        }

        flock.midi.requestPorts(success, error);
    };

    flock.midi.collectPorts = function (type, access, ports) {
        var portsForType = ports[type] = ports[type] || [],
            iterator = access[type].values();

        // TODO: Switch to ES6 for..of syntax when it's safe to do so
        // across all supported Flocking environments
        // (i.e. when Node.js and eventually IE support it).
        var next = iterator.next();
        while (!next.done) {
            portsForType.push(next.value);
            next = iterator.next();
        }

        return ports;
    };

    // TODO: Remove this when the new Web MIDI API makes it
    // into the Chrome release channel.
    flock.midi.collectPortsLegacy = function (type, access, ports) {
        if (access[type]) {
            ports[type] = access[type]();
        }

        return ports;
    };

    flock.midi.read = function (data) {
        var status = data[0],
            type = status >> 4,
            chan = status & 0xf,
            fn;

        switch (type) {
            case 8:
                fn = flock.midi.read.noteOff;
                break;
            case 9:
                fn = data[2] > 0 ? flock.midi.read.noteOn : flock.midi.read.noteOff;
                break;
            case 10:
                fn = flock.midi.read.polyAftertouch;
                break;
            case 11:
                fn = flock.midi.read.controlChange;
                break;
            case 12:
                fn = flock.midi.read.programChange;
                break;
            case 13:
                fn = flock.midi.read.channelAftertouch;
                break;
            case 14:
                fn = flock.midi.read.pitchbend;
                break;
            case 15:
                fn = flock.midi.read.sysex;
                break;
            default:
                throw new Error("Recieved an unrecognized MIDI message: " + data);
        }

        return fn(chan, data);
    };

    flock.midi.read.note = function (type, chan, data) {
        return {
            type: type,
            chan: chan,
            note: data[1],
            velocity: data[2]
        };
    };

    flock.midi.read.noteOn = function (chan, data) {
        return flock.midi.read.note("noteOn", chan, data);
    };

    flock.midi.read.noteOff = function (chan, data) {
        return flock.midi.read.note("noteOff", chan, data);
    };

    flock.midi.read.polyAftertouch = function (chan, data) {
        return {
            type: "aftertouch",
            chan: chan,
            note: data[1],
            pressure: data[2]
        };
    };

    flock.midi.read.controlChange = function (chan, data) {
        return {
            type: "control",
            chan: chan,
            number: data[1],
            value: data[2]
        };
    };

    flock.midi.read.programChange = function (chan, data) {
        return {
            type: "program",
            chan: chan,
            program: data[1]
        };
    };

    flock.midi.read.channelAftertouch = function (chan, data) {
        return {
            type: "aftertouch",
            chan: chan,
            pressure: data[1]
        };
    };

    flock.midi.read.pitchbend = function (chan, data) {
        return {
            type: "pitchbend",
            chan: chan,
            value: (data[1] << 7) | data[2]
        };
    };

    flock.midi.read.sysex = function (chan, data) {
        return {
            type: "system",
            chan: chan,
            data: data.subarray(1)
        };
    };


    /**
     * Represents the overall Web MIDI system,
     * including references to all the available MIDI ports
     * and the MIDIAccess object.
     */
    // TODO: This should be a model component!
    fluid.defaults("flock.midi.system", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        sysex: false,

        members: {
            access: undefined,
            ports: undefined
        },

        invokers: {
            requestAccess: {
                funcName: "flock.midi.requestAccess",
                args: [
                    "{that}.options.sysex",
                    "{that}.events.onAccessGranted.fire",
                    "{that}.events.onAccessError.fire"
                ]
            },

            refreshPorts: {
                funcName: "flock.midi.system.refreshPorts",
                args: ["{that}", "{that}.access", "{that}.events.onPortsAvailable.fire"]
            }
        },

        events: {
            onAccessGranted: null,
            onAccessError: null,
            onReady: null,
            onPortsAvailable: null
        },

        listeners: {
            onCreate: {
                func: "{that}.requestAccess"
            },

            onAccessGranted: [
                "flock.midi.system.setAccess({that}, {arguments}.0)",
                "{that}.refreshPorts()",
                "{that}.events.onReady.fire({that}.ports)"
            ],

            onAccessError: {
                funcName: "fluid.log",
                args: [fluid.logLevel.WARN, "MIDI Access Error: ", "{arguments}.0"]
            }
        }
    });

    flock.midi.system.setAccess = function (that, access) {
        that.access = access;
    };

    flock.midi.system.refreshPorts = function (that, access, onPortsAvailable) {
        that.ports = flock.midi.getPorts(access);
        onPortsAvailable(that.ports);
    };


    /**
     * An abstract grade that the defines the event names
     * for receiving MIDI messages
     */
    fluid.defaults("flock.midi.receiver", {
        gradeNames: ["fluid.eventedComponent"],

        events: {
            raw: null,
            message: null,
            note: null,
            noteOn: null,
            noteOff: null,
            control: null,
            program: null,
            aftertouch: null,
            pitchbend: null
        }
    });


    /*
     * A MIDI Connection represents a connection between an arbitrary set of
     * input and output ports across one or more MIDI devices connected to the system.
     */
    // TODO: Handle port disconnection events.
    fluid.defaults("flock.midi.connection", {
        gradeNames: ["flock.midi.receiver", "autoInit"],

        openImmediately: false,

        sysex: false,

        distributeOptions: {
            source: "{that}.options.sysex",
            target: "{that > system}.options.sysex"
        },

        // Supported PortSpec formats:
        //  - Number: the index of the input and output port to use (this is the default)
        //  - { manufacturer: "akai", name: "LPD8"}
        //  - { input: Number, output: Number}
        //  - { input: { manufacturer: "akai", name: "LPD8"}, output: {manufacturer: "korg", name: "output"}}
        ports: 0,

        invokers: {
            send: {
                func: "{that}.events.onSendMessage.fire"
            },

            open: {
                funcName: "flock.midi.connection.bind",
                args: [
                    "{system}.ports",
                    "{that}.options.ports",
                    "{that}.events.onReady.fire",
                    "{that}.events.raw.fire",
                    "{that}.events.onSendMessage"
                ]
            },

            close: {
                funcName: "flock.midi.connection.close",
                args: [
                    "{system}.ports",
                    "{that}.events.raw.fire"
                ]
            }
        },

        components: {
            system: {
                type: "flock.midi.system",
                options: {
                    events: {
                        onReady: "{connection}.events.onPortsAvailable"
                    }
                }
            }
        },

        events: {
            onPortsAvailable: null,
            onReady: null,
            onError: null,
            onSendMessage: null
        },

        listeners: {
            onPortsAvailable: {
                funcName: "flock.midi.connection.autoOpen",
                args: [
                    "{connection}.options.openImmediately", "{connection}.open"
                ]
            },

            onError: {
                funcName: "fluid.log",
                args: [fluid.logLevel.WARN, "{arguments}.0"]
            },

            raw: {
                funcName: "flock.midi.connection.fireEvent",
                args: ["{arguments}.0", "{that}.events"]
            },

            onDestroy: [
                "{that}.close()"
            ]
        }
    });

    flock.midi.connection.autoOpen = function (openImmediately, openFn) {
        if (openImmediately) {
            openFn();
        }
    };

    flock.midi.findPorts = function (ports, portSpecs) {
        portSpecs = fluid.makeArray(portSpecs);

        var matches = [];

        fluid.each(portSpecs, function (portSpec) {
            var portFinder = flock.midi.findPorts.portFinder(portSpec),
                matchesForSpec = portFinder(ports);

            matches = matches.concat(matchesForSpec);
        });

        return matches;
    };

    flock.midi.findPorts.portFinder = function (portSpec) {
        if (typeof portSpec === "number") {
            return flock.midi.findPorts.byIndex(portSpec);
        }

        if (typeof portSpec === "string") {
            portSpec = {
                name: portSpec
            };
        }

        var matcher = portSpec.id ? flock.midi.findPorts.idMatcher(portSpec.id) :
            portSpec.manufacturer && portSpec.name ?
            flock.midi.findPorts.bothMatcher(portSpec.manufacturer, portSpec.name) :
            portSpec.manufacturer ? flock.midi.findPorts.manufacturerMatcher(portSpec.manufacturer) :
            flock.midi.findPorts.nameMatcher(portSpec.name);

        return function (ports) {
            return ports.filter(matcher);
        };
    };

    flock.midi.findPorts.byIndex = function (idx) {
        return function (ports) {
            var port = ports[idx];
            return port ? [port] : [];
        };
    };

    flock.midi.findPorts.lowerCaseContainsMatcher = function (matchSpec) {
        return function (obj) {
            var isMatch;
            for (var prop in matchSpec) {
                var objVal = obj[prop];
                var matchVal = matchSpec[prop];

                isMatch = (matchVal === "*") ? true :
                    objVal && (objVal.toLowerCase().indexOf(matchVal.toLowerCase()) > -1);

                if (!isMatch) {
                    break;
                }
            }

            return isMatch;
        };
    };

    flock.midi.findPorts.idMatcher = function (id) {
        return function (port) {
            return port.id === id;
        };
    };

    flock.midi.findPorts.bothMatcher = function (manu, name) {
        return flock.midi.findPorts.lowerCaseContainsMatcher({
            manufacturer: manu,
            name: name
        });
    };

    flock.midi.findPorts.manufacturerMatcher = function (manu) {
        return flock.midi.findPorts.lowerCaseContainsMatcher({
            manufacturer: manu
        });
    };

    flock.midi.findPorts.nameMatcher = function (name) {
        return flock.midi.findPorts.lowerCaseContainsMatcher({
            name: name
        });
    };

    flock.midi.findPorts.eachPortOfType = function (port, type, fn) {
        var ports = fluid.makeArray(port);
        fluid.each(ports, function (port) {
            if (port.type === type) {
                fn(port);
            }
        });
    };

    flock.midi.connection.openPort = function (port, openPromises) {
        // Remove this conditional when Chrome 43 has been released.
        if (port.open) {
            var p = port.open();
            openPromises.push(p);
        }

        return openPromises;
    };

    flock.midi.connection.listen = function (port, onRaw, openPromises) {
        flock.midi.findPorts.eachPortOfType(port, "input", function (port) {
            flock.midi.connection.openPort(port, openPromises);
            port.addEventListener("midimessage", onRaw, false);
        });

        return openPromises;
    };

    flock.midi.connection.stopListening = function (port, onRaw) {
        flock.midi.findPorts.eachPortOfType(port, "input", function (port) {
            port.close();
            port.removeEventListener("midimessage", onRaw, false);
        });
    };

    flock.midi.connection.bindSender = function (port, onSendMessage, openPromises) {
        var ports = fluid.makeArray(port);

        fluid.each(ports, function (port) {
            flock.midi.connection.openPort(port, openPromises);
            onSendMessage.addListener(port.send.bind(port));
        });

        return openPromises;
    };

    flock.midi.connection.fireReady = function (openPromises, onReady) {
        if (!openPromises || openPromises.length < 1) {
            return;
        }

        Promise.all(openPromises).then(onReady);
    };

    flock.midi.connection.bind = function (ports, portSpec, onReady, onRaw, onSendMessage) {
        portSpec = flock.midi.connection.expandPortSpec(portSpec);

        var input = flock.midi.findPorts(ports.inputs, portSpec.input),
            output = flock.midi.findPorts(ports.outputs, portSpec.output),
            openPromises = [];

        if (input && input.length > 0) {
            flock.midi.connection.listen(input, onRaw, openPromises);
        } else if (portSpec.input !== undefined) {
            flock.midi.connection.logNoMatchedPorts("input", portSpec);
        }

        if (output && output.length > 0) {
            flock.midi.connection.bindSender(output, onSendMessage, openPromises);
        } else if (portSpec.output !== undefined) {
            flock.midi.connection.logNoMatchedPorts("output", portSpec);
        }

        flock.midi.connection.fireReady(openPromises, onReady);
    };

    flock.midi.connection.close = function (ports, onRaw) {
        flock.midi.connection.stopListening(ports.inputs, onRaw);
        // TODO: Come up with some scheme for unbinding port senders
        // since they use Function.bind().
    };

    flock.midi.connection.logNoMatchedPorts = function (type, portSpec) {
        fluid.log(fluid.logLevel.WARN,
            "No matching " + type + " ports were found for port specification: ", portSpec[type]);
    };

    flock.midi.connection.expandPortSpec = function (portSpec) {
        if (portSpec.input !== undefined || portSpec.output !== undefined) {
            return portSpec;
        }

        var expanded = {
            input: {},
            output: {}
        };

        if (typeof portSpec === "number") {
            expanded.input = expanded.output = portSpec;
        } else {
            flock.midi.connection.expandPortSpecProperty("manufacturer", portSpec, expanded);
            flock.midi.connection.expandPortSpecProperty("name", portSpec, expanded);
        }

        return expanded;
    };

    flock.midi.connection.expandPortSpecProperty = function (propName, portSpec, expanded) {
        expanded.input[propName] = expanded.output[propName] = portSpec[propName];
        return expanded;
    };

    flock.midi.connection.fireEvent = function (midiEvent, events) {
        var model = flock.midi.read(midiEvent.data),
            eventForType = model.type ? events[model.type] : undefined;

        events.message.fire(model);

        // TODO: Remove this special-casing of noteOn/noteOff events into note events.
        if (model.type === "noteOn" || model.type === "noteOff") {
            events.note.fire(model);
        }

        if (eventForType) {
            eventForType.fire(model);
        }
    };


    fluid.defaults("flock.midi.controller", {
        gradeNames: ["fluid.eventedComponent", "autoInit"],

        members: {
            controlMap: "@expand:flock.midi.controller.optimizeControlMap({that}.options.controlMap)",
            noteMap: "{that}.options.noteMap"
        },

        controlMap: {},                       // Control and note maps
        noteMap: {},                          // need to be specified by the user.

        components: {
            synthContext: {                   // Also user-specified. Typically a flock.band instance,
                type: "flock.band"            // but can be anything that has a set of named synths,
            },                                // including a synth itself.

            connection: {
                type: "flock.midi.connection",
                options: {
                    ports: {
                        input: "*"              // Connect to the first available input port.
                    },

                    openImmediately: true,    // Immediately upon instantiating the connection.

                    listeners: {
                        control: {
                            func: "{controller}.mapControl"
                        },
                        note: {
                            func: "{controller}.mapNote"
                        }
                    }
                }
            }
        },

        invokers: {
            mapControl: {
                funcName: "flock.midi.controller.mapControl",
                args: ["{arguments}.0", "{that}.synthContext", "{that}.controlMap"]
            },

            mapNote: {
                funcName: "flock.midi.controller.mapNote",
                args: ["{arguments}.0", "{that}.synthContext", "{that}.noteMap"]
            }
        }
    });

    flock.midi.controller.optimizeControlMap = function (controlMap) {
        var controlMapArray = new Array(127);
        fluid.each(controlMap, function (mapSpec, controlNum) {
            var idx = Number(controlNum);
            controlMapArray[idx] = mapSpec;
        });

        return controlMapArray;
    };

    flock.midi.controller.expandControlMapSpec = function (valueUGenID, mapSpec) {
        mapSpec.transform.id = valueUGenID;

        // TODO: The key "valuePath" is confusing;
        // it actually points to the location in the
        // transform synth where the value will be set.
        mapSpec.valuePath = mapSpec.valuePath || "value";

        if (!mapSpec.transform.ugen) {
            mapSpec.transform.ugen = "flock.ugen.value";
        }

        return mapSpec;
    };

    flock.midi.controller.makeValueSynth = function (value, id, mapSpec) {
        mapSpec = flock.midi.controller.expandControlMapSpec(id, mapSpec);

        var transform = mapSpec.transform,
            valuePath = mapSpec.valuePath;

        flock.set(transform, valuePath, value);

        // Instantiate the new value synth.
        var valueSynth = flock.synth.value({
            synthDef: transform
        });

        // Update the value path so we can quickly update the synth's input value.
        mapSpec.valuePath = id + "." + valuePath;

        return valueSynth;
    };

    flock.midi.controller.transformValue = function (value, mapSpec) {
        var transform = mapSpec.transform,
            type = typeof transform;

        if (type === "function") {
            return transform(value);
        }
        // TODO: Add support for string-based transforms
        // that bind to globally-defined synths
        // (e.g. "flock.synth.midiFreq" or "flock.synth.midiAmp")
        // TODO: Factor this into a separate function.
        if (!mapSpec.transformSynth) {
            // We have a raw synthDef.
            // Instantiate a value synth to transform incoming control values.

            // TODO: In order to support multiple inputs (e.g. a multi-arg OSC message),
            // this special path needs to be scoped to the argument name. In the case of MIDI,
            // this would be the CC number. In the case of OSC, it would be a combination of
            // OSC message address and argument index.
            mapSpec.transformSynth = flock.midi.controller.makeValueSynth(
                value, "flock-midi-controller-in", mapSpec);
        } else {
            // TODO: When the new node architecture is in in place, we can directly connect this
            // synth to the target synth at instantiation time.
            // TODO: Add support for arrays of values, such as multi-arg OSC messages.
            mapSpec.transformSynth.set(mapSpec.valuePath, value);
        }

        return mapSpec.transformSynth.value();
    };

    flock.midi.controller.setMappedValue = function (value, map, synthContext) {
        if (!map) {
            return;
        }

        value = map.transform ? flock.midi.controller.transformValue(value, map) : value;
        var synth = synthContext[map.synth] || synthContext;

        synth.set(map.input, value);
    };

    flock.midi.controller.mapControl = function (midiMsg, synthContext, controlMap) {
        var map = controlMap[midiMsg.number],
            value = midiMsg.value;

        flock.midi.controller.setMappedValue(value, map, synthContext);
    };

    // TODO: Add support for defining listener filters or subsets
    // of all midi notes (e.g. for controllers like the Quneo).
    flock.midi.controller.mapNote = function (midiMsg, synthContext, noteMap) {
        var keyMap = noteMap.note,
            key = midiMsg.note,
            velMap = noteMap.velocity,
            vel = midiMsg.velocity;

        if (keyMap) {
            flock.midi.controller.setMappedValue(key, keyMap, synthContext);
        }

        if (velMap) {
            flock.midi.controller.setMappedValue(vel, velMap, synthContext);
        }
    };

}());
;/*!
* Flocking - Creative audio synthesis for the Web!
* http://github.com/colinbdclark/flocking
*
* Copyright 2011-2014, Colin Clark
* Dual licensed under the MIT or GPL Version 2 licenses.
*/

/*global require*/
/*jshint white: false, newcap: true, regexp: true, browser: true,
    forin: false, nomen: true, bitwise: false, maxerr: 100,
    indent: 4, plusplus: false, curly: true, eqeqeq: true,
    freeze: true, latedef: true, noarg: true, nonew: true, quotmark: double, undef: true,
    unused: true, strict: true, asi: false, boss: false, evil: false, expr: false,
    funcscope: false*/

var fluid = fluid || require("infusion"),
    flock = fluid.registerNamespace("flock");

(function () {
    "use strict";
    
    fluid.registerNamespace("flock.view");
    
    // TODO: Infusionize.
    flock.view.scope = function (canvas, model) {
        var that = {
            model: model || {
                values: []
            },
            canvas: typeof (canvas) === "string" ? document.querySelector(canvas) : canvas
        };
        
        that.refreshView = function () {
            var ctx = that.ctx,
                h = that.model.height,
                halfH = that.model.halfHeight,
                w = that.model.width,
                vals = that.model.values,
                len = vals.length,
                scaleX = that.model.scaleX * (w / len), // TODO: Doesn't support scale values < 1.0
                i,
                x,
                y;
        
            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
            for (i = 0; i < len; i++) {
                x = i * scaleX;
                y = vals[i] * that.model.scaleY * halfH + halfH;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        };
        
        that.init = function () {
            that.ctx = that.canvas.getContext("2d");
            that.ctx.fillStyle = that.model.fill || that.ctx.fillStyle;
            that.ctx.strokeStyle = that.model.strokeColor || that.ctx.strokeStyle;
            that.ctx.lineWidth = that.model.strokeWidth || that.ctx.lineWidth;
        
            that.model.min = that.model.min || -1.0;
            that.model.max = that.model.max || 1.0;
            that.model.height = that.canvas.height;
            that.model.halfHeight = that.model.height / 2;
            that.model.width = that.canvas.width;
            that.model.scaleX = that.model.scaleX || that.model.scale || 1.0;
            that.model.scaleY = that.model.scaleY || that.model.scale || 1.0;
            
            that.refreshView();
        };
        
        that.init();
        return that;
    };
    
}());
