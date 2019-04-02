import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'EnableAccDept1'
})
export class EnableAccDept1Handler extends CommandHandler {
  constructor(
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('enableDepartment', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/accOrg}',
        '{UISTATE~/root-component/year}',
        '{COMMAND~/params/accDept}',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'enableDepartment', args, context);
    });


    this.addTask('updateEdit', (context: CommandContext) => {
      const args = [
        '{DATA~/tree-grid-component/id}',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'updateEdit', args, context);
    });

    this.addLink('enableDepartment', 'updateEdit', `1==1`);
  }

}

