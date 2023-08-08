import React, { useEffect, useRef, useState } from 'react';
import styles from './Sl.module.scss';
import { TermAppComponent } from '../../../interfaces/TermApp';
const trainSmokes = [
`                       (@@) (  ) (@)  ( )  @@    ()    @     O     @
                  (   )
          (@@@@)
      (    )

    (@@@)
`,
`                       (@@) (  ) (@)  ( )  @@    ()    @     O     @
                  (   )
          (@@@@)
      (    )

    (@@@)
`,
`                       (@@) (  ) (@)  ( )  @@    ()    @     O     @
                  (   )
          (@@@@)
      (    )

    (@@@)
`,
`                       (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
                  (@@@)
          (    )
      (@@@@)
  
    (   )
`,
`                       (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
                  (@@@)
          (    )
      (@@@@)
  
    (   )
`,
`                       (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
                  (@@@)
          (    )
      (@@@@)
  
    (   )
`
]

const trainLocomotive = `
    ====        ________                ___________
_D _|  |_______/        \\__I_I_____===__|_________|
 |(_)---  |   H\\________/ |   |        =|___ ___|      _________________
 /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A
|      |  |   H  |__--------------------| [___] |   =|                        |
| ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
|/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
`;

const trainWheels = [
  `__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
  `__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
  `__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
  `__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
  `__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=   O=====O=====O=====O|_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
  `__/ =| o |=-O=====O=====O=====O \\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
];
let wheelIndex = 0;
let smokeIndex = 0;

const Sl: React.FC<TermAppComponent> = ({closeApp}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const [train, setTrain] = useState(trainSmokes[smokeIndex] + trainLocomotive + trainWheels[wheelIndex]);
  const [left, setLeft] = useState(0)
  useEffect(() => {
    setLeft(divRef?.current?.clientWidth || 0)
    const interval = setInterval(() => {
      if (wheelIndex < trainWheels.length - 1) wheelIndex++;
      else wheelIndex = 0;
      if (smokeIndex < trainSmokes.length - 1) smokeIndex++;
      else smokeIndex = 0;
      setLeft(prevState => {
        const newState = prevState - 10
        if (newState <= ((pRef?.current?.clientWidth || 0)*-1)-10) {
          clearInterval(interval);
          closeApp();
        }
        return newState
      })
      setTrain(trainSmokes[smokeIndex] + trainLocomotive + trainWheels[wheelIndex]);
    }, 50);
    return () => {
      clearInterval(interval)
    };
  }, []);
  return (
    <div ref={divRef} className={styles.sl}>
      <p ref={pRef} className={styles.sl__train} style={{ left: left}}>{train}</p>
    </div>
  );
};

export default Sl;
