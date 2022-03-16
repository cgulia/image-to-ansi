const Jimp = require('jimp');

asciify(128,64);

function asciify(width, height) {

    //discord.js image source
    //if (rm.attachments.size < 1) {
    //    posterror(rm, "error - no image provided");
    //    return
    //};
    //var image = rm.attachments.array()[0].url;
    //const imagename = rm.attachments.array()[0].filename;

    const targetimage = "src.png";
    var imagedata = []
    Jimp.read(targetimage, (err, rsimage) => {
        if (err) throw err;
        rsimage
            .greyscale()
            .resize(width, height, Jimp.RESIZE_NEAREST_NEIGHBOR)
        for (let py=0;py<rsimage.bitmap.height;py++) {
            for (let px=0;px<rsimage.bitmap.width;px++) {
                var color = rsimage.getPixelColor(px,py);
                color = Jimp.intToRGBA(color);
                var colornormalized = (color.r + color.g + color.b) / 3;
                var asciicolor = 37;
                if (colornormalized > 220) {
                    asciicolor = 47;
                } else if (colornormalized < 220 && colornormalized > 170) {
                    asciicolor = 46;
                } else if (colornormalized < 170 && colornormalized > 130) {
                    asciicolor = 44;
                } else if (colornormalized < 130 && colornormalized > 90) {
                    asciicolor = 43;
                } else if (colornormalized < 90 && colornormalized > 70) {
                    asciicolor = 42;
                } else if (colornormalized < 70) {
                    asciicolor = 40;
                }
                var imagepixel = [px, py, asciicolor]
                imagedata.push(imagepixel);
            }
        }

        var ascii = "";
        var currentrow = 0;
        var currentcol = 0;
        imagedata.forEach((idata) => {
            if (currentrow < idata[1]) {
                currentrow = idata[1];
                ascii += "\n";
            }
            if (currentcol != idata[2]) {
                currentcol = idata[2];
                ascii += "[" + idata[2] + "m[30m ";
            } else {
                ascii += "[30m ";
            }
        });
        
        console.log(ascii);

        //discord.js file output
        //try {
        //    const data = fs.writeFileSync('./txt/' + imagename + '_ascii.ansi', ascii, { flag: 'w+'})
        //    rm.channel.send('', {
        //        files: [
        //            './txt/' + imagename + '_ascii.ansi',
        //        ]
        //    });
        //} catch (err) {
        //    console.error(err)
        //}
        //return;

    });
}
