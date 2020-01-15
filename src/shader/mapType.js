

var mapType = function(gl, type)
{
    if(!GL_TABLE)
    {
        var typeNames = Object.keys(GL_TO_GLSL_TYPES);

        GL_TABLE = {};

        for(var i = 0; i < typeNames.length; ++i)
        {
            var tn = typeNames[i];
            GL_TABLE[ gl[tn] ] = GL_TO_GLSL_TYPES[tn];
        }
    }

  return GL_TABLE[type];
};

var GL_TABLE = null;

var GL_TO_GLSL_TYPES = (function() {
  var types = {
    'SAMPLER_2D': 'sampler2D',
    'SAMPLER_2D_ARRAY': 'sampler2DArray',
    'SAMPLER_2D_SHADOW': 'sampler2DShadow',
    'SAMPLER_2D_ARRAY_SHADOW': 'sampler2DArrayShadow',
    'SAMPLER_3D': 'sampler3D',
    'SAMPLER_CUBE': 'sampler2DCube',
  };

  [
    ['FLOAT', ''],
    ['INT', 'i'],
    ['UNSIGNED_INT', 'u', 'uint'],
    ['BOOL', 'b'],
  ].map(function (v) {
    var variant = v[0];
    var prefix = v[1];
    var scalar = v[2] || variant.toLowerCase();

    types[variant] = scalar;

    for (var dim = 2; dim < 5; ++dim) {
      types[variant + '_VEC' + dim] = prefix + 'vec' + dim;
    }

    if (variant === 'BOOL' || variant === 'FLOAT') return;

    types[variant + '_SAMPLER_2D'] = prefix + 'sampler2D';
    types[variant + '_SAMPLER_3D'] = prefix + 'sampler3D';
    types[variant + '_SAMPLER_2D_ARRAY'] = prefix + 'sampler2DArray';
    types[variant + '_SAMPLER_CUBE'] = prefix + 'sampler2DCube';
  });

  for (var m = 2; m < 5; ++m) {
    types['FLOAT_MAT' + m] = 'mat' + m;

    for (var n = 2; n < 5; ++n) {
      if (n === m) continue;

      types['FLOAT_MAT' + m + 'x' + n] = 'mat' + m + 'x' + n;
    }
  }

  return types;
})();

module.exports = mapType;
