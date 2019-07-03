const xMin = -4;
const xMax = 6;
const yMin = -4;
const yMax = 6;
let runValue = 1.0;
let slopeValue = 1.0;
const board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [xMin, yMax, xMax, yMin], axis: true
});
function f(x) {
    const run = runValue;
    const pos = x >= 0;
    const div = Math.floor(x / run)
    const rem = pos ? x % run : run + x % run;
    return slopeValue * div * run + Math.pow(rem - 2 / 3 * run, 2);
}
runSlider.addEventListener('input', (evt) => {
    runValue = Number.parseFloat(runSlider.value);
    runLabel.innerText = `run = ${runValue.toFixed(1)}`;
    board.update();
});
slopeSlider.addEventListener('input', (evt) => {
    slopeValue = Number.parseFloat(slopeSlider.value);
    slopeLabel.innerText = `slope = ${slopeValue.toFixed(1)}`;
    board.update();
});
const fPlot = board.create('functiongraph', [f, xMin, xMax]);
const glider1 = board.create('glider',
    [2 / 3, f(2 / 3), fPlot],
    { withLabel: false });
const glider2 = board.create('point',
    [() => glider1.X() + runValue,
    () => f(glider1.X() + runValue)],
    { fillColor: 'black', strokeColor: 'black', withLabel: false });
const runLine = board.create('segment',
    [glider1, [() => glider2.X(), () => glider1.Y()]],
    { strokeColor: 'black', dash: 1 });
const riseLine = board.create('segment',
    [[() => glider2.X(), () => glider1.Y()],
    [() => glider2.X(), () => glider2.Y()]],
    { strokeColor: 'black', dash: 1 });
