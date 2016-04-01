var walk     = require('walk');
var mustache = require('mustache');
var path     = require('path');

function copyDirectory (generator, templateProps) {
  var templatePath;
  var destinationPath;
  walk.walkSync(generator.sourceRoot(), {
    listeners: {
      file: function (root, stats, next) {
        templatePath = path.relative(generator.sourceRoot(), path.join(root, stats.name));
        destinationPath = mustache.render(generator.destinationPath(templatePath), templateProps);
        try {
          generator.fs.copyTpl(
            generator.templatePath(templatePath),
            destinationPath,
            templateProps
          );
        }
        catch (error) {
          console.log(destinationPath);
          console.trace(error);
        }
        next();
      }.bind(this)
    }
  });
};

exports.copyDirectory = copyDirectory;
