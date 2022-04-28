const express = require('express');
const fs = require('fs/promises');

const app = express();

app.use(express.json())
app.use(express.static('./'))

app.get('/api', (req, res) => {
  res.json('wqeeeeeeeeeeeeeeeeeeeee');
});

app.post('/data', async (req, res) => {
  const { fileNumber, ...rest } = req.body;

  await fs.writeFile(`./darina_data_${fileNumber}.json`, JSON.stringify(rest, null, 2))

  res.json('file rewrited').status(200);
})

app.put('/data', async (req, res) => {
  const { fileNumber, ...rest } = req.body;

  const fileData = await fs.readFile(`./darina_data_${fileNumber}.json`, 'utf8');
  const parsedFileData = JSON.parse(fileData);

  Object.keys(rest).forEach((updatedKey) => {
    parsedFileData[updatedKey] = rest[updatedKey];
  })

  await fs.writeFile(`./darina_data_${fileNumber}.json`, JSON.stringify(parsedFileData, null, 2))

  res.json('file updated')
})

app.listen(3005, () => console.log('started on 3005'));

