import { Injectable } from '@angular/core';
import { CommandHandler, NgCommandHandler, CommandContext } from '@farris/devkit';
import { CardDataService as CardDataService1 } from '@farris/command-services';
import { RouterService as RouterService1 } from '@farris/command-services';

@Injectable()
@NgCommandHandler({
  commandName: 'Close1'
})
export class Close1Handler extends CommandHandler {
  constructor(
    public _CardDataService1: CardDataService1,
    public _RouterService1: RouterService1
  ) {
    super();
  }

  schedule() {

    this.addTask('cancel', (context: CommandContext) => {
      const args = [];
      return this.invoke(this._CardDataService1, 'cancel', args, context);
    });


    this.addTask('openMenu', (context: CommandContext) => {
      const args = [
        '{COMMAND~/params/url}',
        '{COMMAND~/params/params}'
      ];
      return this.invoke(this._RouterService1, 'openMenu', args, context);
    });

    this.addLink('cancel', 'openMenu', `1==1`);
  }

}

