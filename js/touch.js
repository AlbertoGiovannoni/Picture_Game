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

            var rtext = document.getElementById('rtext');

            var title = document.getElementById("title");
            var year = document.getElementById("year");
            var description = document.getElementById("description");

            var question; //serve per poter modificare la domanda fra un round ed il successivo

            randomQuest();

            randomImg();

            rendomDesc();

            $('.picture1l').on('click', function () {
                if (point == false) {
                    check(1, 1);
                    point = true;
                    opacityOn();
                    fadeInResult();
                }
            })

            $('.picture1r').on('click', function () {
                if (point == false) {
                    check(1, 2);
                    point = true;
                    opacityOn();
                    fadeInResult();
                }
            })

            $('.picture2l').on('click', function () {
                if (point == false) {
                    check(2, 1);
                    point = true;
                    opacityOn();
                    fadeInResult();
                }
            })

            $('.picture2r').on('click', function () {
                if (point == false) {
                    check(2, 2);
                    point = true;
                    opacityOn();
                    fadeInResult();
                }
            })

            $('#result').on('click', function () {
                $("#result").css("z-index", "-1");
                $("#result").css("opacity", "0");
                $('img').toggleClass("filter");
                fadeInAppear();
            })

            $('#next').on('click', function () {
                opacityOff();
                $('img').toggleClass("filter");
                point = false;
                $("#appear").css("z-index", "-1");
                $("#appear").css("opacity", "0");

                randomImg();
                randomQuest();
                rendomDesc();

                score1 = coin1.textContent; //pl1 e pl2 sono i contatori. Se uno dei due arriva a 5 la partita termina
                score2 = coin2.textContent;
                score1 = parseInt(score1);
                score2 = parseInt(score2);

                if (score1 == 1) {
                    opacityOn();
                    winner1();
                }
                else if (score2 == 1) {
                    opacityOn();
                    winner2();
                }
            })

            $('#newGame').click(function () {
                score1 = 0;
                score2 = 0;
                coin1.textContent = "0";
                coin2.textContent = "0";
                opacityOff();
                $("#end").css("z-index", "-1");
            })

            function randomImg() {
                if (score1 != 1 && score2 != 1) {
                    i = Math.round(Math.random() * 5);
                    j = Math.round(Math.random() * 5);
                    k = Math.round(Math.random());
                    while (j == i) {
                        j = Math.round(Math.random() * 5);
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
                }
            }

            function check(planswer, player) {   // funzione che attribuisce il punto dopo aver controllato la risposta
                if (planswer == correct) {
                    if (player == 1) {
                        score1++;
                        coin1.innerHTML = score1;
                        rtext.innerHTML = "CORRETTO"
                        $("#result").css("background-color", "green")
                    }
                    else {
                        score2++;
                        coin2.innerHTML = score2;
                        rtext.innerHTML = "CORRETTO"
                        $("#result").css("background-color", "green")

                    }
                }
                else {
                    if (player == 1) {
                        score2++;
                        coin2.innerHTML = score2;
                        rtext.innerHTML = "ERRATO"
                        $("#result").css("background-color", "red")
                    }
                    else {
                        score1++;
                        coin1.innerHTML = score1;
                        rtext.innerHTML = "ERRATO"
                        $("#result").css("background-color", "red")
                    }
                }
            }

            function fadeInAppear() {
                $("#appear").css("z-index", "1");
                $("#appear").fadeTo("normal", 1)
            }

            function fadeInResult() {
                $("#result").css("z-index", "1");
                $("#result").fadeTo("fast", 1)
            }

            function opacityOn() {
                $("#top").css("opacity", "0.4");
                $("#question").css("opacity", "0.4");
                $("#right").css("opacity", "0.4");
                $("#left").css("opacity", "0.4");
                $("#vbar").css("opacity", "0");
            }

            function opacityOff() {
                $("#top").css("opacity", "1");
                $("#question").css("opacity", "1");
                $("#right").css("opacity", "1");
                $("#left").css("opacity", "1");
                $("#vbar").css("opacity", "1");
            }

            function randomQuest() {
                if (score1 != 1 && score2 != 1) {
                    question = document.getElementById("text"); //serve per poter modificare la domanda fra un round ed il successivo
                    question.innerHTML = info[i].question;
                }
            }

            function rendomDesc() {
                if (score1 != 1 && score2 != 1) {
                    title.innerHTML = info[i].title;
                    year.innerHTML += info[i].year;
                    description.innerHTML = info[i].description;
                }
            }

            function winner1() {
                $("#end").css("z-index", "2");
                var winner = document.getElementById("winner");
                winner.innerHTML = "VINCE IL GIOCATORE 1";
            }

            function winner2() {
                $("#end").css("z-index", "2");
                var winner = document.getElementById("winner");
                winner.innerHTML = "VINCE IL GIOCATORE 2";
            }

        }

    );

};
