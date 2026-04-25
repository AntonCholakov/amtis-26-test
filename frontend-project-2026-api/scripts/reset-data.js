const fs = require('fs/promises');
const path = require('path');

async function resetData() {
  const templateDir = path.join(process.cwd(), 'data-template');
  const dataDir = path.join(process.cwd(), 'data');

  const files = await fs.readdir(templateDir);

  await fs.mkdir(dataDir, { recursive: true });

  for (const file of files) {
    const source = path.join(templateDir, file);
    const destination = path.join(dataDir, file);
    await fs.copyFile(source, destination);
  }

  console.log('Data reset complete.');
}       

resetData().catch((error) => {
  console.error(error);
  process.exit(1);
});