$(document).ready(function() {
    var reading = false;
    var paragraphs = $('.articleParagraph');
    var currentParagraphIndex = 0;
    var firstClick = true; // New variable to track the first click
    var highlighting = true; // New variable to track whether highlighting should continue

    $('#startButton').on('click', function() {
        if (reading) {
            stopReading();

            document.querySelector('#startButton').textContent = 'Lees voor';
        } else {
            startReading();

            document.querySelector('#startButton').textContent = 'Stop voorlezen';
        }
    });

    $('#stopButton').on('click', function() {
        stopReading();
    });

    function startReading() {
        if (paragraphs.length === 0) return;

        reading = true;
        highlighting = true; // Reset highlighting flag
        if (firstClick) {
            firstClick = false;
            readNextParagraph();
        } else {
            resumeReading();
        }
    }

    function stopReading() {
        responsiveVoice.cancel();
        reading = false;
        highlighting = false; // Stop highlighting
        unhighlightAllWords();
    }

    function resumeReading() {
        var paragraph = $(paragraphs[currentParagraphIndex]);
        var words = paragraph.text().split(/\s+/);

        responsiveVoice.speak(paragraph.text(), 'Dutch Male', {
            onstart: function() {
                highlightWords(words, paragraph);
            },
            onend: function() {
                currentParagraphIndex++;
                unhighlightAllWords();
                readNextParagraph();
            },
            rate: 1
        });
    }

    function readNextParagraph() {
        if (currentParagraphIndex < paragraphs.length) {
            resumeReading();
        } else {
            reading = false;
            currentParagraphIndex = 0;
        }
    }

    function highlightWords(words, paragraph) {
        var currentWordIndex = 0;

        function highlightNextWord() {
            if (highlighting && currentWordIndex < words.length) {
                words[currentWordIndex] = '<span class="highlighted-word">' + words[currentWordIndex] + '</span>';
                paragraph.html(words.join(' '));
                currentWordIndex++;
                setTimeout(highlightNextWord, 410);
            }
        }

        highlightNextWord();
    }

    function unhighlightAllWords() {
        var highlightedWords = $('.highlighted-word');
        highlightedWords.replaceWith(function() {
            return $(this).text();
        });
    }
});