import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'CancelAccDept1'
})
export class CancelAccDept1Handler extends CommandHandler {
  constructor(
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('cancelAccDept', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccDeptService1, 'cancelAccDept', args, context);
    });

  }

}

