$(document).ready(function() {
    const options = {
        includeScore: true,
        keys: [
            'question', 
            'answer',
            { name: 'tags', weight: 0.5 }
        ]
    };
    const fuse = new Fuse(faqData, options);
    // Collecter tous les tags uniques
    let allTags = [];
    faqData.forEach(faq => {
        if (faq.tags) {
            allTags = [...allTags, ...faq.tags];
        }
    });
    allTags = [...new Set(allTags)]; // Filtrer les doublons

    // Générer HTML pour les tags
    const tagsContainer = $('<div id="tagsContainer" class="tags-container"></div>');
    allTags.forEach(tag => {
        const tagSpan = $(`<span class="label label-main pointer-svg" data-tag="${tag}" onclick="filterByTag('${tag}')">${tag}</span> `);
        tagsContainer.append(tagSpan);
    });

    // Ajouter les tags en dessous de la barre de recherche
    $('#searchInput').after(tagsContainer);

    function displayFAQs(faqs) {
        const accordion = $('#faqAccordion');
        accordion.empty();

        faqs.forEach((faq, index) => {
            let tagsHtml = '';
            if (faq.item.tags && faq.item.tags.length > 0) {
                faq.item.tags.forEach(tag => {
                    tagsHtml += `<span class="label label-main pointer-svg" data-tag="${tag}" onclick="window.filterByTag('${tag}')">${tag}</span> `;
                });
            }

            const panel = `
                <div role="button" class="panel btn btn-block btn-default" data-toggle="collapse" data-parent="#faqAccordion" href="#collapse${index}">${faq.item.question}</div>
                <div id="collapse${index}" class="panel-collapse collapse white-background">
                    <div class="panel-body">
                        ${faq.item.answer}
                        <div class="faq-tags">${tagsHtml}</div>
                    </div>
                </div>
            `;
            accordion.append(panel);
        });
    }

    displayFAQs(faqData.map((item, index) => ({ item: item, score: 1, refIndex: index })));

    window.filterByTag = function(tag) {
        // Masquer tous les tags sauf celui sélectionné
        $('#tagsContainer .label').each(function() {
            if ($(this).data('tag') !== tag) {
                $(this).addClass('opacity-05');
            } else {
                $(this).removeClass('opacity-05');
            }
        });

        const result = fuse.search(tag);
        displayFAQs(result);
    };

    $('#searchInput').on('keyup', function() {
        const searchTerm = $(this).val();
        if (searchTerm.length > 0) {
            const result = fuse.search(searchTerm);
            displayFAQs(result);
        } else {
            displayFAQs(faqData.map((item, index) => ({ item: item, score: 1, refIndex: index })));
        }
        // Réinitialiser la visibilité de tous les tags lors d'une nouvelle recherche ou réinitialisation
        $('#tagsContainer .label').removeClass('opacity-05');
    });
    function displayLimitedFAQs(faqs) {
        const accordion = $('#limitedFAQ'); // Cibler le conteneur #limitedFAQ
        accordion.empty(); // Nettoyer l'accordéon avant d'ajouter des éléments
    
        // Limiter l'affichage aux 5 premières FAQs
        faqs.slice(0, 5).forEach((faq, index) => {
            let tagsHtml = '';
            if (faq.item.tags && faq.item.tags.length > 0) {
                faq.item.tags.forEach(tag => {
                    tagsHtml += `<span class="label label-main pointer-svg" onclick="window.filterByTag('${tag}')">${tag}</span> `;
                });
            }
    
            const panel = `
                <div role="button" class="panel btn btn-block btn-default" data-toggle="collapse" data-parent="#limitedFAQ" href="#collapseLimited${index}">${faq.item.question}</div>
                <div id="collapseLimited${index}" class="panel-collapse collapse">
                    <div class="panel-body">
                        ${faq.item.answer}
                        <div class="faq-tags">${tagsHtml}</div>
                    </div>
                </div>
            `;
            accordion.append(panel);
        });
    }
    $(document).ready(function() {
        // Votre code existant ici...
    
        // Appeler displayLimitedFAQs pour afficher les 5 premières FAQs
        displayLimitedFAQs(faqData.map((item, index) => ({ item: item, score: 1, refIndex: index })));
    });
    
});
