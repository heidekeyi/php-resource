const fs = require('fs');
const readPathName = './iconfont.css';
const writePathName = './icon.module.css';
new Promise(resolve => {
    fs.readFile(readPathName, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            resolve(data);
        }
    });
}).then(data => new Promise(resolve => {
    data = data.toString();
    fs.writeFile(writePathName, data, error => {
        if (error) {
            console.log(error);
        } else {
            resolve(data);
        }
    });
})).then(data => {
    const str = data.toString()
        .split('\n')
        .map(it => {
            const res = it.match(/^\.icon-(\w+):before \{$/);
            return res ? res[1] : null;
        }).filter(it => it !== null)
        .map(it => `
.${it} {
  composes: iconfont icon-${it};
}`).join('\n');
    return Promise.resolve(str);
}).then(data => {
    fs.appendFile(writePathName, data.toString(), error => {
        if (error) {
            console.log(error);
        }
    });
})
