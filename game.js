
//FOR GAVIN 11:25 PM
//global vars

let minX_true = Number.MAX_SAFE_INTEGER;
let maxX_true = -Infinity;
let minY_true = Number.MAX_SAFE_INTEGER;
let maxY_true = -Infinity;


//these are intended to store the area arrays into local arrays so we can do long for loops without calling external API
let areaIDs = []; 
let areaID;
let tileIDs = [];
let tileID;
let nftIDs = []; //nft id's
let nftID;

let imgIDs = []; //nft image codes, contains combined race, atype, and ori information (1;1;1) for human lander 
let imgID;


let i_g = 0;
let chunksize = 1000;
let surfacewidth = 1000000;



let layer;
let camera;
let tileWidth = 300;
let tileHeight = 140;
let offsetX = tileWidth / 2;
let offsetY = tileHeight / 2;
let dragging = false;
let dragStart = new Phaser.Math.Vector2();
let pinchActive = false;
let initialPinchDistance;




const config = {
      type: Phaser.auto,
      autoRound: true, // Round pixel values to the nearest integer to save resources
      antialias: false, // Disable antialiasing to save resources
      backgroundColor: '#000000', // Set a solid background color
      width: 1920,
      height: 1080 ,
      scene: {
          preload: preload,
          create: create
      },
      contextCreationParams: {
          powerPreference: 'low-power' // save resources
      },
      render: {
          batchSize: 4000 // Increase the batchSize
      }

};

loadall() // preload all arrays locally first before creating game
console.log('code passed the loadall()');



/**

console.log('Starting...');

function delayedAreaInfo(count) {
    if (count === 0) {
        // Additional code to execute after all wait times are finished
        console.log('Executing additional code...');
        const game = new Phaser.Game(config);
        // Your additional code here
        return;
    }

    setTimeout(() => {
        areaInfo(chunksize);

        if (count === 8) {
            console.log('...1 second has passed.');
        }

        delayedAreaInfo(count - 1);
    }, 1000);
}

delayedAreaInfo(9);

console.log('Continuing...');
  
  **/
