import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class UpperandjoinPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value.tab, metadata.type);
    if (metadata.type == 'query') {
      let t = value.tab.map((element: string) => {
        // console.log(element.toUpperCase());

        return element.toUpperCase();
      });
      console.log(t.join('**'));
    }

    return value;
  }
}
