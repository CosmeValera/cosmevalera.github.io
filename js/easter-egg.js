// Console Easter Egg
(function() {
  var styles = {
    banner: 'color: #4ff5f5; font-size: 14px; font-family: monospace; line-height: 1.4;',
    welcome: 'background: linear-gradient(135deg, #0b1116, #151b21); color: #4ff5f5; font-size: 16px; padding: 12px 20px; border-radius: 8px; font-weight: bold; border: 1px solid #4ff5f5;',
    info: 'color: #40d060; font-size: 12px;',
    link: 'color: #4ff5f5; font-size: 12px; text-decoration: underline;'
  };

  console.log('%c\n'
    + '    ____                         \n'
    + '   / ___|___  ___ _ __ ___   ___ \n'
    + '  | |   / _ \\/ __| \'_ ` _ \\ / _ \\\n'
    + '  | |__| (_) \\__ \\ | | | | |  __/\n'
    + '   \\____\\___/|___/_| |_| |_|\\___|\n',
    styles.banner);

  console.log('%c Hey there, curious dev! ', styles.welcome);
  console.log('%c Built with Zola, vanilla JS, and SCSS. No frameworks were harmed.', styles.info);
  console.log('%c Source: github.com/CosmeValera/CosmeValera.github.io', styles.link);
})();
