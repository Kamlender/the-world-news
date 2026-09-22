const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = 'public/logo-transparent.png';
    const outputPath = 'public/logo-footer.png';

    // Get image info
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Loop through pixels
    // "THE" is roughly in the top right quadrant
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (info.width * y + x) * 4;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];
        
        // Target dark blueish/black pixels in the top right area
        // "THE" is dark blue, something like R<60, G<80, B<120
        if (x > 800 && y < 500 && a > 50) {
          if (r < 80 && g < 100 && b < 150) {
            // Turn it white
            data[idx] = 255;
            data[idx+1] = 255;
            data[idx+2] = 255;
          }
        }
      }
    }

    // Save the new image specifically for the footer
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log('Footer logo created with white text.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
