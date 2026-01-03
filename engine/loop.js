Game.loop = {
  start() {
    if (Game.state.running) return;
    Game.state.running = true;

    const tick = () => {
      // update + render
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
};
