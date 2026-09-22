const sharp = require('sharp');

async function createFavicon() {
  try {
    // Crop aggressively to get only the globe on the left
    await sharp('public/logo-transparent.png')
      .extract({ left: 100, top: 120, width: 680, height: 680 })
      .resize(32, 32)
      .toFile('src/app/favicon.ico');
    console.log('Favicon cropped and saved.');
  } catch(e) {
    console.error(e);
  }
}

createFavicon();
