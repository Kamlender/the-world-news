const fs = require('fs');
const sharp = require('sharp');

async function processImage() {
  try {
    const inputPath = 'public/logo.png';
    const outputPath = 'public/logo-transparent.png';

    // Get image info
    const metadata = await sharp(inputPath).metadata();
    
    // Read raw pixels
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Loop through pixels and make white ones transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      // If color is close to white, make it transparent
      if (r > 240 && g > 240 && b > 240) {
        data[i+3] = 0; // Alpha channel
      }
    }

    // Save the new image
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log('Image processed successfully!');
    
    // Create a 32x32 favicon from the globe part (assuming globe is on the left half)
    // We'll just crop the left square part of the image
    const size = Math.min(info.width, info.height);
    await sharp(outputPath)
      .extract({ left: 0, top: 0, width: size, height: size })
      .resize(32, 32)
      .toFile('src/app/favicon.ico');
      
    console.log('Favicon created successfully!');

  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
