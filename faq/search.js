$(document).ready(function() {
    const options = {
        includeScore: true,
        // Spécifiez les clés à inclure dans la recherche
        keys: ['question', 'answer']
    };
    const fuse = new Fuse(faqData, options);

    // Fonction pour afficher toutes les questions
    function displayFAQs(faqs) {
        const accordion = $('#faqAccordion');
        accordion.empty(); // Nettoie l'accordéon avant d'ajouter des éléments

        faqs.forEach((faq, index) => {
            const panel = `
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-parent="#faqAccordion" href="#collapse${index}">${faq.item.question}</a>
                        </h4>
                    </div>
                    <div id="collapse${index}" class="panel-collapse collapse">
                        <div class="panel-body">${faq.item.answer}</div>
                    </div>
                </div>
            `;
            accordion.append(panel);
        });
    }

    // Affiche toutes les FAQs par défaut
    displayFAQs(faqData.map((item, index) => ({ item, score: 1, refIndex: index })));

    // Gestion de la recherche
    $('#searchInput').on('keyup', function() {
        const searchTerm = $(this).val();
        if (searchTerm.length > 0) {
            const result = fuse.search(searchTerm);
            displayFAQs(result);
        } else {
            // Si le champ de recherche est vide, affichez toutes les FAQs
            displayFAQs(faqData.map((item, index) => ({ item, score: 1, refIndex: index })));
        }
    });
    // Exemple de réinitialisation manuelle (non recommandé comme première approche)
    $('#faqAccordion .panel-heading a').click(function(e) {
        var jqEl = $(this);
        if (!jqEl.hasClass('collapsed')) {
            jqEl.closest('.panel').find('.panel-collapse').collapse('show');
        }
    });
});
