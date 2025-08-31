import fs from 'fs';
import path from 'path';
import { getConfig } from '../lib/env-utils';

async function testConfiguration() {
  const config = getConfig();
  console.log('\nTesting configuration...');
  console.log('Max file size:', config.maxFileSize / (1024 * 1024), 'MB');
  console.log('Allowed file types:', config.allowedFileTypes.join(', '));
  console.log('Upload path:', config.uploadPath);
  console.log('AI available:', config.aiAvailable);
}

async function testUploadDirectory() {
  const config = getConfig();
  const uploadDir = path.join(process.cwd(), config.uploadPath);
  
  console.log('\nTesting upload directory...');
  if (fs.existsSync(uploadDir)) {
    console.log('✓ Upload directory exists at:', uploadDir);
    
    // Test write permissions
    const testFile = path.join(uploadDir, 'test.txt');
    try {
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log('✓ Directory is writable');
    } catch (error) {
      console.error('✗ Directory is not writable:', error);
    }
  } else {
    console.error('✗ Upload directory does not exist:', uploadDir);
  }
}

async function main() {
  console.log('Starting CV analyzer system test...\n');
  
  await testConfiguration();
  await testUploadDirectory();
  
  console.log('\nTest complete!');
}

main().catch(console.error);
