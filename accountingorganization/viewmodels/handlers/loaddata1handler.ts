import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { TreeDataService as TreeDataService1 } from '@farris/command-services';
import { AccOrgService as AccOrgService1 } from '../../services/accountingorganization_frm_accountingorganization';

@Injectable()
@NgCommandHandler({
  commandName: 'LoadData1'
})
export class LoadData1Handler extends CommandHandler {
  constructor(
    public _TreeDataService1: TreeDataService1,
    public _AccOrgService1: AccOrgService1
  ) {
    super();
  }

  schedule() {

    this.addTask('initData', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccOrgService1, 'initData', args, context);
    });


    this.addTask('load', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._TreeDataService1, 'load', args, context);
    });


    this.addTask('updateEdit', (context: CommandContext) => {
      const args = [
        '{DATA~/tree-grid-component/id}',
        ''
      ];
      return this.invoke(this._AccOrgService1, 'updateEdit', args, context);
    });


    this.addTask('updateMainLedgerName', (context: CommandContext) => {
      const args = [
        ''
      ];
      return this.invoke(this._AccOrgService1, 'updateMainLedgerName', args, context);
    });

    this.addLink('initData', 'load', `1==1`);
    this.addLink('load', 'updateEdit', `1==1`);
    this.addLink('updateEdit', 'updateMainLedgerName', `1==1`);
  }

}