function preload() {

      //load all surface images here
    this.load.image('tile00', 'assets/tile00.png');
    this.load.image('tile01', 'assets/tile01.png');
    this.load.image('tile02', 'assets/tile02.png');
    this.load.image('tile03', 'assets/tile03.png');
    this.load.image('tile04', 'assets/tile04.png');
    this.load.image('tile12', 'assets/tile12.png');

    //load terraforms
    
    this.load.image('tile20', 'assets/tile20.png');
    this.load.image('tile21', 'assets/tile21.png');
    this.load.image('tile22', 'assets/tile22.png');
    this.load.image('tile25', 'assets/tile25.png');
    this.load.image('tile26', 'assets/tile26.png');
    this.load.image('tile27', 'assets/tile27.png');
    this.load.image('tile30', 'assets/tile30.png');
    this.load.image('tile31', 'assets/tile31.png');
    this.load.image('tile32', 'assets/tile32.png');
    this.load.image('tile35', 'assets/tile35.png');
    this.load.image('tile36', 'assets/tile36.png');
    this.load.image('tile37', 'assets/tile37.png');

    //load buildings


    this.load.image('lander1', 'assets/lander1.png');
    this.load.image('lander2', 'assets/lander2.png');
    this.load.image('lander4', 'assets/lander4.png');
    this.load.image('lander5', 'assets/lander5.png');


    this.load.image('agri_a', 'assets/agri_a.png');
    this.load.image('agri_b', 'assets/agri_b.png');
    this.load.image('agri_d', 'assets/agri_d.png');
    this.load.image('agri_e', 'assets/agri_e.png');

    this.load.image('collector_a', 'assets/collector_a.png');
    this.load.image('collector_b', 'assets/collector_b.png');
    this.load.image('collector_d', 'assets/collector_d.png');
    this.load.image('collector_e', 'assets/collector_e.png');

    this.load.image('factory_a', 'assets/factory_a.png');
    this.load.image('factory_b', 'assets/factory_b.png');
    this.load.image('factory_d', 'assets/factory_d.png');
    this.load.image('factory_e', 'assets/factory_e.png');

    this.load.image('wall_a', 'assets/wall_a.png');
    this.load.image('wall_b', 'assets/wall_b.png');
    this.load.image('wall_d', 'assets/wall_d.png');
    this.load.image('wall_e', 'assets/wall_e.png');

    this.load.image('wall2_a', 'assets/wall2_a.png');
    this.load.image('wall2_b', 'assets/wall2_b.png');
    this.load.image('wall2_d', 'assets/wall2_d.png');
    this.load.image('wall2_e', 'assets/wall2_e.png');

    this.load.image('tower_a', 'assets/tower_a.png');
    this.load.image('tower_b', 'assets/tower_b.png');
    this.load.image('tower_d', 'assets/tower_d.png');
    this.load.image('tower_e', 'assets/tower_e.png');

    this.load.image('resident_a', 'assets/resident_a.png');
    this.load.image('resident_b', 'assets/resident_b.png');
    this.load.image('resident_d', 'assets/resident_d.png');
    this.load.image('resident_e', 'assets/resident_e.png');

    //b0mb
    this.load.image('red_1', 'assets/red_1.png');
    this.load.image('red_2', 'assets/red_2.png');
    this.load.image('red_4', 'assets/red_4.png');
    this.load.image('red_5', 'assets/red_5.png');

    //streets

    this.load.image('s1', 'assets/s1.png');
    this.load.image('s2', 'assets/s2.png');
    this.load.image('tile13', 'assets/tile13.png');
    this.load.image('tile14', 'assets/tile14.png');

    //load vehicles

    
    this.load.image('rover_a_001', 'assets/rover_a_001.png');
    this.load.image('rover_a_002', 'assets/rover_a_002.png');
    this.load.image('rover_a_003', 'assets/rover_a_003.png');
    this.load.image('rover_a_004', 'assets/rover_a_004.png');
    this.load.image('rover_b_001', 'assets/rover_b_001.png');
    this.load.image('rover_b_002', 'assets/rover_b_002.png');
    this.load.image('rover_b_003', 'assets/rover_b_003.png');
    this.load.image('rover_b_004', 'assets/rover_b_004.png');
    this.load.image('rover_d_001', 'assets/rover_d_001.png');
    this.load.image('rover_d_002', 'assets/rover_d_002.png');
    this.load.image('rover_d_003', 'assets/rover_d_003.png');
    this.load.image('rover_d_004', 'assets/rover_d_004.png');
    this.load.image('rover_e_001', 'assets/rover_e_001.png');
    this.load.image('rover_e_002', 'assets/rover_e_002.png');
    this.load.image('rover_e_003', 'assets/rover_e_003.png');
    this.load.image('rover_e_004', 'assets/rover_e_004.png');

    this.load.image('service_a_001', 'assets/service_a_001.png');
    this.load.image('service_a_002', 'assets/service_a_002.png');
    this.load.image('service_a_003', 'assets/service_a_003.png');
    this.load.image('service_a_004', 'assets/service_a_004.png');
    this.load.image('service_b_001', 'assets/service_b_001.png');
    this.load.image('service_b_002', 'assets/service_b_002.png');
    this.load.image('service_b_003', 'assets/service_b_003.png');
    this.load.image('service_b_004', 'assets/service_b_004.png');
    this.load.image('service_d_001', 'assets/service_d_001.png');
    this.load.image('service_d_002', 'assets/service_d_002.png');
    this.load.image('service_d_003', 'assets/service_d_003.png');
    this.load.image('service_d_004', 'assets/service_d_004.png');
    this.load.image('service_e_001', 'assets/service_e_001.png');
    this.load.image('service_e_002', 'assets/service_e_002.png');
    this.load.image('service_e_003', 'assets/service_e_003.png');
    this.load.image('service_e_004', 'assets/service_e_004.png');

    this.load.image('tank_a_001', 'assets/tank_a_001.png');
    this.load.image('tank_a_002', 'assets/tank_a_002.png');
    this.load.image('tank_a_003', 'assets/tank_a_003.png');
    this.load.image('tank_a_004', 'assets/tank_a_004.png');
    this.load.image('tank_b_001', 'assets/tank_b_001.png');
    this.load.image('tank_b_002', 'assets/tank_b_002.png');
    this.load.image('tank_b_003', 'assets/tank_b_003.png');
    this.load.image('tank_b_004', 'assets/tank_b_004.png');
    this.load.image('tank_d_001', 'assets/tank_d_001.png');
    this.load.image('tank_d_002', 'assets/tank_d_002.png');
    this.load.image('tank_d_003', 'assets/tank_d_003.png');
    this.load.image('tank_d_004', 'assets/tank_d_004.png');
    this.load.image('tank_e_001', 'assets/tank_e_001.png');
    this.load.image('tank_e_002', 'assets/tank_e_002.png');
    this.load.image('tank_e_003', 'assets/tank_e_003.png');
    this.load.image('tank_e_004', 'assets/tank_e_004.png');

    this.load.image('transporter_a_001', 'assets/transporter_a_001.png');
    this.load.image('transporter_a_002', 'assets/transporter_a_002.png');
    this.load.image('transporter_a_003', 'assets/transporter_a_003.png');
    this.load.image('transporter_a_004', 'assets/transporter_a_004.png');
    this.load.image('transporter_b_001', 'assets/transporter_b_001.png');
    this.load.image('transporter_b_002', 'assets/transporter_b_002.png');
    this.load.image('transporter_b_003', 'assets/transporter_b_003.png');
    this.load.image('transporter_b_004', 'assets/transporter_b_004.png');
    this.load.image('transporter_d_001', 'assets/transporter_d_001.png');
    this.load.image('transporter_d_002', 'assets/transporter_d_002.png');
    this.load.image('transporter_d_003', 'assets/transporter_d_003.png');
    this.load.image('transporter_d_004', 'assets/transporter_d_004.png');
    this.load.image('transporter_e_001', 'assets/transporter_e_001.png');
    this.load.image('transporter_e_002', 'assets/transporter_e_002.png');
    this.load.image('transporter_e_003', 'assets/transporter_e_003.png');
    this.load.image('transporter_e_004', 'assets/transporter_e_004.png');



  }
