import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'EnableAccOrg1'
})
export class EnableAccOrg1Handler extends CommandHandler {
  constructor(
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('enableOrg', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/id}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'enableOrg', args, context);
    });


    this.addTask('updateEdit', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/id}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'updateEdit', args, context);
    });

    this.addLink('enableOrg', 'updateEdit', `1==1`);
  }

}

