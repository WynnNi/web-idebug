import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { BindingDataService as BindingDataService1 } from '@farris/command-services';
import { CardDataService as CardDataService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'LoadCard1'
})
export class LoadCard1Handler extends CommandHandler {
  constructor(
    public _BindingDataService1: BindingDataService1,
    public _CardDataService1: CardDataService1
  ) {
    super();
  }

  schedule() {

    this.addTask('setCurrentId', (context: CommandContext) => {
      const args = [
        '{DATA~/tree-grid-component/id}',
        'detail-form-component'
      ];
      return this.invoke(this._BindingDataService1, 'setCurrentId', args, context);
    });


    this.addTask('update', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._CardDataService1, 'update', args, context);
    });

    this.addLink('setCurrentId', 'update', `1==1`);
  }

}