function create() {
    layer = this.add.layer(0, 0);
    camera = this.cameras.main;
    

    //let maxX_true = 1000; // pull coordinates from eos table
    //let maxY_true = 1000;
    //let minX_true = 950;
    //let minY_true = 950;

    let xmax_c = maxX_true - minX_true; //xmax corrected, using relative coordinates for sake of viewer box, true coordinates will still be included/tracked
    let ymax_c = maxY_true - minY_true; //ymax corrected


    let tileCounter = 0;

     // Calculate center of map
    const centerX = ((xmax_c * tileWidth) / 2 + (xmax_c * tileWidth) / 2) / 2;
    const centerY = ((ymax_c * tileHeight) / 2 - (ymax_c * tileHeight) / 2) / 2;

    // Center camera on map
    camera.centerOn(centerX, centerY);
    
    const hitArea = new Phaser.Geom.Polygon([
        0, tileHeight / 2,
        tileWidth / 2, 0,
        tileWidth, tileHeight / 2,
        tileWidth / 2, tileHeight
    ]);  // add hit area so that coordinates are correct regardless of tile overlap which is necessary because the buildings and other assets will overlap due to isometric view

    let x_true, y_true;
    //ymax_c & xmax_c replaced with number
    for (let y = 0; y < ymax_c; y++) {
        for (let x = 0; x < xmax_c; x++) {
            let tileX = x * tileWidth / 2 + y * tileWidth / 2; //pixel coordinates
            let tileY = y * tileHeight / 2 - x * tileHeight / 2; //pixel coordinates

            x_true = x + minX_true;// Calculate back EOS X coordinates
            y_true = y + minY_true;// Calculate back EOS Y coordinates

            //let tileImage = 'tile30';
            

            let tile_Num = getTileData(x_true, y_true);    //convert the x and y coordinates and find corresponding tile on the table,USES LOCAL ARRAY
            console.log('Tile num:', tile_Num);
            let tileImage = getTileImageKey(tile_Num); //convert tile number on table to file image name which were loaded above
            console.log('Tile image:', tileImage);

            let img_nums = getAssetImgData(x_true, y_true); //finds the asset's image data (race,atype, orientation) on the x and y coordinate, returns 0 if theres no asset
            console.log('Asset image data:', img_nums);


           
            const tile = this.add.image(tileX, tileY, tileImage)
                .setDepth(tileY)
                .setInteractive(hitArea, Phaser.Geom.Polygon.Contains)
                .setData({ name: `mapTile${tileCounter}`, x_true, y_true });

            layer.add(tile);

            if (img_nums != 0) { //if an asset exists on top of the current tile

                let assetImage = getImageKey(img_nums); // convert asset's data (race;atype;ori) into file image
                console.log('Asset image:', assetImage);
                const assetTile = this.add.image(tileX, tileY, assetImage)
                    .setDepth(tileY + 1);
                layer.add(assetTile);

            }
          

            
            tileCounter++;
        }
    }  // drawing the map and setting the hitzones to be interactive and display coordinates in the console upon clicking

    
   

    // ...

      this.input.on('pointerdown', (pointer) => {
          if (this.input.pointer1.isDown && this.input.pointer2.isDown) {
              pinchActive = true;
              initialPinchDistance = Phaser.Math.Distance.Between(
                  this.input.pointer1.x, this.input.pointer1.y,
                  this.input.pointer2.x, this.input.pointer2.y
              );
          } else {
              dragging = true;
              dragStart.set(pointer.x, pointer.y);
          }
         
      });  // checking to see if user is pinching the map (mobile) or selecting the map to drag

      this.input.on('pointerup', (pointer) => {
          dragging = false;
          pinchActive = false;
          
      });  // making sure the dragging and pinch is stopped upon lifting fingers of the map or releasing the mouse button to stop dragging

      this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
          const zoomAmount = deltaY > 0 ? -0.05 : 0.05;
          camera.zoom = Phaser.Math.Clamp(camera.zoom + zoomAmount, 0.1, 2);
          
      }); // mouse zoom functionality and updating the map whenever this happens

      this.input.on('pointermove', _.throttle((pointer) => {
          if (dragging && !pinchActive) {
              const deltaX = pointer.x - dragStart.x;
              const deltaY = pointer.y - dragStart.y;

              camera.scrollX -= deltaX / camera.zoom;
              camera.scrollY -= deltaY / camera.zoom;

              dragStart.set(pointer.x, pointer.y);
          }

          if (pinchActive) {
              const pinchDistance = Phaser.Math.Distance.Between(
                  this.input.pointer1.x, this.input.pointer1.y,
                  this.input.pointer2.x, this.input.pointer2.y
              );

              const zoomAmount = (initialPinchDistance - pinchDistance) * 0.01;
              camera.zoom = Phaser.Math.Clamp(camera.zoom - zoomAmount, 0.1, 2);
              initialPinchDistance = pinchDistance;
          }
          
      }, 16)); // dragging / scrolling the map and updating the map upon the user event

      // Add the event listener for clicking on a tile
      this.input.on('gameobjectdown', (pointer, gameObject) => {
          console.log(`Tile clicked: ${gameObject.getData('name')}, Coordinates: {x: ${gameObject.getData('x_true')}, y: ${gameObject.getData('y_true')}}`);
      });
}




