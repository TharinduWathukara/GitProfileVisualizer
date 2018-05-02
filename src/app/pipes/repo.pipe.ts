import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repo'
})
export class RepoPipe implements PipeTransform {

  transform(repos: any[], repository_name: string): any []{
    if(!repos) return [];
    if(!repository_name) return repos;
    
    repository_name = repository_name.toLowerCase();
    return repos.filter( repo => {
          return (repo.name).toLowerCase().includes(repository_name);
    });
  }

}