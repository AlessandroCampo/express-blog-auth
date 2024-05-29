const path = require('path');
const fs = require('fs');
let posts = require('./postsDb.json')
const uniquid = require('uniqid');


const readFile = (fileName, extension) => {
    const namePlusExtension = fileName + '.' + extension
    const filePath = extension == 'html' ? path.join(__dirname, 'views', namePlusExtension) : path.join(__dirname, namePlusExtension);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (extension == 'json') return JSON.parse(fileContent);
    return fileContent
};

const getPath = (fileName) => {
    return path.join(__dirname, fileName)
}

const writeInFile = function (fileName, extension, data) {
    const filePath = path.join(__dirname, fileName + '.' + extension);
    fs.writeFileSync(filePath, data);
};

const deletePublicFile = function (fileName) {
    const filePath = path.join(__dirname, '/public', fileName);
    fs.unlinkSync(filePath);
}



const createSlug = (title) => {
    //check //
    let currentPosts = JSON.parse(fs.readFileSync(__dirname + '/postsDb.json'))
    const postSlugs = currentPosts.map(p => p.slug);
    let baseSlug = title ? title.replaceAll(' ', '-').toLowerCase() : 'no-title-post';
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (postSlugs.includes(uniqueSlug)) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
}

const generateID = () => {
    return uniquid()
}


//update pizze functio



module.exports = {
    readFile,
    getPath,
    writeInFile,
    createSlug,
    deletePublicFile,
    generateID
}
