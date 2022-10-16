export function runSpim(worker, address) {
  worker.postMessage([`run ${address}`]);
}

export function setBreakpoint(worker,address) {
  worker.postMessage([`breakpoint ${address}`]);
}

export function clearRegs(worker) {
  worker.postMessage(["reinitialize"]);
}
export function assemble(worker, input) {
  worker.postMessage(['load "dummy.s"', input]);
}

export function continueRun(worker) {
  worker.postMessage(["continue"]);
}

export function step(worker, number) {
  worker.postMessage([`step ${number}`]);
}

export function printText(worker) {
  worker.postMessage(["print_text"]);
}

export function printData(worker) {
  worker.postMessage(["print_text"]);
}

export function printHEX(worker) {
  worker.postMessage(["print_all_regs hex"]);
}
export function printDEC(worker) {
  worker.postMessage(["print_all_regs dec"]);
}

export function sync(worker, checkedCB) {
  if (checkedCB) {
    printHEX(worker);
  } else {
    printDEC(worker);
  }
  printData(worker);
  printText(worker);
}

export function reload(worker, input) {
  clearRegs(worker);
  assemble(worker,input);
}
