function renderAuthors(authors){
    var output = "";
    for(let i = 0; i < authors.length -1; i++){
        output += authors[i] + ", ";
    }
    output += authors[authors.length - 1];
    return output;
}

module.exports = renderAuthors;