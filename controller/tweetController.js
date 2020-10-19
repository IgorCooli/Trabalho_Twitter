let exibirTweets = () => {

    let cards = '</br></br>'

    let hastag = document.getElementById('hashtagId').value

    $.ajax({
        url: `http://localhost:3000/tweets/${hastag}`,
        dataType: 'json',
        type: 'get',
        cache: false,
        success: function (dado, textStatus, jQxhr) {
            dado.forEach(element => {
                
                let uriTweet = `https://twitter.com/${element.userId}/status/${element.tweetId}`


                let card = `
                </br>
                <div class="container" id="tweets">
                    <div class="card col-md-12">
                        <div class="row no-gutters">
                            <div class="container col-md-2 d-flex justify-content-center align-items-center"  style="border-right: solid;">
                                <div>
                                    <img src="${element.photo}" class="card-img" style="width:90px;height:90px;">
                                </div>    
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h3 class="card-title">${element.name}</h3>
                                    <h5 class="card-text">${element.content}</h5>
                                    <p class="card-text"><small class="text-muted">Local: ${element.location}</small></p>
                                    <p class="card-text"><small class="text-muted">${element.date}</small></p>
                                    <button class="btn btn-primary col-md-2" onclick="window.open('${uriTweet}', '_blank');">Ir para...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                
                cards = cards + card

                console.log(element)
            });

            document.getElementById('tweets').innerHTML = cards

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log("errorThrown");
        }
    });
}