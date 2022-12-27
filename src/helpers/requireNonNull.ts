function requireNonNull(...args: any): void {
  for (const i in args) {
    const arg = args[i];
    if (arg == null) {
      throw Error;
    }
  }
}

export default requireNonNull;
