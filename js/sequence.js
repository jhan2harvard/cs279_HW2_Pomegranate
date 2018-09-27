function getSequence() {
  const seq = [];
  for (let i = 0; i < 63; i += 1) {
    const menu = randint(3);
    const item = randint(16);
    seq.push([menu, item]);
  }
  return seq;
}
