import fs from 'fs';
import path from 'path';

export function getTestData(fileName: string) {

  const filePath = path.resolve(
    `test-data/${fileName}`
  );

  const data = JSON.parse(
    fs.readFileSync(filePath, 'utf-8')
  );

  return data;
}