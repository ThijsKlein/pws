const citationSources = document.querySelectorAll('.citationSource');

citationSources.forEach(citationSource => {
    let embedTimer;
    let sourceContainer;


    console.log('test')

    citationSource.addEventListener('mouseover', function() {
        var sourceId = this.getAttribute('data-source-id');

        console.log('test')

        if (!sourceContainer) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/bibliography/getSource.php?sId=${sourceId}`, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);

                    var sourcePlaceholder = document.querySelector(`span.citationSource[data-source-id="${sourceId}"]`);
                    sourceContainer = document.createElement('div');
                    sourceContainer.className = 'sourceEmbed';
                    sourcePlaceholder.appendChild(sourceContainer);

                    sourceContainer.style.display = 'block';
                    sourceContainer.innerHTML = response.message;

                    sourceContainer.addEventListener('mouseover', function() {
                        clearTimeout(embedTimer);
                    });

                    sourceContainer.addEventListener('mouseout', function() {
                        embedTimer = setTimeout(function() {
                            sourceContainer.remove();
                            sourceContainer = null;
                        }, 2000);
                    });
                }
            };
            xhr.send();
        }
    });

    citationSource.addEventListener('mouseout', function(event) {
        var sourceId = this.getAttribute('data-source-id');

        if (sourceContainer) {
            // Check if the mouse is over the embed
            if (!isMouseOverElement(event, sourceContainer)) {
                embedTimer = setTimeout(function() {
                    sourceContainer.remove();
                    sourceContainer = null;
                }, 500);
            }
        }
    });
});

function isMouseOverElement(event, element) {
    const rect = element.getBoundingClientRect();
    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}

var divSelector = document.querySelector('.sourceContainer');

if (divSelector) {

    var loader = document.createElement('div');
    loader.classList.add('loader');


    divSelector.appendChild(loader)

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://pws.vqnderklein.nl/api/latest/bibliography/read.php`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {

            setTimeout(function() {
                var response = JSON.parse(xhr.responseText);
                var amountOfSources = response.message.length;

                for (let i = 0; i < amountOfSources; i++) {
                    divSelector.innerHTML += response.message[i];
                }

                document.querySelector('.loader').remove();
                var selector = document.querySelectorAll('.sourceWrapper');

                var count = 0;
                selector.forEach(div => {
                    div.style.animationDelay = `${count * 100}ms`;
                    count++;
                });
            }, (Math.floor(Math.random() * 4000) + 1000));
        }
    };
    xhr.send();
}