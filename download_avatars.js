var myArgs = process.argv.slice(2);
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "ericajlittle";
var GITHUB_TOKEN = "cfe99330ec5b9a846ee64b62c4385b689e5ea4b2";



function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var requestOptions = {
      url: requestURL,
      headers: {
       'User-Agent': 'Github Avatar Downloader - Student Project'
      },
    };

  // request(requestOptions, function (error, response, body){
  //   if (!error && response.statusCode == 200){
  //     var parsed = JSON.parse(body);
  //     // console.log(parsed);
  //     console.log(parsed[0]);
  //   }
  // });  //main bracket for request.get function
  request.get(requestOptions, cb);

} //function ending getRepoContributors


getRepoContributors(myArgs[0], myArgs[1], function(err, result) {

  var parsed = JSON.parse(result.body);
  parsed.forEach(function (x) {
    //console.log("Avatar URL :" + x.avatar_url+"\n");
    downloadImageByURL(x.avatar_url,x.login);

  }); //forEach loop



}); //for the GetREporContributors function

function downloadImageByURL(url, filePath) {
    if (!fs.existsSync('./avatars')){
      fs.mkdirSync('./avatars');
    }
    request.get(url)
    .on('error',function(e){
        throw e;
    // }).on('response',function(response){
    //     console.log(response.statusCode);
    })
    .pipe(fs.createWriteStream('./avatars'+'/'+filePath+".jpg"));
};


