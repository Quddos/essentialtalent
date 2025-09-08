const fs = require('fs');
const path = require('path');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log('Created uploads directory:', UPLOAD_DIR);
} else {
  console.log('Uploads directory already exists:', UPLOAD_DIR);
}

console.log('Upload directory setup complete!');

