(function ($) {
    const $container = $('<div id="bubble-container" />').appendTo('body');

    const keepNumber = 10;

    let count = 0;
    let startTime = 0;
    let createInterval = 0;
    let lastCreated = 0;
    function createBubble() {
        const now = Date.now();
        if (createInterval) {
            if (now - lastCreated < createInterval) {
                return;
            }
        } else {
            if (now - lastCreated < 2000) {
                return;
            }
        }
 

        lastCreated = now;
        if (count > keepNumber) {
            return;
        }

        const $bubble = $('<div class="bubble" ><span></span><span></span><span></span><span></span><span></span></div>');
        $container.append($bubble);

        const x = Math.ceil(Math.random() * 9 + 1);

        $bubble.addClass(`x${x}`);
        ++count;

        if (!startTime) {
            startTime = Date.now();
        }

        // Remove bubble after animation ends
        $bubble.on('animationend', () => {
            if (!createInterval) {
                createInterval = (Date.now() - startTime)/keepNumber;
            }

            $bubble.remove();
            --count;
        });
    }

    function createAgainAndAgain() {
        createBubble();

        requestAnimationFrame(createAgainAndAgain);
    }
    
    requestAnimationFrame(createAgainAndAgain);
})(jQuery);