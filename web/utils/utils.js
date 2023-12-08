const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const genres = [
    "action",
    "adventure",
    "music",
    "western",
    "sci-fi",
    "horror",
    "family",
    "adult",
    "crime",
    "fantasy",
    "romance",
    "biography",
    "film-noir",
    "history",
    "comedy",
    "documentary",
    "sport",
    "short",
    "musical",
    "thriller",
    "mystery",
    "drama",
    "animation",
    "war"
];

const fixRating = (rating) => {
    const newRating = Math.round(rating) / 2;
    return Math.min(Math.max(newRating, 0), 5);
};

function matchHighlighter(text, search) {
    return text.replace(new RegExp(search, 'gi'), '<b><u>$&</u></b>');
}

module.exports = { labels, fixRating, matchHighlighter, genres };
