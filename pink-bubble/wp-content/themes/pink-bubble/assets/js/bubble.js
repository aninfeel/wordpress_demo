document.addEventListener("DOMContentLoaded", function () {
    const $container = document.createElement('div');
    $container.id = 'bubble-container';
    document.body.appendChild($container);

    const keepNumber = 20;

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

        const $bubble = document.createElement('div');
        $bubble.className = 'bubble';
        for (let i = 0; i < 5; i++) {
            const span = document.createElement('span');
            $bubble.appendChild(span);
        }

        $container.appendChild($bubble);

        const x = Math.ceil(Math.random() * 9 + 1);

        $bubble.className +=` x${x}`;
        ++count;

        if (!startTime) {
            startTime = Date.now();
        }

        // Remove bubble after animation ends
        $bubble.addEventListener("animationend", () => {
            if (!createInterval) {
                createInterval = (Date.now() - startTime)/keepNumber;
            }

            $container.removeChild($bubble);
            --count;
        });
    }

    function createAgainAndAgain() {
        createBubble();

        requestAnimationFrame(createAgainAndAgain);
    }
    
    requestAnimationFrame(createAgainAndAgain);
});