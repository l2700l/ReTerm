export const getArgs = (command: string) => {
  const argsArray = command.split(' ').slice(1);
  return { argsArray, argsString: argsArray.join(' ') };
};
