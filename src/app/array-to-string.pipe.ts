import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToStringPipe implements PipeTransform {

  transform(names) {
    var s = ""
    for (var i=0;i<names.length;i++){
      if(i != 0){
        s = s + ", ";
      }
      s = s + names[i].cast_name;
    }
    return s;
  }

}
