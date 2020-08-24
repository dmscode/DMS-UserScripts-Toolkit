/* 初始化文件系统对象，获取当前脚本目录（项目根目录） */
const fs = require('fs')
const filedir = __dirname+'/'

const config = JSON.parse(fs.readFileSync(filedir+'keys-replacer.config.json'))
const keys = config.keys
for(file of config.files){
  let fileContent = (fs.readFileSync(filedir+file.in)).toString()
  for(const key in keys){
    const reg = new RegExp('```'+key+'```', 'g')
    fileContent = fileContent.replace(reg, keys[key])
  }
  fs.writeFileSync(filedir+file.out,
    fileContent,
    (err) => {
      if (err) {
        return console.error(err);
      }
    })
}