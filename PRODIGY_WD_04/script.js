document.getElementById('search-button').addEventListener('click', function () {
    var query = document.getElementById('search-input').value.toLowerCase();
    var sections = document.querySelectorAll('.section');
    var found = false;

    sections.forEach(function (section) {
        var content = section.innerHTML.toLowerCase();
        var originalContent = section.innerHTML;

        if (content.includes(query)) {
            found = true;
            var regex = new RegExp(query, 'gi');
            var highlightedContent = originalContent.replace(regex, function (match) {
                return '<span class="highlight">' + match + '</span>';
            });
            section.innerHTML = highlightedContent;
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    if (!found) {
        document.body.innerHTML = '<div class="container text-center"><h2>No matches found</h2></div>';
    }
});
