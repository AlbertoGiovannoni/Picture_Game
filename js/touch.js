//inizializzo variabili
let requestURL = 'js/details.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function () {
    const info = request.response;
    console.log(info);



    document.addEventListener(
        'DOMContentLoaded',
        function () {
            console.log('DOMContentLoaded');

            var i = Math.round(Math.random() * 5);
            var j = Math.round(Math.random() * 5);
            var k = Math.round(Math.random());
            var correct; // correct mi serve per tenere traccia della risposta corretta
            var point = false; // serve per assicurare che in ogni round venga assegnato un solo punto

            var coin1 = document.getElementById('s1');
            var coin2 = document.getElementById('s2');
            var score1 = coin1.textContent; //pl1 e pl2 sono i contatori. Se uno dei due arriva a 5 la partita termina
            var score2 = coin2.textContent;
            score1 = parseInt(score1);
            score2 = parseInt(score2);

            var question = document.getElementById("text"); //serve per poter modificare la domanda fra un round ed il successivo
            question.innerHTML = info[i].question;

            while (j == i) {  //impedisce che i sia uguale a j
                var j = Math.round(Math.random() * 5);
            };

            if (k == 0) {
                $('.picture1l').attr('src', 'img/img' + i + '.jpg');  // questo serve a non mettere sempre la risposta corretta in prima posizione
                $('.picture1r').attr('src', 'img/img' + i + '.jpg');
                $('.picture2l').attr('src', 'img/img' + j + '.jpg');
                $('.picture2r').attr('src', 'img/img' + j + '.jpg');
                correct = 1;
            }
            else {
                $('.picture1l').attr('src', 'img/img' + j + '.jpg');
                $('.picture1r').attr('src', 'img/img' + j + '.jpg');
                $('.picture2l').attr('src', 'img/img' + i + '.jpg');
                $('.picture2r').attr('src', 'img/img' + i + '.jpg');
                correct = 2;
            }

            $('.picture1l').on('click', function () {
                if (point == false) {
                    check(1, 1);
                    point = true;
                }
            })

            $('.picture1r').on('click', function () {
                if (point == false) {
                    check(1, 2);
                    point = true;
                }
            })

            $('.picture2l').on('click', function () {
                if (point == false) {
                    check(2, 1);
                    point = true;
                }
            })

            $('.picture2r').on('click', function () {
                if (point == false) {
                    check(2, 2);
                    point = true;
                }
            })

            function check(planswer, player) {   // funzione che attribuisce il punto dopo aver controllato la risposta
                if (planswer == correct) {
                    if (player == 1) {
                        score1++;
                        coin1.innerHTML = score1;
                    }
                    else {
                        score2++;
                        coin2.innerHTML = score2;
                    }
                }
                else {
                    if (player == 1) {
                        score2++;
                        coin2.innerHTML = score2;
                    }
                    else {
                        score1++;
                        coin1.innerHTML = score1;
                    }
                }
            }

            function sleep(s) {
                var now = new Date().getTime();
                while (new Date().getTime() < now + (s * 1000)) { // non faccio niente 
                }
            }


            // $('.picture1l').on('click', function () {
            //     $('.picture1l').attr('src', 'img/img' + 5 + '.jpg');
            // })

            // page = document.getElementsByTagName('body')[0];  serve a mettere s schermo intero ma devo riaggiustare i box

            // page.width = window.innerWidth;
            // page.height = window.innerHeight;
        }

    );


};
