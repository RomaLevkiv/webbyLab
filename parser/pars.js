const csv = require('csv-streamify');
const fs = require('fs');

function promisFunc(path) {
  return new Promise((resolve, reject) => {

    const parser = csv({
      delimiter: ':'
    })

    let block = [];
    let item = {};

    parser.on('data', function (line) {
      try {
        if (line[0] === "") {
          if (Object.keys(item).length !== 0) {
            item["name"] = item["Title"]; delete item["Title"];
            item["yearRelease"] = item["Release Year"]; delete item["Release Year"];
            item["encodingFormat"] = item['Format']; delete item['Format'];
            item["yearRelease"] = +item["yearRelease"];
            item["actorList"] = item["Stars"]; delete item["Stars"];
            block.push(item);
          }
          item = {};
        } else {
          line[0] = line[0].trim();
          line[1] = line[1].trim();
          if (line[0] === "Stars") line[1] = line[1].split(', ');
          item[line[0]] = line[1];
        };
      } catch (e) {
        reject(e);
      }
    })

    parser.on("end", () => {
      resolve(block);
    })

    fs.createReadStream("./parser/" + path).pipe(parser);
  })
}

exports.funcPars = async (path) => {
  const res = await promisFunc(path);
  return res;
}



















