// cypress/plugins/index.js
const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../../data.json');

module.exports = (on, config) => {
  on('task', {
    saveData({ key, value }) {
      let data = {};
    
      try {
        if (fs.existsSync(dataPath)) {
          const fileData = fs.readFileSync(dataPath, 'utf8');
          data = JSON.parse(fileData);
        }
      } catch (error) {
        console.error('Error reading data file:', error);
      }
    
      data[key] = value;
    
      try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
      } catch (error) {
        console.error('Error writing data file:', error);
      }
    
      return null;
    },
    getData({ key }) {
      if (!fs.existsSync(dataPath)) {
        return key ? [] : {};
      }
    
      try {
        const fileData = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(fileData);
    
        if (key) {
          return data[key] !== undefined ? data[key] : [];
        }
    
        return data;
      } catch (error) {
        console.error('Error reading or parsing data file:', error);
        return key ? [] : {};
      }
    },    
    getAllData({ sort = 'asc' }) {
      if (fs.existsSync(dataPath)) {
        try {
          let data = JSON.parse(fs.readFileSync(dataPath));
    
          // Extract values into an array
          data = Object.values(data);
    
          // Merge arrays into a single array
          const mergedArray = data.flat();
    
          // Sort array based on the 'sort' parameter
          const sortedData = mergedArray.sort((a, b) => {
            if (sort === 'asc') {
              return a.price - b.price;
            } else if (sort === 'desc') {
              return b.price - a.price;
            } else {
              throw new Error('Invalid sort parameter. Use "asc" or "desc".');
            }
          });
    
          return sortedData;
        } catch (error) {
          console.error('Error reading or parsing data:', error);
          return [];
        }
      }
    
      return [];
    }
  });
};
