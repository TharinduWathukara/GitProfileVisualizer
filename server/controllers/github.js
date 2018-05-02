const request = require('request');

const {githubConfig} = require ('../config');

githubFunctions = {

    //this function returns the git user details from {https://api.github.com/users/:username}
    getUser: (req,res) => {
        request.get('https://api.github.com/users/' + req.params.username + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                res.json(JSON.parse(body.body));
            }
        })
    },

    //this function returns the details about all the repositories of a paticular user from {https://api.github.com/users/:username/repos}
    getUserRepos:(req,res)=>{
        request.get('https://api.github.com/users/' + req.params.username+ '/repos' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                res.json(JSON.parse(body.body));
            }
        })
    },

    //this function analyze one's git profile and return popular repositories by watching, by stars and the size of the repos(KB)
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

    //this function returns git user's most widely used languages decending order.
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


    //this function returns only one repo details
    getRepo:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                res.json(JSON.parse(body.body));
            }
        });
    },

    //this function returns all the languages that used for a paticular repo
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

    //this function returns about the statiscs about a paticular repository such contribution by statistics, number of commits and repository statistics by month to month
    getRepoStats:(req,res)=>{
        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                data={
                    "username":req.body.username,
                    "name":req.body.name
                }
                var commits = JSON.parse(body.body);
                data.commits = commits;
                var dates = [];
                var statsTotal = [];
                // var statsAdditions = [];
                // var statsDeletions = [];

                var contributors = [];

                var contributorsByStats = [];
                var contributionsByStats = [];

                var contributorsByCommits = [];
                var contributionsByCommits = [];

                for(var i=0;i<commits.length;i++){
                    this.data = getStats(data,i);
                }

                function getStats(data,i){
                    var month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct" ,"Nov","Dec"];
                    request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits/' + commits[i].sha + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                    (err,body,response) => {
                        if(err) console.log(err);
                        else{
                            var commit = JSON.parse(body.body);

                            var d = new Date(commit.commit.author.date);
                            var date = month[d.getMonth()] + " " + d.getFullYear().toString();
                            
                            if(dates.includes(date)){
                                var index = dates.indexOf(date);
                                statsTotal[index]=statsTotal[index] + commit.stats.total;
                                // statsAdditions[index]=statsAdditions[index] + commit.stats.additions;
                                // statsDeletions[index]=statsDeletions[index] + commit.stats.deletions;
                            }
                            else{
                                dates.push(date);
                                statsTotal.push(commit.stats.total);
                                // statsAdditions.push(commit.stats.additions);
                                // statsDeletions.push(commit.stats.deletions);
                                
                            }
                            data.dates = dates;
                            data.statsTotal = statsTotal;
                            // data.statsAdditions = statsAdditions;
                            // data.statsDeletions = statsDeletions;

                            var contributor = commit.commit.author.name;
                            
                            if(!contributors.includes(contributor)){
                                contributors.push(contributor);
                            }
                            
                            if(contributorsByStats.includes(contributor)){
                                var idx = contributorsByStats.indexOf(contributor);
                                contributionsByStats[idx] = contributionsByStats[idx] + commit.stats.total;
                            }else{
                                contributorsByStats.push(contributor);
                                contributionsByStats.push(commit.stats.total);
                            }

                            if(contributorsByCommits.includes(contributor)){
                                var indx = contributorsByCommits.indexOf(contributor);
                                contributionsByCommits[indx] +=1;
                            }else{
                                contributorsByCommits.push(contributor);
                                contributionsByCommits.push(1);
                            }

                            data.contributorsByStats = contributorsByStats;
                            data.contributionsByStats = contributionsByStats;

                            data.contributorsByCommits = contributorsByCommits;
                            data.contributionsByCommits = contributionsByCommits;
                            
                            if (i == commits.length-1) {

                                let ab = sortByDate(data.dates,data.statsTotal);
                                data.dates = ab.a;
                                data.statsTotal = ab.b;
                                // data.statsAdditions = abcd.c;
                                // data.statsDeletions = abcd.d;

                                let cd = bubbleSort(data.contributorsByStats,data.contributionsByStats);
                                let ef = bubbleSort(data.contributorsByCommits,data.contributionsByCommits);

                                let newConByStats=[];
                                let newCbtionByStats=[];
                                let newConByCommits=[];
                                let newCbtionByCommits=[];

                                let loop=10;
                                if(contributors.length < loop){
                                    loop = contributors.length;
                                }

                                for(let l=0;l<loop;l++){
                                    newConByStats.push(cd.c[l]);
                                    newCbtionByStats.push(cd.d[l]);
                                    newConByCommits.push(ef.c[l]);
                                    newCbtionByCommits.push(ef.d[l]);
                                }

                                data.contributors = contributors;
                                data.contributorsByStats = newConByStats;
                                data.contributionsByStats = newCbtionByStats;
                                data.contributorsByCommits = newConByCommits;
                                data.contributionsByCommits = newCbtionByCommits;

                                res.json(data);
                            }else{
                                return data;
                            }
                        }
                    });
                }

                function sortByDate(a,b){
                    var swapped;
                    do {
                        swapped = false;
                        for (var i=0; i < a.length-1; i++) {
                            if (new Date(a[i]) > new Date(a[i+1])) {
                                var temp1 = a[i];
                                var temp2 = b[i];
                                // var temp3 = c[i];
                                // var temp4 = d[i];
                                a[i] = a[i+1];
                                b[i] = b[i+1];
                                a[i+1] = temp1;
                                b[i+1] = temp2;
                                // c[i] = c[i+1];
                                // d[i] = d[i+1];
                                // c[i+1] = temp3;
                                // d[i+1] = temp4;
                                swapped = true;
                            }
                        }
                    } while (swapped);
                    return {'a':a,'b':b}
                }

                function bubbleSort(c,d){
                    var swapped;
                    do {
                        swapped = false;
                        for (var i=0; i < d.length-1; i++) {
                            if (d[i] < d[i+1]) {
                                var temp1 = c[i];
                                var temp2 = d[i];
                                c[i] = c[i+1];
                                d[i] = d[i+1];
                                c[i+1] = temp1;
                                d[i+1] = temp2;
                                swapped = true;
                            }
                        }
                    } while (swapped);
                    return {'c':c,'d':d}
                }
            }
        });
    },

    //this function return the code quality of the user
    getCodeQuality:(req,res)=>{

        request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/contents' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        (err,body,response) => {
            if(err) console.log(err);
            else{
                var content = JSON.parse(body.body);
                // res.json(content);
                var data = {
                    files:[]
                };

                var promise = new Promise(function(resolve, reject) {
                    getFiles(content,data);
                    resolve("Stuff worked!");
                });

                promise.then(function(result) {
                    setTimeout(()=>{
                        for(var i=0;i<data.files.length;i++){
                            checkCodeQuality(data,i);                        
                        }
                    },10000);
                }, function(err) {
                    console.log("getFiles failed");
                });

                

                
                function getFiles(content,data){
                    for(var i=0;i<content.length;i++){
                        if(content[i].type == 'file' && checkFile(content[i])){
                            var file = {
                                "name":content[i].name,
                                "path":content[i].path,
                                "size":content[i].size,
                                "download_url":content[i].download_url,                                
                            }
                            data.files.push(file);

                        }else{
                            if(checkDir(content[i])){
                                request.get(content[i].url + '&client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                                (err,body,response) =>{
                                    if(err) throw err;
                                    else{
                                        var newContent = JSON.parse(body.body);
                                        return getFiles(newContent,data);
                                    }
                                });
                            }
                            
                        }
                    }
                }

                function checkCodeQuality(data,i){
                    request.get(data.files[i].download_url + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
                    (err,body,response) =>{
                        if(err) throw err;
                        else{
                            var content = (body.body);
                            linelength(data,i,content);
                            
                            
                            if (i == data.files.length-1){
                                res.json(data);
                            }else{
                                return data;
                            }
                        }
                    });
                }

                function linelength(data,i,content){
                    var contentByLines = content.split("\n");
                    var numOfLines = 0;
                    var linesMoreLength = 0;

                    for(var m=0;m<contentByLines.length;m++){
                        if(contentByLines[m]>150){
                            linesMoreLength++;
                        }
                        numOfLines++;

                        data.files[i].numOfLines = numOfLines;
                        data.files[i].linesMoreLength = linesMoreLength;
                        
                    }
                }

                function checkFile(content){
                    var list = ['.json','config','gitignore','README','conf','test','gradle','.pro',
                                '.xml','.mf','.jar','.db','.jpg','.png','.jpeg','.txt','.md','properties',
                                '.form','.ico','.woff2','.iml'];

                    for(var j=0;j<list.length;j++){
                        if(content.name.includes(list[j])){
                            return false;
                        }
                    }
                    return true;
                }

                function checkDir(content){
                    var list = ['node_modules','dist','build','test',];

                    for(var j=0;j<list.length;j++){
                        if(content.name.includes(list[j])){
                            return false;
                        }
                    }
                    return true;
                }
            }
        });
        
        // request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits' + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        // (err,body,response) => {
        //     if(err) console.log(err);
        //     else{
        //         data={
        //             "username":req.body.username,
        //             "name":req.body.name,
        //             "filenames":[],
        //             "files":[]
        //         }
        //         var commits = JSON.parse(body.body);
        //         // data.commits = commits;

        //         for(var i=0;i<commits.length;i++){
        //             if(data.username == commits[i].commit.author.name){
        //                 this.data = getCommit(data,i);
        //             }

        //             if(data.files.length > 20){
        //                 break;
        //             }
        //         }

        //         function getCommit(data,i){
        //             request.get('https://api.github.com/repos/'+req.body.username+'/' + req.body.name + '/commits/' + commits[i].sha + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        //             (err,body,response) =>{
        //                 if(err) console.log(err);
        //                 else{

        //                     var commit = JSON.parse(body.body);

        //                     for(var j=0;j<commit.files.length;j++){

        //                         if(commit.files[j].status != 'removed'){

        //                             if(!ckeckLanguageAgain(commit.files[j].filename,data.filenames)){

        //                                 if(checkLanguage(commit.files[j].filename) 
        //                                 && !commit.files[j].filename.includes('bootstrap') 
        //                                 && !commit.files[j].filename.includes('jquery')
        //                                 && !commit.files[j].filename.includes('node_modules')
        //                                 && !commit.files[j].filename.includes('.json')){

        //                                     data.filenames.push(commit.files[j].filename);

        //                                     var file = {
        //                                         filename : commit.files[j].filename,
        //                                         raw_url : commit.files[j].raw_url
        //                                     }

        //                                     data.files.push(file);
        //                                     if(data.files.length > 20){
        //                                         break;
        //                                     }
        //                                 }
        //                             }
        //                         }
                                
        //                     }


        //                     if (i == commits.length-1){
        //                         console.log('getCommit pass');
        //                         console.log(data.filenames);

        //                         for(var l=0;l<data.files.length;l++){
        //                             this.data = getFiles(data,l);
        //                         }

        //                     }else{
        //                         return data;
        //                     }
        //                 }
        //             });
        //         }
                
        //         //this function return the lines with more than 150col (this error reduce the code readability)
        //         function getFiles(data,l){
        //             request.get(data.files[l].raw_url + '?client_id=' + githubConfig.client_id + '&client_secret=' + githubConfig.client_secret, {headers: {'User-Agent':'GIT Profile Visualizer'}},
        //             (err,body,response) =>{
        //                 if(err) console.log(err);
        //                 else{
        //                     var text = JSON.parse(body.body);
        //                     var textByLine = text.split("\n");
        //                     var numOfLines = 0;
        //                     var linesMoreLength = 0;
        //                     for(var m=0;m<textByLine.length;m++){
        //                         if(textByLine[m]>150){
        //                             linesMoreLength++;
        //                         }
        //                         numOfLines++;

        //                         data.files[l].numOfLines = numOfLines;
        //                         data.files[l].linesMoreLength = linesMoreLength;
                                
        //                     }


        //                     if (l == data.files.length-1){
        //                         console.log('getFile pass');

        //                         res.json(data);
                                
        //                     }else{
        //                         return data;
        //                     }
        //                 }
        //             });
        //         }

        //         function checkLanguage(filename){
        //             let validExtensions = ['.java','.js','.php','.ts','.c','.cpp','.html','.py','.cs','.rb'];
                    
        //             for(var k=0;k<validExtensions.length;k++){
        //                 if(filename.includes(validExtensions[k])){
        //                     return true;
        //                 }
        //             }

        //             return false;
        //         }

        //         function ckeckLanguageAgain(filename,filenames){
        //             for(var k=0;k<filenames.length;k++){
        //                 if(filename.includes(filenames[k]) || filenames[k].includes(filename)){
        //                     return true;
        //                 }
        //             }
        //             return false;
        //         }
        //     }
        // });
    }


}





module.exports = githubFunctions;