//--EOS JS -------------------------------------------------------------------------------------------------------------------------------------

function updateHitAreaPosition(hitArea, offsetX, offsetY) {
    for (const point of hitArea.points) {
        point.x += offsetX;
        point.y += offsetY;
    }
}



function getTileData(x, y) {
    let id = parseInt(y.toString() + x.toString() );
    let tileNumber = null;
    let l = nftIDs.length;
    

    for (let i = 0; i < l; i++) {
        
        if (parseInt(areaIDs[i]) === id) {
            tileNumber = tileIDs[i];
            //console.log('tileID[i] element :)', nftIDs[i]); //correct
            //console.log('coordinate located :)', tileNumber); //correct
            return tileNumber;
        }
    }
    return 0; // Default return value
}

function getTileImageKey(tileNumber) {
    const tileImageMap = {
        0: 'tile00',
        1: 'tile01',
        2: 'tile02',
        3: 'tile03',
        4: 'tile04',
        10: 's1',
        11: 's2',
        12: 'tile12',
        13: 'tile13',
        14: 'tile14',
        20: 'tile20',
        21: 'tile21',
        22: 'tile22',
        25: 'tile25',
        26: 'tile26',
        27: 'tile27',
        30: 'tile30',
        31: 'tile31',
        32: 'tile32',
        35: 'tile35',
        36: 'tile36',
        37: 'tile37'
    };

    return tileImageMap[tileNumber] || 'tile00';
}

