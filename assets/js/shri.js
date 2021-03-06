/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}


/**
 * Ваши изменения ниже
 */
 
var requests = ['/countries', '/cities', '/populations'];
var responses = {};

var userReq = window.prompt('Please, enter the name of a country or city for get total  population', 'Cameroon');

for (i = 0; i < 3; i++) {
    var request = requests[i];
    
    getData(request, 
        (function() {
            var innerRequest = request;
            
            return function (error, result) {
                // Обработка ошибок от сервера
                if (error !== null) {
                    console.log('Server error:' + error);
                    return false;
                }
                
                responses[innerRequest] = result;
                var l = [];
                for (K in responses)
                    l.push(K);
                
                if (l.length == 3) {
                    var c = [], cc = [], p = 0, 
                        userReqC = [], userReqCC = [], userReqCp = 0, userReqCCp = 0;
                        
                    for (i = 0; i < responses['/countries'].length; i++) {
                        if (responses['/countries'][i].continent === 'Africa') {
                            c.push(responses['/countries'][i].name);
                        }
                    }
                    
                    for (i = 0; i < responses['/cities'].length; i++) {
                        // Для 'Africa'
                        for (j = 0; j < c.length; j++) {
                            if (responses['/cities'][i].country === c[j]) {
                                cc.push(responses['/cities'][i].name);
                            }
                        }
                        /* Избегаем проблемы, когда название страны и города совпадает */
                        if (responses['/cities'][i].country == userReq) {
                            userReqCC.push(responses['/cities'][i].name);
                        }
                        if (responses['/cities'][i].name == userReq) {
                            userReqC.push(responses['/cities'][i].name);
                        }
                    }
                    
                    var maxLength = Math.max.apply(null, [cc.length, userReqC.length, userReqCC.length]);
                                        
                    for (i = 0; i < responses['/populations'].length; i++) {
                        // Для 'Africa'
                        for (j = 0; j < maxLength; j++) {
                            if(j in cc) {
                                if (responses['/populations'][i].name === cc[j]) {
                                    p += responses['/populations'][i].count;
                                }
                            }
                            if(j in userReqC) {
                                if (responses['/populations'][i].name === userReqC[j]) {
                                    userReqCp += responses['/populations'][i].count;
                                }
                            }
                            if(j in userReqCC) {
                                if (responses['/populations'][i].name === userReqCC[j]) {
                                    userReqCCp += responses['/populations'][i].count;
                                }
                            }
                        } // j
                    }  // i
                    
                    console.log('Total population in African cities: ' + p);
                    
                    if (userReqC.length === 0 && userReqCC.length === 0) {
                        console.log('Not found population for ' + userReq);
                    }
                    if (userReqC.length !== 0) {
                        console.log('Total population in ' + userReq + ' city: ' + userReqCp);
                    }
                    if (userReqCC.length !== 0) {
                        console.log('Total population in ' + userReq + ' country: ' + userReqCCp);
                    }
                }
            }
        })()
    ); // getData
}