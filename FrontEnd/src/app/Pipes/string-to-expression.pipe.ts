import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToExpression'
})
export class StringToExpressionPipe implements PipeTransform {

  transform(expression: string, ...args: any[]): any {
    const fn = new Function(...Object.keys(args), `return (${expression})`) as (...args: any[]) => any;
    return fn(...args);
  }
}