function getAssetImgData(x, y) {
    let id = parseInt(y.toString() + x.toString());
    let l = areaIDs.length;


    for (let i = 0; i < l; i++) {
        
        if (parseInt(areaIDs[i]) === id) {
            imgIDdata = imgIDs[i];
            
            
            return imgIDdata;
        }
    }
    return 0; // Default return value
}

//global:
const assetImageMap = {
    1: { // race a
        1: 'lander1',
        2: 'resident_a',
        3: 'agri_a',
        4: 'factory_a',
        5: {
            1: 'rover_a_001',
            2: 'rover_a_002',
            3: 'rover_a_003',
            4: 'rover_a_004'
        },
        6: 's1',
        7: 'wall_a',
        8: 'collector_a',
        9: 'tower_a',
        10: {
            1: 'service_a_001',
            2: 'service_a_002',
            3: 'service_a_003',
            4: 'service_a_004'
        },
        11: {
            1: 'tank_a_001',
            2: 'tank_a_002',
            3: 'tank_a_003',
            4: 'tank_a_004'
        },
        12: {
            1: 'transporter_a_001',
            2: 'transporter_a_002',
            3: 'transporter_a_003',
            4: 'transporter_a_004'
        },
        13: 'wall2_a',
        14: 'red_1'
    },
    // ...repeat the structure for races 2, 3, and 4
    2: { // race b
        1: 'lander2',
        2: 'resident_b',
        3: 'agri_b',
        4: 'factory_b',
        5: {
            1: 'rover_b_001',
            2: 'rover_b_002',
            3: 'rover_b_003',
            4: 'rover_b_004'
        },
        6: 's2',
        7: 'wall_b',
        8: 'collector_b',
        9: 'tower_b',
        10: {
            1: 'service_b_001',
            2: 'service_b_002',
            3: 'service_b_003',
            4: 'service_b_004'
        },
        11: {
            1: 'tank_b_001',
            2: 'tank_b_002',
            3: 'tank_b_003',
            4: 'tank_b_004'
        },
        12: {
            1: 'transporter_b_001',
            2: 'transporter_b_002',
            3: 'transporter_b_003',
            4: 'transporter_b_004'
        },
        13: 'wall2_b',
        14: 'red_2'
    },
    4: { // race d
        1: 'lander4',
        2: 'resident_d',
        3: 'agri_d',
        4: 'factory_d',
        5: {
            1: 'rover_d_001',
            2: 'rover_d_002',
            3: 'rover_d_003',
            4: 'rover_d_004'
        },
        6: 'tile13',
        7: 'wall_d',
        8: 'collector_d',
        9: 'tower_d',
        10: {
            1: 'service_d_001',
            2: 'service_d_002',
            3: 'service_d_003',
            4: 'service_d_004'
        },
        11: {
            1: 'tank_d_001',
            2: 'tank_d_002',
            3: 'tank_d_003',
            4: 'tank_d_004'
        },
        12: {
            1: 'transporter_d_001',
            2: 'transporter_d_002',
            3: 'transporter_d_003',
            4: 'transporter_d_004'
        },
        13: 'wall2_d',
        14: 'red_4'

    },
    5: { // race e
        1: 'lander5',
        2: 'resident_e',
        3: 'agri_e',
        4: 'factory_e',
        5: {
            1: 'rover_e_001',
            2: 'rover_e_002',
            3: 'rover_e_003',
            4: 'rover_e_004'
        },
        6: 'tile14',
        7: 'wall_e',
        8: 'collector_e',
        9: 'tower_e',
        10: {
            1: 'service_e_001',
            2: 'service_e_002',
            3: 'service_e_003',
            4: 'service_e_004'
        },
        11: {
            1: 'tank_e_001',
            2: 'tank_e_002',
            3: 'tank_e_003',
            4: 'tank_e_004'
        },
        12: {
            1: 'transporter_e_001',
            2: 'transporter_e_002',
            3: 'transporter_e_003',
            4: 'transporter_e_004'
        },
        13: 'wall2_e',
        14: 'red_5'

    }


};

