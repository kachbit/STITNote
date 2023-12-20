function stitparse(tabString) {
    // Remove single line comments
  const lines1 = tabString.split('\n').map(line => line.replace(/\/\/.*/, ''));
  // Join lines after removing single line comments
  const stringWithoutSingleLineComments = lines1.join('\n');
  // Remove inline comments
  const stringWithoutComments = stringWithoutSingleLineComments.replace(/\/\/.*/g, '');
  const cleanedString= stringWithoutComments;
  const lines = cleanedString.split('\n').filter(line => line.trim() !== ''); // Filter out empty lines
  const root = {};
  const stack = [{ level: -1, node: root }];
  lines.forEach(line => {
    const lineLevel = line.search(/\S/);
    const nodeName = line.trim().replace(/"/g, '\"'); // Escape double quotes
    while (lineLevel <= stack[stack.length - 1].level) {
      stack.pop();
    }
    if (lineLevel > stack[stack.length - 1].level) {
      const newNode = { [nodeName]: null };
      stack[stack.length - 1].node[nodeName] = newNode[nodeName] = {};
      stack.push({ level: lineLevel, node: newNode[nodeName] });
    }
  });
  return JSON.stringify(root, null, 2);
}
