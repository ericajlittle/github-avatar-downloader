var myArgs = process.argv.slice(2);
var request = require('request');
var fs = require('fs');


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


  request.get(requestOptions, cb);

}

// function complete(args){
//   if (args.length < 2 ){
//     console.log('Please specify.')
//   } else {
    console.log('Welcome to the GitHub Avatar Downloader!');
    getRepoContributors('jquery', 'jquery', function(err, result) {
      var parsed = JSON.parse(result.body);
      parsed.forEach(function (x) {
    //console.log("Avatar URL :" + x.avatar_url+"\n");
      downloadImageByURL(x.avatar_url,x.login);
      });
    });
//   }
// }
function downloadImageByURL(url, filePath) {
    if (!fs.existsSync('./avatars')){
      fs.mkdirSync('./avatars');
    }
    request.get(url)
    .on('error',function(e){
        throw e;
    })
    .pipe(fs.createWriteStream('./avatars'+'/'+filePath+".jpg"));
};
// complete(myArgs);