function getImageKey(strInput) {
    console.log('StringInput', strInput);

    if (!strInput) {
        return;
    }
    console.log('image array being placed :)', strInput); //correct
    const arrayInput = strInput.split(';').map(Number);
    const race = arrayInput[0];
    const atype = arrayInput[1];
    const orientation = arrayInput.length > 2 ? arrayInput[2] : undefined;

    const raceMap = assetImageMap[race];
    if (!raceMap) {
        return 'tile00'; // return 'tile00' as the default image key if race is not found
    }
    const atypeMap = raceMap[atype];
    if (!atypeMap) {
        return 'tile00'; // return 'tile00' as the default image key if atype is not found
    }

    // If atypeMap is a string, return it directly, otherwise get the orientation
    if (typeof atypeMap === 'string' || orientation === undefined) {
        return atypeMap;
    } else {
        return atypeMap[orientation] || 's1'; // return 'tile00' as the default image key if orientation is not found
    }
}


    





function callback_markets(value) {
    if (value == undefined) return;
    if (value.rows.length == 0) return;
    markets = value;
    let marketNames = [];
    let marketName;
    let l = markets.rows.length;
    for (let i = 0; i < l; i++) {
        marketName = markets.rows[i].name + "<br>";
        marketNames.push(marketName);
    }
    document.getElementById('marketArray').innerHTML = marketNames;
} // callback_markets

function marketInfo() {
    getdata(callback_markets, "sovspacegame", "sovspacegame", "markets", "", "", "", 100);
} // marketInfo

