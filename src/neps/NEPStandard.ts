type Constructor = new (...args: any[]) => {}; // eslint-disable-line

export interface ContractMethod {
  methodName: string
  callArgs: Constructor
}

export interface NEP {
  name: string,
  changeMethods?: ContractMethod[],
  viewMethods?: ContractMethod[]
}
