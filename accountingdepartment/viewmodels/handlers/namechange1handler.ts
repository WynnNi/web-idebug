import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'NameChange1'
})
export class NameChange1Handler extends CommandHandler {
  constructor(
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('nameChange', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDeptService1, 'nameChange', args, context);
    });

  }

}

