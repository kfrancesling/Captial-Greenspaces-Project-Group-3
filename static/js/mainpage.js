document.addEventListener("DOMContentLoaded", function() {
    // Toggle tooltips
    const buttons = document.querySelectorAll('.info-button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const tooltip = this.nextElementSibling;
            tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Modal handling for the first imagea
    const img = document.getElementById("enlarge-image");
    const modalImg = document.getElementById("img01");
    const span = document.getElementsByClassName("close")[0];

    // Show modal and set image source
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
    };

    // Close modal on close button click
    span.onclick = function() {
        modal.style.display = "none";
    };

    // Close modal when clicking outside the content
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
