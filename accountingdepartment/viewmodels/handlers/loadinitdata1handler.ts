import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccDeptService as AccDeptService1 } from '../../services/accountingdepartment_frm_accountingdepartment';

@Injectable()
@NgCommandHandler({
  commandName: 'LoadInitData1'
})
export class LoadInitData1Handler extends CommandHandler {
  constructor(
    public _AccDeptService1: AccDeptService1
  ) {
    super();
  }

  schedule() {

    this.addTask('getAllDepartment', (context: CommandContext) => {
      const args = [
        '{UISTATE~/root-component/accOrg}',
        '{UISTATE~/root-component/year}',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'getAllDepartment', args, context);
    });


    this.addTask('updateEdit', (context: CommandContext) => {
      const args = [
        '',
        ''
      ];
      return this.invoke(this._AccDeptService1, 'updateEdit', args, context);
    });

    this.addLink('getAllDepartment', 'updateEdit', `1==1`);
  }

}

