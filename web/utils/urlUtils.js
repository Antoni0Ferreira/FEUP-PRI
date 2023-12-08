function createUrl(selectedContext, defType, fl, q_op, q, rows) {
    // Check if all parameters are defined
    if (!selectedContext || !defType || !fl || !q_op || !q || !rows) return;

    // Check if parameters are of the correct type
    if (q_op !== 'AND' && q_op !== 'OR') return;

    // Check if rows is a number between 1 and 100
    if (rows < 1 || rows > 100 || rows % 1 !== 0) return;

    // Check if selectedContext is valid
    if (selectedContext !== 'simple_conversations' && selectedContext !== 'complex_conversations') return;

    return `https://api.moviehut.pt/solr/${selectedContext}/select?defType=${defType}&fl=${fl}&indent=true&q.op=${q_op}&q=${q}&rows=${rows}&useParams=`;
};

module.exports = { createUrl };