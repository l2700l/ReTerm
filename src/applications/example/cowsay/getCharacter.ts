export const getCharacter = (character: string = 'cow'): string => {
  switch (character) {
    case 'cow':
      return `        \\
         \\
           ^__^
           (oo)\\_______
           (__)\\       )\\/\\
               ||----w |
               ||     ||`;
    case 'fox':
      return ` \\
  \\
   \\
    |\\_/|,,_____,~~\`
    (.".)~~     )\`~}}
     \\o/\\ /---~\\\\ ~}}
       _//    _// ~}`;
    case 'tux':
      return `     \\
      \\
       \\
        .--.
       |o_o |
       |:_/ |
      //   \\ \\
     (|     | )
    /'\\_   _/\`\\
    \\___)=(___/`;
  }
  return '';
};
