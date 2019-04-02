import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'AddChildAccDept1'
})
export class AddChildAccDept1Handler extends CommandHandler {
  constructor(
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('addChildAccDept', (context: CommandContext) => {
      const args = [
        '{DATA~/tree-grid-component/id}',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'addChildAccDept', args, context);
    });

  }

}

