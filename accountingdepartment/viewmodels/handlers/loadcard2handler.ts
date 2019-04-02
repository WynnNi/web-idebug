import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { BindingDataService as BindingDataService1 } from '@farris/command-services';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'LoadCard2'
})
export class LoadCard2Handler extends CommandHandler {
  constructor(
    public _BindingDataService1: BindingDataService1,
    public _CardDataService1: CardDataService1,
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('setCurrentId', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/id}',
        '{COMMAND~/params/frameID}'
      ];
      return this.invoke(this._BindingDataService1, 'setCurrentId', args, context);
    });


    this.addTask('update', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._CardDataService1, 'update', args, context);
    });


    this.addTask('updateEdit', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/id}',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'updateEdit', args, context);
    });

    this.addLink('setCurrentId', 'update', `1==1`);
    this.addLink('update', 'updateEdit', `1==1`);
  }

}

