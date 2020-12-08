const t = require('tcomb');

const Image = t.struct(
  {
    path: t.String,
    extension: t.String,
  },
  'Image'
);

Image.getPortraitXLarge = (image) => {
  return `${image.path}/portrait_xlarge.${image.extension}`;
};

Image.getStandardXLarge = (image) => {
  return `${image.path}/standard_xlarge.${image.extension}`;
};

module.exports = Image;
