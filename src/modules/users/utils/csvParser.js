const fs = require('fs');
const readline = require('readline');

function buildNestedObject(flatObj) {
  const nestedObj = {};
  for (const key in flatObj) {
    const value = flatObj[key];
    const parts = key.split('.');
    let current = nestedObj;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        current[part] = value;
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    });
  }
  return nestedObj;
}

async function parseCSVStream(filePath, onChunk, chunkSize = 1000) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });
  
    let headers = [];
    let buffer = [];
    let hasData = false;
  
    for await (const line of rl) {
      const values = line.split(',').map(v => v.trim());
  
      if (!headers.length) {
        headers = values;
        continue;
      }
  
      hasData = true;
  
      const flatObj = {};
      headers.forEach((key, i) => {
        flatObj[key] = values[i];
      });
  
      const nested = buildNestedObject(flatObj);
      const { name, age, address, ...additional_info } = nested;
  
      buffer.push({
        name: `${name.firstName} ${name.lastName}`,
        age: parseInt(age),
        address,
        additional_info,
      });
  
      if (buffer.length >= chunkSize) {
        await onChunk(buffer);
        buffer = [];
      }
    }
  
    if (!hasData) {
      throw new Error('CSV file is empty or contains only headers.');
    }
  
    if (buffer.length) {
      await onChunk(buffer); // final callback
    }    
  } catch (error) {
    throw Error(error.message);
  }
}

module.exports = parseCSVStream;
