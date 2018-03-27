const request = require('request');

const {githubConfig} = require ('../config');

githubFunctions = {
    getUser: (req,res) => {
        request.get('https://api.github.com/users/' + req.params.username + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                res.json(JSON.parse(body.body));
            }
        })
    },

    getUserRepos:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                res.json(JSON.parse(body.body));
            }
        })
    },

    getReposDetails:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var repos = JSON.parse(body.body);
                var repo = [];
                var popularByWatching = [];
                var popularByStars = [];
                var sizeOfRepo = [];

                for(var i=0; i<repos.length;i++){
                    repo.push(repos[i].name);
                    popularByWatching.push(repos[i].watchers_count);
                    popularByStars.push(repos[i].stargazers_count);
                    sizeOfRepo.push(repos[i].size);
                }

                var loop=10;
                if(repos.length<=10){
                    loop=repos.length
                }
                var repoWatching = [];
                var newPopularByWatching = [];
                for(var j=0;j<loop;j++){
                    var idx = popularByWatching.indexOf(Math.max.apply(null,popularByWatching));
                    repoWatching.push(repo[idx]);
                    newPopularByWatching.push(popularByWatching[idx]);
                    popularByWatching[idx]=-1;
                }
                var repoStars = [];
                var newPopularByStars = [];
                for(var j=0;j<loop;j++){
                    var idx = popularByStars.indexOf(Math.max.apply(null,popularByStars));
                    repoStars.push(repo[idx]);
                    newPopularByStars.push(popularByStars[idx]);
                    popularByStars[idx]=-1;
                }
                var repoSize = [];
                var newSizeOfRepo = [];
                for(var j=0;j<loop;j++){
                    var idx = sizeOfRepo.indexOf(Math.max.apply(null,sizeOfRepo));
                    repoSize.push(repo[idx]);
                    newSizeOfRepo.push(sizeOfRepo[idx]);
                    sizeOfRepo[idx]=-1;
                }

                var data={
                    'repoWatching':repoWatching,
                    'popularByWatching':newPopularByWatching,
                    'repoStars':repoStars,
                    'popularByStars':newPopularByStars,
                    'repoSize':repoSize,
                    'sizeOfRepo':newSizeOfRepo
                }
                res.json(data);
            }
        })
    },

    getPopularLanguages:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var repos = JSON.parse(body.body);
                var languages = [];
                var count = [];

                for(var i=0;i<repos.length;i++){
                    var lan = repos[i].language;
                    if(languages.includes(lan)){
                        var index = languages.indexOf(lan);
                        count[index]=count[index]+1;
                    }
                    else{
                        languages.push(lan);
                        count.push(1);
                    }
                }
                var loop=10;
                if(languages.length<=10){
                    loop=languages.length
                }
                var newLanguages = [];
                var newcount = [];
                for(var j=0;j<loop;j++){
                    var idx = count.indexOf(Math.max.apply(null,count));
                    newLanguages.push(languages[idx]);
                    newcount.push(count[idx]);
                    count[idx]=-1;

                }

                var data={
                    'languages':newLanguages,
                    'count':newcount
                }
                res.json(data);

                // for(var i=0; i<repos.length;i++){
                //     request.get(repos[i].languages_url + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                //     (err1,body1,response1) => {
                //         if(err1) console.log(err1);
                //         else{
                //             var lang = JSON.parse(body1.body);
                //             for (var key in lang){
                //                 if(languages.includes(key)){
                //                     var index = languages.indexOf(key);
                //                     count[index]=count[index]+1;
                //                 }
                //                 else{
                //                     languages.push(key);
                //                     count.push(1);
                //                 }
                //             }
                //         }
                //     })
                // }
                // var data={
                //     'languages':languages,
                //     'count':count
                // }
                // res.json(data);
            }
        })
    },

    getRepo:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                res.json(JSON.parse(body.body));
            }
        });
    },

    getRepoLanguages:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/languages' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var lang = JSON.parse(body.body);
                var languages = [];

                for (var key in lang){
                    languages.push(key);
                }
                data={
                    "languages":languages
                }
                res.json(data);
            }
        });
    },

    getRepoStats:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                data={
                    "username":req.body.username,
                    "body":req.body.name
                }
                var commits = JSON.parse(body.body);
                data.commits = commits;
                var dates = [];
                var stats = [];
                for(var i=0;i<commits.length;i++){
                    var d = this.getStats(data);
                    console.log(d);
                }
            }
        });
    }


}


var getStats = function(data){
    var commits = data.commits;
    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Nov","Dec"];
    request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits' +'/'+ commits[i].sha + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
    (err,body,response) => {
        if(err) console.log(err);
        else{
            var commit = JSON.parse(body.body);
            var d = new Date(commit.commit.author.date);
            var date = month[d.getMonth()-1] +" "+ d.getDate().toString();
            dates.push(date);
            stats.push(commit.stats.total);
            if(i==commits.length){
                var d={
                    "dates":dates,
                    "stats":stats
                }
                return d;
            }
        }
    });
}


module.exports = githubFunctions;