import Phaser from 'phaser';

export default {
  name: 'tangram-based-jigsaw-phaser',
  data() {
    return {
      initialize: true,
      game: {
        type: Phaser.AUTO,
        scene: {
          init: init,
          preload: preload,
          create: create,
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_VERTICALLY,
          width: 1920,
          height: 1080,
          parent: 'game'
        }
      }
    };
  },
  methods: {}
};

function preload() {
  const params = document.querySelector('#game-parameters');

  this.load.image('image', `/assets/sprites/${params.dataset.image}/image.png`);
  this.load.image('frame', '/assets/sprites/frame.png');

  for (let i = 1; i < 8; i++) {
    this.load.image(`piece-0${i - 1}`, `/assets/sprites/${params.dataset.image}/piece-0${i}.png`);
  }
}

function init() {
  this.cameras.main.setBackgroundColor('#f26f12');
}

function create() {
  this.add.image(
    this.cameras.main.centerX,
    this.cameras.main.centerY,
    'frame'
  );

  // Each polygon defines the interactive area for each piece (sprite).
  let hitAreas = [
    new Phaser.Geom.Polygon('0 0 450 450 0 900'),
    new Phaser.Geom.Polygon('0 0 900 0 450 450'),
    new Phaser.Geom.Polygon('0 225 225 0 225 450 0 675'),
    new Phaser.Geom.Polygon('225 0 0 225 225 450'),
    new Phaser.Geom.Polygon('225 0 450 225 225 450 0 225'),
    new Phaser.Geom.Polygon('450 0 450 450 0 450'),
    new Phaser.Geom.Polygon('0 225 225 0 450 225'),
  ];

  // Build one sprite for each piece. It is draggable.
  for (let i = 0; i < 7; i++) {
    let hitArea = hitAreas[i];
    let piece = this.make.sprite({
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,
      key: `piece-0${i}`,
    });
    piece.name = `piece-0${i}`;
    piece.setInteractive(hitArea, hitAreaCallback);
    this.input.setDraggable(piece);
  }

  this.input.on('drag', function (pointer, gameObject, x, y) {
    if (gameObject.name === 'piece-00') {
      console.log('Hi there drag.')
    }
    gameObject.x = x;
    gameObject.y = y
  });
}

/**
 * Returns true if the given point (x, y) of the input is inside the polygon area.
 * @param hitArea
 * @param x
 * @param y
 * @param gameObject
 * @return {boolean}
 */
function hitAreaCallback(hitArea, x, y, gameObject) {
  if (gameObject.name === 'piece-00') {
    // console.log('Hi there hit.')
  }

  return Phaser.Geom.Polygon.Contains(hitArea, x, y);
}