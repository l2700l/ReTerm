import { browserName, isBrowser } from 'react-device-detect';
import { TermApp } from '../../../interfaces/TermApp';

export const neofetch: TermApp = {
  help: {
    template: 'neofetch',
    description: 'system information tool',
  },
  execute: (_, closeApp, value) => {
    const timeZone = new Date().getTimezoneOffset()
    return closeApp(`
            %              *%             | ${value.user}@${value.name}
         %%    %%%     %%%    %%          | ––––––––––––––––––
        %%         %%%         %%         | Device type: ${isBrowser ? 'PC' : 'Mobile'}
         %        %% %%        %          | Device: ${value.device.device.vendor + ' – ' + value.device.device.model || 'unknown'}
         %%  %%%%%%%%%%%%%%%  %%          | OS: ${value.device.os.name || 'unknown'} - ${value.device.os.version || 'unknown'}
     %%%%%%   %%         %%   %%%%%%      | Browser: ${browserName}
  %%      %% %%   %%%%%   %% %%      %%   | Version: ${value.device.browser.version || 'unknown'}
 %%        %%    %%%%%%%    %*        %%  | Orientation: ${window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'}
  %%      %% %%   %%%%%   %% %%      %%   | Resolution: ${window.screen.width}x${window.screen.height}
     %%%%%%   %%         %%   %%%%%%      | Theme: ${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Dark' : 'Light'}
         %%  %%%%%%%%%%%%%%%  %%          | Language: ${window.navigator.language}
         %        %% %%        %          | Time zone: GTM${timeZone > 0 ? '-' + timeZone / -60 : '+' + timeZone / -60}
        %%         %%%         %%         | ––––––––––––––––––
         %%    %%%     %%%    %%          | Author: l2700l
            %              *%             | GitHub: github.com/l2700l
`)
  },
};
