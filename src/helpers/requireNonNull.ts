function requireNonNull(...args: any): void {
  for (const i in args) {
    const arg = args[i];
    if (arg == undefined || arg == null) {
      throw Error;
    }
  }
}

export default requireNonNull;
