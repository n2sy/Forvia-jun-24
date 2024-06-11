import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';

export class UpperandjoinPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value.tab, metadata.type);
    if (metadata.type == 'body') {
      let t = value.tab.map((element: string) => {
        // console.log(element.toUpperCase());

        return element.toUpperCase();
      });
      return t.join('**');
    }

    return value;
  }
}
