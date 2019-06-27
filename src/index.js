const board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [-4, 6, 6, -4], axis: true
});
const runSlider = board.create('slider', [[1, 4], [4, 4], [0.001, 1, 5]], { name: 'run' });
const slopeSlider = board.create('slider', [[1, 3], [4, 3], [-5, 1, 5]], { name: 'slope' });
function f(x) {
    const run = runSlider.Value();
    const pos = x >= 0;
    const div = Math.floor(x / run)
    const rem = pos ? x % run : run + x % run;
    return slopeSlider.Value() * div * run + Math.pow(rem - 2 / 3 * run, 2);
}
const fPlot = board.create('functiongraph', [f, -4, 6]);
const glider1 = board.create('glider', [2 / 3, f(2 / 3), fPlot], { withLabel: false });
const glider2 = board.create('point', [() => glider1.X() + runSlider.Value(), () => f(glider1.X() + runSlider.Value())], { fillColor: 'black', strokeColor: 'black', withLabel: false });
const runLine = board.create('segment', [glider1, [() => glider2.X(), () => glider1.Y()]], { strokeColor: 'black', dash: 1 });
const riseLine = board.create('segment', [[() => glider2.X(), () => glider1.Y()], [() => glider2.X(), () => glider2.Y()]], { strokeColor: 'black', dash: 1 });