function callback_area(value) {
    if (value == undefined) return;
    if (value.rows.length == 0) return;
    area = value; //global var getting set here
   // let areaIDs = [];
    //let areaID;
    //let tileIDs = [];
    //let tileID;
    //let nftIDs = [];
    //let nftID;

    
    
   /** for (let i = 0; i < l; i++) {
        areaID = area.rows[i].id; //"'.id' can be replaced with any of the table parameters
        areaIDs.push(areaID);
        
      
    }
    **/
    

    
   // let l = area.rows.length;

    for (i_g; i_g < (chunksize ); i_g++) {

        console.log('ig: ', i_g);
        const y = parseInt(area.rows[i_g].id / 1000000);
        console.log('Y: ', y);
        const x = parseInt(area.rows[i_g].id) - (y * 1000000);
        console.log('X: ', x);

        areaID = area.rows[i_g].id; 
        areaIDs.push(areaID);

        tileID = area.rows[i_g].tile
        tileIDs.push(tileID);

        nftID = area.rows[i_g].asset_id
        nftIDs.push(nftID);

        minY_true = Math.min(minY_true, y);
        maxY_true = Math.max(maxY_true, y);
        minX_true = Math.min(minX_true, x);
        maxX_true = Math.max(maxX_true, x);
    }



   // let coordinateArray = areaIDs;
    //let tileArray = areaIDs;
    
    //let nftArray = nftIDs;

    

    //maxX_true = findMaxX(areaIDs);  //global var getting set here
    //maxY_true = findMaxY(areaIDs); //global var getting set here
   // minX_true = findMinX(areaIDs);  //global var getting set here
    //minY_true = findMinY(areaIDs);  //global var getting set here


    console.log('maxX=', maxX_true);
    console.log('maxY=', maxY_true);
    console.log('minX=', minX_true);
    console.log('minY=', minY_true);


    //document.getElementById('areaArray').innerHTML = areaIDs;
    //document.getElementById('tileArray').innerHTML = tileIDs;
    //document.getElementById('nftArray').innerHTML = nftIDs;
} // callback_area

//ORIGINAL GETDATA CALL ----------------------------------------------------------------------------------------

function areaInfo(rowcount) {
    getdata(callback_area, "sovspacegame", "sovspacegame", "area", global_account, 2, "name", rowcount); //get entire table
} // areaInfo





// math functions---------------------------------------------------------------------------------------------------------------------------------------


/**
function updateMinMaxCoordinates(areaIDs) {
    minX_true = Number.MAX_SAFE_INTEGER;
    maxX_true = -Infinity;
    minY_true = Number.MAX_SAFE_INTEGER;
    maxY_true = -Infinity;

    for (let i = 0; i < areaIDs.length; i++) {
        const y = parseInt(areaIDs[i].substring(0, 6), 10);
        const x = parseInt(areaIDs[i].substring(6), 10);

        minY_true = Math.min(minY_true, y);
        maxY_true = Math.max(maxY_true, y);
        minX_true = Math.min(minX_true, x);
        maxX_true = Math.max(maxX_true, x);
    }
}
**/
//  SVEN'S ASYNC CODE----------------------------------------------------
async function loadall() {
    //alert("load");


    var lastid = "";
    url = "https://eos.greymass.com/v1/chain/get_table_rows";

    FINISH = 0;
    loadcnt = 0;

    while (FINISH == 0) {

        limit = 1000;
        jsonparam = '{"table":"area","scope":"sovspacegame","code":"sovspacegame","lower_bound": "' + lastid + '","limit":' + limit + ',"json":"true"}';
        retjson = readurl_simple(url, jsonparam);
        rows = JSON.parse(retjson);
        size = rows.rows.length;
        console.log("size: " + size);

        for (i = 0; i < size; i++) {
            coor = rows.rows[i].id;
            tile = rows.rows[i].tile;

            areaID = rows.rows[i].id;
            areaIDs.push(areaID);

            tileID = rows.rows[i].tile
            tileIDs.push(tileID);

            nftID = rows.rows[i].asset_id
            nftIDs.push(nftID);

            


            console.log('i: ', i);
            const y = parseInt(rows.rows[i].id / 1000000);
            console.log('Y: ', y);
            const x = parseInt(rows.rows[i].id) - (y * 1000000);
            console.log('X: ', x);

            minY_true = Math.min(minY_true, y);
            maxY_true = Math.max(maxY_true, y);
            minX_true = Math.min(minX_true, x);
            maxX_true = Math.max(maxX_true, x);

            i_g++;



            console.log("areaIDs[i_g]: " + areaIDs[i_g] + " areaIDs[i_g]:" + tileIDs[i_g]);

            if (nftID > 0) {
                // USING ATOMICASSETS-API TO GET DETAILED DATA (race, orientation, name...)
                url2 = "https://eos.api.atomicassets.io/atomicassets/v1/assets/" + nftID;

                jsonparam2 = '';
                assetjson = readurl_simple(url2, jsonparam2);
                rows2 = JSON.parse(assetjson);
                //onsole.log("ASSET");
                ///console.log(rows2);

                //console.log("...: ");

                //race = $asset['data']['data']['race'];
                race = rows2['data']['data']['race'];
                console.log("RACE: " + race);

                ori = rows2['data']['data']['ori'];
                console.log("RACE: " + ori);

                atype = rows2['data']['data']['atype'];
                console.log("atype: " + atype);

                race = rows2['data']['data']['race'];

                imgID = race + ";" + atype + ";" + ori;
                imgIDs.push(imgID);


                //console.log("RACE: " + race);

                //FINISH = 1

                //asset = getasset( asset_id );
                //  $race = $asset['data']['data']['race'];


            }
            else {

                imgID = null;
                imgIDs.push(imgID);

            }// if (asset_id > 0)

        } // for i...

        lastid = rows.next_key;
        await delay(2000);
        if (rows.more != 1) {
            FINISH = 1;
            const game = new Phaser.Game(config);
        }
        loadcnt++;
        console.log("L:" + loadcnt + " lastid:" + lastid + " ");

    } // while 



    console.log("FIN<br>");
} // loadall




