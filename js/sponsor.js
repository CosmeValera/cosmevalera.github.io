// Copy buttons on the sponsor page: <button data-copy="text" data-copied-label="Copied!">
function selectText(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

// Unblurs everything inside the element's [data-reveal-scope] (QR and address together)
function reveal(element) {
    const scope = element.closest('[data-reveal-scope]');
    if (scope) scope.classList.add('is-revealed');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-reveal-scope] .reveal-btn').forEach((button) => {
        button.addEventListener('click', () => reveal(button));
    });

    document.querySelectorAll('[data-copy]').forEach((button) => {
        const label = button.querySelector('span');
        const originalLabel = label ? label.textContent : '';
        let resetTimer;

        button.addEventListener('click', async () => {
            // Copying also reveals what was copied
            reveal(button);

            try {
                await navigator.clipboard.writeText(button.dataset.copy);
            } catch {
                // Clipboard API unavailable (e.g. plain http): select the text so it can be copied by hand
                const code = button.parentElement.querySelector('code');
                if (code) selectText(code);
                return;
            }

            button.classList.add('is-copied');
            if (label) label.textContent = button.dataset.copiedLabel;
            clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                button.classList.remove('is-copied');
                if (label) label.textContent = originalLabel;
            }, 2000);
        });
    });
});
