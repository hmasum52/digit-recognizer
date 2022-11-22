tf.loadLayersModel('model/model.json').then(function (model) {
    window.model = model;
});

var predict = function (input) {
    if (window.model) {
        window.model.predict([tf.tensor(input).reshape([1, 28 * 28])]).array().then(function (scores) {
            scores = scores[0];
            predicted = scores.indexOf(Math.max(...scores));
            $('#number').html(predicted);
        });
    } else {
        // The model takes a bit to load, if we are too fast, wait
        setTimeout(function () { predict(input) }, 50);
    }
}