function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function readurl_simple(url, jsonparam) {
    try {
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', url, false);

        var data2 = jsonparam;

        xhr.send(data2);

        var response = xhr.responseText;

        return (response);
    } catch (e) {
        console.log("Connection failed, grabbing local");
        return '[]';
    }
} // readurl()


//
// getdata()
//
function getdata(callback, _code, _scope, _table, _lower, _index, _key_type, _limit) {


    var rows = null;

    //     var url = "https://jungle3.greymass.com/v1/chain/get_table_rows";
    // var url = "https://eos.greymass.com/v1/chain/get_table_rows";
    //     var url = "https://eos.api.eosnation.io/v1/chain/get_table_rows";

    var url = "https://" + thenode + "/v1/chain/get_table_rows";

    var xhr = new XMLHttpRequest();

    //var params = JSON.stringify(  {"code":"sovorderbook","scope":"sovorderbook","table":"token", "lower_bound":"12" ,  "json":true } );
    //var params = JSON.stringify(  {"code":"sovorderbook","scope":"sovorderbook","table":"asks", "lower_bound":"10", "index_position":2 , "key_type": "i64",  "json":true } );
    //var params = JSON.stringify(  {"code":_code,"scope":_scope,"table":_table, "lower_bound":_lower, "index_position":2 , "key_type": "i64",  "json":true } );
    var params = JSON.stringify({ "code": _code, "scope": _scope, "table": _table, "lower_bound": _lower, "index_position": _index, "key_type": _key_type, "limit": _limit, "json": true });

    xhr.open("POST", url);

    //xhr.setRequestHeader("Content-length", params.length);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");



    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            //      console.log("hic--2-");
            //    console.log(xhr.status);
            //   console.log(xhr.responseText);
            json = xhr.responseText;

            const rows = JSON.parse(json);

            callback(rows);
            //      document.getElementById('backdata').innerHTML = "XXX:"+xhr.responseText+"AA";
        }
    };

    //var mydata = {"code":"sovorderbook","scope":"sovorderbook","table":"token", "lower_bound":"10" ,  "json":true };

    xhr.send(params);


    // console.log("back");
} // getdata